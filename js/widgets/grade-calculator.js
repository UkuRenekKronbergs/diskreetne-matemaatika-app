/* ===== Grade calculator for Diskreetne matemaatika I ===== */

(function () {
  'use strict';

  const STORAGE_KEY = 'dm_grade_calculator_v1';
  const LIMITS = {
    sessions: 6,
    irat: 3,
    trat: 2,
    task: 1,
    test: 32,
    testThreshold: 12.8,
    tblMax: 36,
    basePass: 50,
    baseMax: 100,
    teamBonusMax: 10,
    bonusMax: 15,
  };

  const GRADE_THRESHOLDS = [
    { grade: 'E', min: 50 },
    { grade: 'D', min: 60 },
    { grade: 'C', min: 70 },
    { grade: 'B', min: 80 },
    { grade: 'A', min: 90 },
  ];

  function emptySessions() {
    return Array.from({ length: LIMITS.sessions }, () => ({ irat: 0, trat: 0, task: 0 }));
  }

  function defaultState() {
    return {
      sessions: emptySessions(),
      kt1: 0,
      kt2: 0,
      peerPercent: 100,
      teacherBonus: 0,
      targetGrade: 'E',
      useBonus: true,
    };
  }

  function parseNumber(value, fallback = 0) {
    const n = Number.parseFloat(String(value ?? '').replace(',', '.'));
    return Number.isFinite(n) ? n : fallback;
  }

  function clamp(value, min, max, fallback = 0) {
    return Math.min(max, Math.max(min, parseNumber(value, fallback)));
  }

  function fmt(value, digits = 1) {
    const rounded = Math.round((value + Number.EPSILON) * 10 ** digits) / 10 ** digits;
    return rounded.toLocaleString('et-EE', {
      minimumFractionDigits: Number.isInteger(rounded) ? 0 : digits,
      maximumFractionDigits: digits,
    });
  }

  function loadState() {
    const base = defaultState();
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      const sessions = emptySessions().map((row, index) => {
        const savedRow = saved.sessions?.[index] || {};
        return {
          irat: clamp(savedRow.irat, 0, LIMITS.irat),
          trat: clamp(savedRow.trat, 0, LIMITS.trat),
          task: clamp(savedRow.task, 0, LIMITS.task),
        };
      });
      return {
        ...base,
        ...saved,
        sessions,
        kt1: clamp(saved.kt1, 0, LIMITS.test),
        kt2: clamp(saved.kt2, 0, LIMITS.test),
        peerPercent: clamp(saved.peerPercent, 0, 100, 100),
        teacherBonus: clamp(saved.teacherBonus, 0, LIMITS.bonusMax),
        targetGrade: GRADE_THRESHOLDS.some(g => g.grade === saved.targetGrade) ? saved.targetGrade : base.targetGrade,
        useBonus: saved.useBonus !== false,
      };
    } catch {
      return base;
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function gradeFor(total, eligible) {
    if (!eligible) return 'F';
    return GRADE_THRESHOLDS.reduce((grade, item) => total >= item.min ? item.grade : grade, 'F');
  }

  function thresholdFor(grade) {
    return GRADE_THRESHOLDS.find(item => item.grade === grade)?.min || LIMITS.basePass;
  }

  function calculate(state) {
    const tbl = state.sessions.reduce((sum, row) => sum + row.irat + row.trat + row.task, 0);
    const tratAndTasks = state.sessions.reduce((sum, row) => sum + row.trat + row.task, 0);
    const tests = state.kt1 + state.kt2;
    const base = tbl + tests;
    const teamBonus = Math.min(
      LIMITS.teamBonusMax,
      (tratAndTasks / 1.8) * (state.peerPercent / 100)
    );
    const totalBonus = Math.min(LIMITS.bonusMax, teamBonus + state.teacherBonus);
    const testsOk = state.kt1 >= LIMITS.testThreshold && state.kt2 >= LIMITS.testThreshold;
    const baseOk = base >= LIMITS.basePass;
    const eligible = testsOk && baseOk;
    const effectiveTotal = eligible ? Math.min(115, base + totalBonus) : base;
    const grade = gradeFor(effectiveTotal, eligible);
    const targetMin = thresholdFor(state.targetGrade);
    const planningBonus = state.useBonus ? totalBonus : 0;
    const requiredBaseForTarget = Math.max(LIMITS.basePass, targetMin - planningBonus);
    const missingBaseForTarget = Math.max(0, requiredBaseForTarget - base);
    const kt1ThresholdMissing = Math.max(0, LIMITS.testThreshold - state.kt1);
    const kt2ThresholdMissing = Math.max(0, LIMITS.testThreshold - state.kt2);
    const minimumAdditional = Math.max(
      missingBaseForTarget,
      kt1ThresholdMissing + kt2ThresholdMissing
    );
    const kt2MinimumForTarget = Math.max(
      LIMITS.testThreshold,
      requiredBaseForTarget - tbl - state.kt1
    );
    const kt2MinimumForPass = Math.max(
      LIMITS.testThreshold,
      LIMITS.basePass - tbl - state.kt1
    );
    const testTotalMinimumForPass = Math.max(
      LIMITS.testThreshold * 2,
      LIMITS.basePass - tbl
    );

    return {
      tbl,
      tratAndTasks,
      tests,
      base,
      teamBonus,
      totalBonus,
      testsOk,
      baseOk,
      eligible,
      effectiveTotal,
      grade,
      targetMin,
      planningBonus,
      requiredBaseForTarget,
      missingBaseForTarget,
      kt1ThresholdMissing,
      kt2ThresholdMissing,
      minimumAdditional,
      kt2MinimumForTarget,
      kt2MinimumForPass,
      testTotalMinimumForPass,
    };
  }

  function sessionRows(state) {
    return state.sessions.map((row, index) => `
      <tr>
        <td>${index + 1}</td>
        <td><input type="number" min="0" max="${LIMITS.irat}" step="0.1" inputmode="decimal" data-grade-input data-session="${index}" data-part="irat" aria-label="${index + 1}. sessiooni iRAT" value="${row.irat}"></td>
        <td><input type="number" min="0" max="${LIMITS.trat}" step="0.1" inputmode="decimal" data-grade-input data-session="${index}" data-part="trat" aria-label="${index + 1}. sessiooni tRAT" value="${row.trat}"></td>
        <td><input type="number" min="0" max="${LIMITS.task}" step="0.1" inputmode="decimal" data-grade-input data-session="${index}" data-part="task" aria-label="${index + 1}. sessiooni tiimiülesanne" value="${row.task}"></td>
        <td class="grade-row-total" data-session-total="${index}">0 / 6</td>
      </tr>
    `).join('');
  }

  function summaryItem(label, value, detail, tone = '') {
    return `
      <div class="grade-stat ${tone}">
        <span>${label}</span>
        <strong>${value}</strong>
        <small>${detail}</small>
      </div>
    `;
  }

  function statusItem(label, ok, value, hint) {
    return `
      <div class="grade-status ${ok ? 'ok' : 'warn'}">
        <strong>${label}</strong>
        <span>${value}</span>
        <small>${hint}</small>
      </div>
    `;
  }

  function readStateFromForm() {
    const sessions = emptySessions();
    document.querySelectorAll('[data-grade-input][data-session]').forEach(input => {
      const session = Number(input.dataset.session);
      const part = input.dataset.part;
      const max = LIMITS[part];
      sessions[session][part] = clamp(input.value, 0, max);
    });

    return {
      sessions,
      kt1: clamp(document.getElementById('gradeKt1')?.value, 0, LIMITS.test),
      kt2: clamp(document.getElementById('gradeKt2')?.value, 0, LIMITS.test),
      peerPercent: clamp(document.getElementById('gradePeer')?.value, 0, 100, 100),
      teacherBonus: clamp(document.getElementById('gradeTeacherBonus')?.value, 0, LIMITS.bonusMax),
      targetGrade: document.getElementById('gradeTarget')?.value || 'E',
      useBonus: Boolean(document.getElementById('gradeUseBonus')?.checked),
    };
  }

  function renderScale(calc) {
    return GRADE_THRESHOLDS.map(item => {
      const reached = calc.eligible && calc.effectiveTotal >= item.min;
      return `
        <tr class="${reached ? 'grade-scale-hit' : ''}">
          <td>${item.grade}</td>
          <td>${fmt(item.min)}+ punkti</td>
        </tr>
      `;
    }).join('');
  }

  function renderKt2Minimum(value) {
    if (value > LIMITS.test) {
      return `üle ${fmt(LIMITS.test)} p`;
    }
    return `${fmt(value)} p`;
  }

  function renderResult(state, calc) {
    const targetReady = calc.minimumAdditional <= 0 && calc.kt1ThresholdMissing <= 0 && calc.kt2ThresholdMissing <= 0;
    const passKt2Impossible = calc.kt2MinimumForPass > LIMITS.test;
    const targetKt2Impossible = calc.kt2MinimumForTarget > LIMITS.test;
    const bonusText = state.useBonus
      ? `${fmt(calc.planningBonus)} lisapunkti on sihthinde plaanis arvesse võetud`
      : 'sihthinde plaanis lisapunkte ei arvestata';

    return `
      <div class="grade-result-panel ${calc.eligible ? 'ok' : 'warn'}">
        <h3>Praegune seis: ${calc.grade}</h3>
        <p>
          Baaspunkte on ${fmt(calc.base)} / ${LIMITS.baseMax}.
          ${calc.eligible
            ? `Hinde arvestuses koos lisapunktidega: ${fmt(calc.effectiveTotal)} punkti.`
            : 'Lisapunktid hakkavad arvestusse minema alles siis, kui baaspunkte on vähemalt 50 ja mõlemad kontrolltööd on üle lävendi.'}
        </p>
      </div>

      <div class="grade-status-list">
        ${statusItem('Kontrolltöö 1 lävend', state.kt1 >= LIMITS.testThreshold, `${fmt(state.kt1)} / ${LIMITS.test}`, state.kt1 >= LIMITS.testThreshold ? 'täidetud' : `puudu ${fmt(calc.kt1ThresholdMissing)} p`)}
        ${statusItem('Kontrolltöö 2 lävend', state.kt2 >= LIMITS.testThreshold, `${fmt(state.kt2)} / ${LIMITS.test}`, state.kt2 >= LIMITS.testThreshold ? 'täidetud' : `puudu ${fmt(calc.kt2ThresholdMissing)} p`)}
        ${statusItem('50 baaspunkti nõue', calc.baseOk, `${fmt(calc.base)} / 50`, calc.baseOk ? 'täidetud' : `puudu ${fmt(Math.max(0, LIMITS.basePass - calc.base))} p`)}
      </div>

      <div class="grade-advice ${targetReady ? 'ok' : 'warn'}">
        <h3>Sihthinde ${state.targetGrade} miinimum</h3>
        <p>
          Selle sihthinde jaoks peab baaspunkte olema vähemalt ${fmt(calc.requiredBaseForTarget)}.
          ${bonusText}. Praeguse seisuga on juurde vaja vähemalt
          <strong>${fmt(calc.minimumAdditional)} punkti</strong>.
        </p>
        <p>
          Kui TBL ja KT1 jäävad nii nagu sisestatud, siis KT2 miinimum sihthinde ${state.targetGrade} jaoks on
          <strong>${renderKt2Minimum(calc.kt2MinimumForTarget)}</strong>.
          ${targetKt2Impossible ? 'Ainult KT2-st ei piisa; juurde on vaja ka TBL või KT1 punkte.' : ''}
        </p>
      </div>

      <div class="grade-advice">
        <h3>Positiivse hinde miinimum</h3>
        <p>
          Kui TBL kokku jääb ${fmt(calc.tbl)} p peale, on kontrolltöödest E jaoks kokku vaja vähemalt
          <strong>${fmt(calc.testTotalMinimumForPass)} p</strong>, kusjuures kumbki kontrolltöö peab olema vähemalt ${fmt(LIMITS.testThreshold)} p.
        </p>
        <p>
          Sisestatud TBL ja KT1 korral peab KT2 olema E jaoks vähemalt
          <strong>${renderKt2Minimum(calc.kt2MinimumForPass)}</strong>.
          ${passKt2Impossible ? 'Praeguse TBL ja KT1 seisuga ei ole ainult KT2 abil E-d võimalik kokku saada.' : ''}
        </p>
      </div>

      <table class="grade-scale">
        <thead><tr><th>Hinne</th><th>Lävend</th></tr></thead>
        <tbody>${renderScale(calc)}</tbody>
      </table>
    `;
  }

  function updateView(state) {
    const calc = calculate(state);

    state.sessions.forEach((row, index) => {
      const total = row.irat + row.trat + row.task;
      const totalCell = document.querySelector(`[data-session-total="${index}"]`);
      if (totalCell) totalCell.textContent = `${fmt(total)} / 6`;
    });

    const summary = document.getElementById('gradeSummary');
    if (summary) {
      summary.innerHTML = [
        summaryItem('TBL kokku', `${fmt(calc.tbl)} p`, `maksimum ${LIMITS.tblMax} p`),
        summaryItem('Kontrolltööd', `${fmt(calc.tests)} p`, '2 × 32 p'),
        summaryItem('Baaspunktid', `${fmt(calc.base)} p`, 'ilma lisapunktideta', calc.baseOk ? 'good' : 'warn'),
        summaryItem('Lisapunktid', `${fmt(calc.totalBonus)} p`, `tiim ${fmt(calc.teamBonus)} + muu ${fmt(state.teacherBonus)}`),
        summaryItem('Hinde punktid', `${fmt(calc.effectiveTotal)} p`, calc.eligible ? 'lisapunktid arvestatud' : 'lisapunktid veel ei loe', calc.eligible ? 'good' : 'warn'),
        summaryItem('Hinne', calc.grade, calc.eligible ? 'lävendid täidetud' : 'tingimus puudu', calc.eligible ? 'good' : 'bad'),
      ].join('');
    }

    const bonusPreview = document.getElementById('teamBonusPreview');
    if (bonusPreview) {
      bonusPreview.textContent = `Tiimitöö lisapunktid: ${fmt(calc.tratAndTasks)} p ÷ 1,8 × ${fmt(state.peerPercent, 0)}% = ${fmt(calc.teamBonus)} p (arvesse läheb kuni 10 p)`;
    }

    const result = document.getElementById('gradeResult');
    if (result) result.innerHTML = renderResult(state, calc);
  }

  function bindForm(state) {
    const calculator = document.getElementById('gradeCalculator');
    calculator.querySelectorAll('input, select').forEach(control => {
      control.addEventListener('input', () => {
        const nextState = readStateFromForm();
        saveState(nextState);
        updateView(nextState);
      });
      control.addEventListener('change', () => {
        const nextState = readStateFromForm();
        saveState(nextState);
        updateView(nextState);
      });
    });

    document.getElementById('gradeReset')?.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      window.initGradeCalculator();
    });

    saveState(state);
  }

  window.initGradeCalculator = function () {
    const view = document.getElementById('view');
    if (!view) return;

    const state = loadState();
    view.innerHTML = `
      <h1>Hinde kalkulaator</h1>
      <p>Sisesta oma TBL sessioonide, kontrolltööde ja lisapunktide seis. Kalkulaator arvestab, et positiivseks hindeks peab mõlemast kontrolltööst saama vähemalt 12,8 punkti ning ilma lisapunktideta peab koos olema vähemalt 50 punkti.</p>

      <div id="gradeCalculator" class="grade-calculator">
        <div class="grade-summary-grid" id="gradeSummary"></div>

        <div class="grade-layout">
          <section class="card grade-input-card">
            <h3>TBL sessioonid</h3>
            <p class="muted">Iga sessioon: iRAT kuni 3 p, tRAT kuni 2 p, tiimiülesanne kuni 1 p.</p>
            <div class="grade-table-wrap">
              <table class="grade-input-table">
                <thead>
                  <tr>
                    <th>Sessioon</th>
                    <th>iRAT</th>
                    <th>tRAT</th>
                    <th>Tiimiül.</th>
                    <th>Kokku</th>
                  </tr>
                </thead>
                <tbody>${sessionRows(state)}</tbody>
              </table>
            </div>
          </section>

          <section class="card grade-input-card">
            <h3>Kontrolltööd ja lisad</h3>
            <div class="grade-field-grid">
              <label class="grade-field">
                <span>Kontrolltöö 1</span>
                <input id="gradeKt1" type="number" min="0" max="${LIMITS.test}" step="0.1" inputmode="decimal" value="${state.kt1}">
                <small>lävend ${fmt(LIMITS.testThreshold)} / ${LIMITS.test}</small>
              </label>
              <label class="grade-field">
                <span>Kontrolltöö 2</span>
                <input id="gradeKt2" type="number" min="0" max="${LIMITS.test}" step="0.1" inputmode="decimal" value="${state.kt2}">
                <small>lävend ${fmt(LIMITS.testThreshold)} / ${LIMITS.test}</small>
              </label>
              <label class="grade-field">
                <span>Tiimiliikmete hinnang</span>
                <input id="gradePeer" type="number" min="0" max="100" step="1" inputmode="decimal" value="${state.peerPercent}">
                <small>protsent, vaikimisi 100%</small>
              </label>
              <label class="grade-field">
                <span>Õppejõu lisapunktid</span>
                <input id="gradeTeacherBonus" type="number" min="0" max="${LIMITS.bonusMax}" step="0.1" inputmode="decimal" value="${state.teacherBonus}">
                <small>lisapunktide kogulimiit on ${LIMITS.bonusMax}</small>
              </label>
            </div>

            <div class="grade-bonus-note" id="teamBonusPreview"></div>

            <div class="grade-target-row">
              <label class="grade-field">
                <span>Sihthinne</span>
                <select id="gradeTarget">
                  ${GRADE_THRESHOLDS.map(item => `<option value="${item.grade}" ${item.grade === state.targetGrade ? 'selected' : ''}>${item.grade} (${fmt(item.min)}+)</option>`).join('')}
                </select>
              </label>
              <label class="grade-check">
                <input id="gradeUseBonus" type="checkbox" ${state.useBonus ? 'checked' : ''}>
                <span>Arvesta lisapunkte sihthinde miinimumis</span>
              </label>
            </div>

            <div class="btn-row">
              <button class="btn small secondary" id="gradeReset" type="button">Tühjenda kalkulaator</button>
            </div>
          </section>
        </div>

        <section class="card grade-output-card">
          <h3>Tulemus ja miinimum</h3>
          <div id="gradeResult"></div>
        </section>
      </div>
    `;

    bindForm(state);
    updateView(state);
  };
})();

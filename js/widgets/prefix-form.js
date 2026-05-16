/* ===== Prefix-form interactive walkthrough =====
 * Walk the user through the steps of converting a formula to prefix form.
 */

(function () {
  'use strict';

  const EXAMPLES = [
    {
      formula: '¬∃y(∃xP(x) ⇒ (Q(y) ⇒ ∀xR(x)))',
      title: 'Kontrolltöö Variant A, ülesanne 4',
      steps: [
        'Asendame implikatsioonid (A ⇒ B ≡ ¬A ∨ B): ¬∃y(¬∃xP(x) ∨ (¬Q(y) ∨ ∀xR(x)))',
        'Viime eituse sisse — ¬∃y → ∀y¬: ∀y¬(¬∃xP(x) ∨ (¬Q(y) ∨ ∀xR(x)))',
        'De Morgan ¬(A ∨ B) ≡ ¬A & ¬B: ∀y(∃xP(x) & ¬(¬Q(y) ∨ ∀xR(x)))',
        'Veel De Morgan ja topelt-eitus: ∀y(∃xP(x) & (Q(y) & ¬∀xR(x)))',
        'Kvantori eitus ¬∀xR → ∃x¬R: ∀y(∃xP(x) & (Q(y) & ∃x¬R(x)))',
        'Nimetame seotud muutuja x ümber, et vältida kollisioone: ∀y(∃x₁P(x₁) & (Q(y) & ∃x₂¬R(x₂)))',
        'Toome kvantorid välja (PS3, PS5, PS9): ∀y∃x₁∃x₂(P(x₁) & Q(y) & ¬R(x₂))',
      ],
    },
    {
      formula: '¬∃x(∀yP(x,y) ⇒ ∃zQ(z))',
      title: 'Variant D, ülesanne 4',
      steps: [
        'Eemaldame implikatsiooni: ¬∃x(¬∀yP(x,y) ∨ ∃zQ(z))',
        '¬∃x → ∀x¬: ∀x¬(¬∀yP(x,y) ∨ ∃zQ(z))',
        'De Morgan: ∀x(∀yP(x,y) & ¬∃zQ(z))',
        '¬∃z → ∀z¬: ∀x(∀yP(x,y) & ∀z¬Q(z))',
        'Kvantorid välja (kuna z ei esine teises konjunktis): ∀x∀y∀z(P(x,y) & ¬Q(z))',
      ],
    },
    {
      formula: '¬∀x(∃yP(x,y) ⇒ ∃z¬Q(x,z))',
      title: 'Variant E, ülesanne 4',
      steps: [
        'Eemaldame implikatsiooni: ¬∀x(¬∃yP(x,y) ∨ ∃z¬Q(x,z))',
        '¬∀x → ∃x¬: ∃x¬(¬∃yP(x,y) ∨ ∃z¬Q(x,z))',
        'De Morgan: ∃x(∃yP(x,y) & ¬∃z¬Q(x,z))',
        '¬∃z¬Q → ∀zQ: ∃x(∃yP(x,y) & ∀zQ(x,z))',
        'Kvantorid välja: ∃x∃y∀z(P(x,y) & Q(x,z))',
      ],
    },
    {
      formula: '¬(∀xP(x) ⇒ ∃y∀zQ(y,z))',
      title: 'Variant F, ülesanne 1',
      steps: [
        '¬(A ⇒ B) ≡ A & ¬B: ∀xP(x) & ¬∃y∀zQ(y,z)',
        '¬∃y → ∀y¬: ∀xP(x) & ∀y¬∀zQ(y,z)',
        '¬∀z → ∃z¬: ∀xP(x) & ∀y∃z¬Q(y,z)',
        'Kvantorid välja (kõik muutujad on erinevad): ∀x∀y∃z(P(x) & ¬Q(y,z))',
      ],
    },
  ];

  window.initPrefixWidget = function () {
    const container = document.getElementById('prefixWidget');
    if (!container) return;

    let currentEx = 0;
    let currentStep = 0;

    function render() {
      const ex = EXAMPLES[currentEx];
      container.innerHTML = `
        <div class="card">
          <div style="display:flex; justify-content:space-between; gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:8px;">
            <h3 style="margin:0;">${ex.title}</h3>
            <select id="prefixExSelect" style="max-width:300px;">
              ${EXAMPLES.map((e, i) => `<option value="${i}" ${i === currentEx ? 'selected' : ''}>${e.title}</option>`).join('')}
            </select>
          </div>
          <p><strong>Algvalem:</strong></p>
          <div class="formula" style="font-family:Cambria Math,serif;">${ex.formula}</div>
          <div class="btn-row">
            <button class="btn small secondary" id="prefixPrev" ${currentStep === 0 ? 'disabled' : ''}>← Eelmine</button>
            <button class="btn small" id="prefixNext" ${currentStep >= ex.steps.length ? 'disabled' : ''}>Järgmine samm →</button>
            <button class="btn small secondary" id="prefixReset">Algusesse</button>
            <button class="btn small secondary" id="prefixAll">Näita kõik</button>
          </div>
          <p>Samm <strong>${currentStep}</strong> / ${ex.steps.length}</p>
          <ol class="steps">
            ${ex.steps.slice(0, currentStep).map(s => `<li>${s}</li>`).join('')}
          </ol>
        </div>
      `;

      document.getElementById('prefixExSelect').addEventListener('change', e => {
        currentEx = +e.target.value; currentStep = 0; render();
      });
      document.getElementById('prefixPrev').addEventListener('click', () => {
        if (currentStep > 0) { currentStep--; render(); }
      });
      document.getElementById('prefixNext').addEventListener('click', () => {
        if (currentStep < ex.steps.length) { currentStep++; render(); }
      });
      document.getElementById('prefixReset').addEventListener('click', () => { currentStep = 0; render(); });
      document.getElementById('prefixAll').addEventListener('click', () => { currentStep = ex.steps.length; render(); });
    }
    render();
  };
})();

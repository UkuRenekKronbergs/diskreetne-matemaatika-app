/* ===== PWA install + network status ===== */

(function () {
  'use strict';

  const statusEl = () => document.getElementById('pwaStatus');
  const installBtn = () => document.getElementById('installPwa');
  let deferredPrompt = null;
  let offlineReady = false;

  function setStatus(text) {
    const el = statusEl();
    if (el) el.textContent = text;
  }

  function updateNetworkStatus() {
    if (!('serviceWorker' in navigator)) {
      setStatus('Võrguühenduseta kasutust ei toetata');
      return;
    }
    if (!offlineReady) {
      setStatus('Seadistan võrguühenduseta režiimi...');
      return;
    }
    setStatus(navigator.onLine ? 'Võrguühenduseta kasutus valmis' : 'Võrguühenduseta režiim');
  }

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredPrompt = event;
    const btn = installBtn();
    if (btn) btn.hidden = false;
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    const btn = installBtn();
    if (btn) btn.hidden = true;
    setStatus('Paigaldatud');
  });

  document.addEventListener('DOMContentLoaded', () => {
    const btn = installBtn();
    if (btn) {
      btn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        btn.hidden = true;
      });
    }

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    updateNetworkStatus();
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
          if (registration.waiting) registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          return navigator.serviceWorker.ready;
        })
        .then(() => {
          offlineReady = true;
          updateNetworkStatus();
        })
        .catch(() => setStatus('Võrguühenduseta seadistus ebaõnnestus'));
    });
  }
})();

const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

function updateUI(enabled) {
  toggle.checked = enabled;
  status.textContent = enabled ? 'Auto Correct is ON' : 'Auto Correct is OFF';
}

chrome.storage.sync.get({ autoCorrectEnabled: false }, (data) => {
  updateUI(data.autoCorrectEnabled);
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.sync.set({ autoCorrectEnabled: enabled }, () => {
    updateUI(enabled);
  });
});

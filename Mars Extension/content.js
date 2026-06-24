let autoCorrectEnabled = false;

const corrections = [
  ["\bteh\b", "the"],
  ["\badn\b", "and"],
  ["\brecieve\b", "receive"],
  ["\bgrmerly\b", "grammarly"],
  ["\bim\b", "I'm"],
  ["\bThier\b", "Their"],
  ["\bthier\b", "their"],
  ["\boccured\b", "occurred"],
  ["\bseperate\b", "separate"]
];

function fixText(text) {
  let corrected = text;
  corrections.forEach(([pattern, replacement]) => {
    corrected = corrected.replace(new RegExp(pattern, 'g'), replacement);
  });
  return corrected;
}

function isEditable(element) {
  return element && (element.nodeName === 'TEXTAREA' || (element.nodeName === 'INPUT' && element.type === 'text'));
}

function applyCorrection(element) {
  if (!autoCorrectEnabled || !isEditable(element)) return;
  const original = element.value;
  const corrected = fixText(original);
  if (corrected !== original) {
    element.value = corrected;
  }
}

document.addEventListener('focusout', (event) => {
  applyCorrection(event.target);
});

document.addEventListener('paste', (event) => {
  const target = event.target;
  if (!isEditable(target)) return;
  window.setTimeout(() => applyCorrection(target), 0);
});

chrome.storage.sync.get({ autoCorrectEnabled: false }, (data) => {
  autoCorrectEnabled = data.autoCorrectEnabled;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoCorrectEnabled) {
    autoCorrectEnabled = changes.autoCorrectEnabled.newValue;
  }
});

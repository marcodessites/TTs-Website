let autoCorrectEnabled = false;

const corrections = [
  [/\bteh\b/g, 'the'],
  [/\badn\b/g, 'and'],
  [/\brecieve\b/g, 'receive'],
  [/\bgrmerly\b/g, 'grammarly'],
  [/\bim\b/g, "I'm"],
  [/\bThier\b/g, 'Their'],
  [/\bthier\b/g, 'their'],
  [/\boccured\b/g, 'occurred'],
  [/\bseperate\b/g, 'separate']
];

function fixText(text) {
  let corrected = text;
  corrections.forEach(([pattern, replacement]) => {
    corrected = corrected.replace(pattern, replacement);
  });
  return corrected;
}

function isEditable(element) {
  return element && (element.nodeName === 'TEXTAREA' || (element.nodeName === 'INPUT' && element.type === 'text'));
}

function flashCorrection(element) {
  element.classList.add('mars-corrected-field');
  setTimeout(() => {
    element.classList.remove('mars-corrected-field');
  }, 700);
}

function applyCorrection(element) {
  if (!autoCorrectEnabled || !isEditable(element)) return;
  const original = element.value;
  const corrected = fixText(original);
  if (corrected !== original) {
    const cursorPosition = element.selectionStart;
    element.value = corrected;
    element.setSelectionRange(cursorPosition, cursorPosition);
    flashCorrection(element);
  }
}

function handleInputEvent(event) {
  const target = event.target;
  if (!isEditable(target)) return;
  if (event.inputType === 'insertText' && /\s/.test(event.data)) {
    applyCorrection(target);
  }
}

document.addEventListener('input', handleInputEvent);
document.addEventListener('focusout', (event) => {
  applyCorrection(event.target);
});

document.addEventListener('paste', (event) => {
  const target = event.target;
  if (!isEditable(target)) return;
  window.setTimeout(() => applyCorrection(target), 0);
});

const style = document.createElement('style');
style.textContent = `
.mars-corrected-field {
  box-shadow: inset 0 -3px 0 0 rgba(59, 130, 246, 0.95);
  transition: box-shadow 0.25s ease;
}
`;
document.head.appendChild(style);

chrome.storage.sync.get({ autoCorrectEnabled: false }, (data) => {
  autoCorrectEnabled = data.autoCorrectEnabled;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoCorrectEnabled) {
    autoCorrectEnabled = changes.autoCorrectEnabled.newValue;
  }
});

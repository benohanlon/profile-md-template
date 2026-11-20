const prompt = document.querySelector('[data-prompt]');
const profileLink = prompt.querySelector('[data-profile-link]');
if (location.protocol === 'https:' || location.protocol === 'http:') profileLink.textContent = profileLink.href;
const promptText = Array.from(prompt.children, paragraph => paragraph.textContent.trim()).join('\n\n');
const status = document.querySelector('[data-status]');
const copy = document.querySelector('[data-copy]');

async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(promptText);
    status.textContent = 'Prompt copied.';
  } catch {
    const details = prompt.closest('details');
    if (details) details.open = true;
    const range = document.createRange();
    range.selectNodeContents(prompt);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = 'The prompt is selected. Copy it into your AI.';
  }
}

for (const link of document.querySelectorAll('[data-provider]')) {
  if (link.dataset.provider === 'gemini') {
    link.addEventListener('click', copyPrompt);
    link.target = '_blank';
    link.rel = 'noopener';
  } else {
    const url = new URL(link.href);
    url.searchParams.set('q', promptText);
    link.href = url.href;
  }
}

copy.addEventListener('click', copyPrompt);
copy.hidden = false;
document.querySelector('[data-providers]').hidden = false;

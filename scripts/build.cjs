const fs = require('node:fs');
const path = require('node:path');
const { Marked } = require('./vendor/marked.umd.js');

const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'profile.md'), 'utf8');
const markdown = new Marked({ renderer: { html() { return ''; } } });
const tokens = markdown.lexer(source);
const name = tokens.find(token => token.type === 'heading' && token.depth === 1)?.text;
const guidance = tokens.findIndex(token => token.type === 'heading' && token.text === 'Agent instructions');
const ooda = tokens.findIndex(token => token.type === 'heading' && token.text === 'Run the full OODA loop');

if (!name || guidance < 0 || ooda <= guidance || !tokens.slice(ooda + 1).some(token => token.type === 'paragraph')) {
  throw new Error('profile.md needs a name, Agent instructions, and a Run the full OODA loop section.');
}

function render(blocks) {
  return markdown.parser(blocks.filter(token =>
    !(token.type === 'paragraph' && token.tokens.length === 1 && token.tokens[0].type === 'em')));
}

const safeName = name.replace(/[&<>"']/g, character =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const profile = render(tokens.slice(0, guidance));
const instructions = render(tokens.slice(guidance + 1));
const longPrompt = render(tokens.slice(ooda + 1));
const profileLink = '<a data-profile-link href="./profile.md">profile.md</a>';

function prompt(content) {
  return `<section class="prompt" aria-label="Copy and paste into your AI">
  ${content}
  <div class="actions">
    <button data-copy type="button" hidden>Copy prompt</button>
    <div data-providers hidden><a data-provider="chatgpt" href="https://chatgpt.com/">ChatGPT</a> · <a data-provider="claude" href="https://claude.ai/new">Claude</a> · <a data-provider="gemini" href="https://gemini.google.com/app">Gemini</a></div>
  </div>
  <p data-status role="status"></p>
</section>`;
}

function page(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <link rel="alternate" type="text/markdown" href="./profile.md" title="Markdown profile">
  <link rel="stylesheet" href="./assets/site.css">
  <script src="./scripts/launcher.js" defer></script>
</head>
<body>
<main>
${body}
</main>
</body>
</html>
`;
}

const pages = {
  'index.html': page(safeName, `<div class="opening">
  <a class="cover" href="./adventure.html">
    <span>Choose your own adventure</span>
    <strong>Find your next move</strong>
    <span>Turn to page one →</span>
  </a>
  ${prompt(`<h2>Copy and paste this into your AI</h2>
  <blockquote data-prompt><p>Read ${profileLink} and run a choose-your-own-adventure from the Markdown. Give me the choices and I’ll reply.</p></blockquote>`)}
</div>
<article class="profile">
  <a href="./profile.md">Read profile.md</a>
  ${profile}
  <details><summary>Agent instructions</summary>${instructions}</details>
</article>`),
  'adventure.html': page('Find your next move · ' + safeName, `<nav><a href="./">← Back to the profile</a></nav>
<div class="spread">
  <section class="leaf">
    <p class="series">Choose your own adventure</p>
    <h1>Find your next move</h1>
    <p>What are you trying to change? How will you know you’ve made progress?</p>
  </section>
  <section class="leaf">
    <h2>Brief your AI</h2>
    ${prompt(`<details>
      <summary>Read the full prompt</summary>
      <blockquote data-prompt>
        <p>Start with ${profileLink}. Read its Agent instructions and follow the links relevant to my question or decision. If you can’t open the Markdown, ask me to paste it or upload it.</p>
        ${longPrompt}
      </blockquote>
    </details>`)}
  </section>
</div>`)
};

for (const [filename, contents] of Object.entries(pages)) {
  const file = path.join(root, filename);
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n') !== contents) {
      console.error(`${filename} is out of date. Run node scripts/build.cjs.`);
      process.exitCode = 1;
    }
  } else {
    fs.writeFileSync(file, contents);
  }
}

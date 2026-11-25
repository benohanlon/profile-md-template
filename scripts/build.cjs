const fs = require('node:fs');
const path = require('node:path');
const { Marked } = require('./vendor/marked.umd.js');

const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'profile.md'), 'utf8');
const slug = text => text.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').trim().replace(/\s+/g, '-');
const markdown = new Marked({ renderer: {
  html() { return ''; },
  heading({ depth, text, tokens }) {
    return `<h${depth} id="${slug(text)}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
  }
} });
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
function subsection(title) {
  const start = tokens.findIndex(token => token.type === 'heading' && token.text === title);
  if (start < 0) return [];
  const rest = tokens.slice(start + 1);
  const end = rest.findIndex(token => token.type === 'heading' && token.depth <= tokens[start].depth);
  return end < 0 ? rest : rest.slice(0, end);
}
const publicBlocks = tokens.slice(0, guidance);
const fit = publicBlocks.findIndex(token => token.type === 'heading' && token.text === 'Where I’m a good fit');
let profile = render(publicBlocks);
if (fit >= 0) {
  const end = fit + 1 + subsection('Where I’m a good fit').length;
  profile = render(publicBlocks.slice(0, fit)) +
    '<details id="where-im-a-good-fit"><summary>Where I’m a good fit</summary>' +
    render(publicBlocks.slice(fit + 1, end)) + '</details>' + render(publicBlocks.slice(end));
}
const chapter = render(subsection('Opening')) + render(subsection('Where would you like to begin?'))
  .replace(/href="#/g, 'href="./index.html#');
const instructions = render(tokens.slice(guidance + 1));
const longPrompt = render(tokens.slice(ooda + 1));
const profileLink = '<a data-profile-link href="./profile.md">profile.md</a>';
const quickstartLink = '<a data-profile-link href="./agent-quickstart.md">agent-quickstart.md</a>';
const readerGuide = tokens.slice(guidance + 1)
  .filter(token => !(token.type === 'paragraph' && token.tokens.length === 1 && token.tokens[0].type === 'em'))
  .map(token => token.raw).join('').replace(/\]\(#/g, '](./profile.md#')
  .replace(/Read \[the agent quickstart\]\(\.\/agent-quickstart\.md\) first\. /, '');

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
  'agent-quickstart.md': `# Agent quickstart\n\nRead [the profile](./profile.md) for the owner’s public evidence.\n\n${readerGuide.trim()}\n`,
  'index.html': page(safeName, `<div class="opening">
  <a class="cover" href="./adventure.html">
    <span>Choose your own adventure</span>
    <strong>Find your next move</strong>
    <span>Turn to page one →</span>
  </a>
  ${prompt(`<h2>Copy and paste this into your AI</h2>
  <blockquote data-prompt><p>Read ${quickstartLink} first, then run a choose-your-own-adventure from ${profileLink}. Give me the choices and I’ll reply.</p></blockquote>`)}
</div>
<article class="profile">
  <a href="./profile.md">Read profile.md</a> · <a href="./profile.md" download>Download Markdown</a>
  ${profile}
  <details><summary>Agent instructions</summary>${instructions}</details>
</article>`),
  'adventure.html': page('Find your next move · ' + safeName, `<nav><a href="./">← Back to the profile</a></nav>
<div class="spread">
  <section class="leaf">
    <p class="series">Choose your own adventure</p>
    <h1>Find your next move</h1>
    ${chapter || '<p>What are you trying to change? How will you know you’ve made progress?</p>'}
  </section>
  <section class="leaf">
    <h2>Brief your AI</h2>
    ${prompt(`<details>
      <summary>Read the full prompt</summary>
      <blockquote data-prompt>
        <p>Start with ${quickstartLink}, then use ${profileLink} and the evidence relevant to my question or decision. If you can’t open the Markdown, ask me to paste it or upload it.</p>
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

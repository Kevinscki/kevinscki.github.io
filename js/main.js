const ASSET = 'assets/runtime';

const icons = {
  computer: `${ASSET}/icons/my-computer.png`,
  folder: `${ASSET}/icons/folder-open.png`,
  browser: `${ASSET}/icons/internet-explorer.png`,
  globe: `${ASSET}/icons/globe.png`,
  terminal: `${ASSET}/icons/command-prompt.png`,
  people: `${ASSET}/icons/people.png`,
  help: `${ASSET}/icons/help.png`,
  recycle: `${ASSET}/icons/recycle-empty.png`,
  recycleFull: `${ASSET}/icons/recycle-full.png`
};

const links = {
  github: 'https://github.com/Kevinscki',
  medium: 'https://medium.com/@kelvinrutatina',
  bitcoin: 'https://medium.com/@kelvinrutatina/bitcoin-explained-to-an-8-year-old-prodigy-9e693d038a39',
  solanaGuide: 'https://medium.com/@kelvinrutatina/making-a-solana-token-token-2022-guide-7d5a7747cd87',
  usbStorage: 'https://medium.com/@kelvinrutatina/usbstorage-writeup-nullcon-2025-d8c7a27d6bf7',
  linkedin: 'https://linkedin.com/in/kelvinrutatina',
  ctfguide: 'https://ctfguide.com/leaderboards',
  llamaTerm: 'https://github.com/Kevinscki/llama_term',
  currior: 'https://github.com/Kevinscki/currior_anomaly_workflow',
  omnihealth: 'https://github.com/hanesonesmo/omnihealth',
  stereoMatrix: 'https://github.com/Kevinscki/stereo-matrix-virtualizer',
  stkn: 'https://github.com/Kevinscki/stkn',
  email: 'mailto:kelvinrutatina@gmail.com',
  cv: 'downloads/Kelvin_Rutatina_CV.pdf'
};

const APPS = {
  computer: { title: 'My Computer', icon: icons.computer, address: 'C:\\', render: renderComputer },
  projects: { title: 'Projects', icon: icons.folder, address: 'C:\\PROJECTS', render: renderProjects },
  academics: { title: 'Academics', icon: icons.help, address: 'C:\\ACADEMICS', render: renderAcademics },
  writing: { title: 'Write-Ups', icon: icons.globe, address: 'C:\\WRITEUPS', render: renderWriting },
  socials: { title: 'Socials', icon: icons.people, address: 'C:\\SOCIALS', render: renderSocials },
  cv: { title: 'CV', icon: icons.folder, address: 'C:\\CV', render: renderCV },
  browser: { title: 'Internet Explorer', icon: icons.browser, address: links.github, render: renderBrowser },
  terminal: { title: 'Command Prompt', icon: icons.terminal, address: 'C:\\WINDOWS\\system32\\cmd.exe', render: terminalMarkup },
  recycle: { title: 'Recycle Bin', icon: icons.recycle, address: 'C:\\RECYCLER', render: renderRecycle }
};

const desktopAppIds = ['computer', 'projects', 'writing', 'browser', 'terminal', 'recycle'];
const startAppIds = ['projects', 'writing', 'browser', 'terminal'];
const explorerAppIds = new Set(['computer', 'projects', 'academics', 'writing', 'socials', 'cv', 'recycle']);

const virtualFs = {
  'C:\\': { type: 'dir', children: ['PROJECTS', 'ACADEMICS', 'WRITEUPS', 'SOCIALS', 'CV', 'README.TXT'] },
  'C:\\PROJECTS': { type: 'dir', children: ['AURORA.TXT', 'LLAMATERM.URL', 'CURRIOR.URL', 'STKN.URL', 'OMNIHEALTH.URL', 'PROMPTTHEFLAG.TXT', 'AUTOMATION.TXT'] },
  'C:\\ACADEMICS': { type: 'dir', children: ['DEGREE.TXT', 'CERTIFICATIONS.TXT', 'LABS.TXT', 'CTFGUIDE.URL'] },
  'C:\\WRITEUPS': { type: 'dir', children: ['BITCOIN.URL', 'SOLANA_TOKEN_2022.URL', 'USBSTORAGE_NULLCON.URL', 'MEDIUM.URL'] },
  'C:\\RECYCLER': { type: 'dir', children: ['STEREO_MATRIX_VIRTUALIZER.URL'] },
  'C:\\SOCIALS': { type: 'dir', children: ['GITHUB.URL', 'MEDIUM.URL', 'LINKEDIN.URL', 'EMAIL.URL'] },
  'C:\\CV': { type: 'dir', children: ['KELVIN_RUTATINA_CV.PDF'] },
  'C:\\README.TXT': { type: 'file', content: 'HOW TO USE THIS PORTFOLIO\n\n• Double-click a desktop icon to open it.\n• Open folders to move through Projects, Academics, Write-Ups, Socials, and CV.\n• Type a location such as C:\\PROJECTS in the Address bar, then press Enter or Go.\n• Use Back, Forward, and Up just like Windows Explorer.\n• Open Command Prompt and type HELP to see its commands.\n• Drag across the desktop to select icons.\n• The CV folder contains the downloadable PDF.' },
  'C:\\PROJECTS\\AURORA.TXT': { type: 'file', content: 'AURORA\nCurrent direction: practical sovereign AI compute and local inference infrastructure built around real hardware, operator constraints, and ownership.' },
  'C:\\PROJECTS\\LLAMATERM.URL': { type: 'file', content: 'LlamaTerm — a Python terminal assistant backed by a local Ollama model. It attempts a command normally, then asks the model to diagnose a failed command and lets the operator review the proposed replacement before execution. The project also keeps command history and persistent shell variables.', href: links.llamaTerm },
  'C:\\PROJECTS\\CURRIOR.URL': { type: 'file', content: 'Currior Anomaly Workflow — an automated anomaly-detection pipeline integrating local AI models and external data streams.', href: links.currior },
  'C:\\PROJECTS\\STKN.URL': { type: 'file', content: 'stkn — the hosted image and metadata artifact used by Kelvin’s Token-2022 walkthrough. The guide creates a test-only devnet token with spl-token, mints supply, and initializes publicly hosted metadata on-chain.', href: links.stkn },
  'C:\\PROJECTS\\OMNIHEALTH.URL': { type: 'file', content: 'Omnihealth — open-source healthcare software to which Kelvin contributed.', href: links.omnihealth },
  'C:\\PROJECTS\\PROMPTTHEFLAG.TXT': { type: 'file', content: 'PromptTheFlag — bypassed LLM guardrails across all seven challenge levels using adversarial prompt techniques.' },
  'C:\\PROJECTS\\AUTOMATION.TXT': { type: 'file', content: 'Security-minded operator workflows using n8n, Activepieces, Ollama, APIs, and MCP tooling.' },
  'C:\\ACADEMICS\\DEGREE.TXT': { type: 'file', content: 'First-Class Bachelor of Cybersecurity graduate, Institute of Accountancy Arusha.' },
  'C:\\ACADEMICS\\CERTIFICATIONS.TXT': { type: 'file', content: 'eLearnSecurity Junior Penetration Tester (eJPT)\nAI 101: Fundamentals — TCM Security' },
  'C:\\ACADEMICS\\LABS.TXT': { type: 'file', content: 'Hands-on work across Hack The Box, TryHackMe, Nullcon, PicoCTF, CTFZone, and PromptTheFlag.' },
  'C:\\ACADEMICS\\CTFGUIDE.URL': { type: 'file', content: 'CTFGuide competitor and leaderboard handle: kevinscki.', href: links.ctfguide },
  'C:\\WRITEUPS\\BITCOIN.URL': { type: 'file', content: 'Bitcoin Explained to an 8-Year-Old Prodigy — a 13-minute, ground-up explanation of distributed trust, keys, addresses, nodes, transactions, proof-of-work mining, custody, seed phrases, liquidity, regulation, market behavior, and risk.', href: links.bitcoin },
  'C:\\WRITEUPS\\SOLANA_TOKEN_2022.URL': { type: 'file', content: 'Making a Solana Token (Token-2022 Guide) — a reproducible, test-only devnet walkthrough using Rust, Solana CLI, and spl-token. It covers keypair setup, token and account creation, minting, hosted JSON/image metadata, and on-chain initialization.', href: links.solanaGuide },
  'C:\\WRITEUPS\\USBSTORAGE_NULLCON.URL': { type: 'file', content: 'USBstorage Writeup — nullcon (2025), covering the first CTF challenge listed in the event\'s misc category.', href: links.usbStorage },
  'C:\\WRITEUPS\\MEDIUM.URL': { type: 'file', content: 'Kelvin Rutatina on Medium', href: links.medium },
  'C:\\RECYCLER\\STEREO_MATRIX_VIRTUALIZER.URL': { type: 'file', content: 'Stereo Matrix Virtualizer — an experiment built to explore virtual-surround processing from stereo audio.', href: links.stereoMatrix },
  'C:\\SOCIALS\\GITHUB.URL': { type: 'file', content: 'GitHub: github.com/Kevinscki', href: links.github },
  'C:\\SOCIALS\\MEDIUM.URL': { type: 'file', content: 'Medium: medium.com/@kelvinrutatina', href: links.medium },
  'C:\\SOCIALS\\LINKEDIN.URL': { type: 'file', content: 'LinkedIn: linkedin.com/in/kelvinrutatina', href: links.linkedin },
  'C:\\SOCIALS\\EMAIL.URL': { type: 'file', content: 'Email: kelvinrutatina@gmail.com', href: links.email },
  'C:\\CV\\KELVIN_RUTATINA_CV.PDF': { type: 'file', content: 'First-Class Cybersecurity graduate working across AI security, local model infrastructure, offensive security, and automation.\n\nSTART CV to download the complete PDF résumé.', href: links.cv }
};

const CLIPPY_MESSAGES = {
  welcome: {
    text: "It looks like you’re trying to explore Kelvin’s portfolio. Start with Current Work, browse C:\\, or open Command Prompt if you prefer evidence in a black rectangle.",
    animation: 'wakeup',
    links: [{ label: 'Current work', app: 'projects' }, { label: 'Open C:\\', app: 'computer' }, { label: 'Try CMD', app: 'terminal' }]
  },
  computer: {
    text: 'It looks like you’re trying to inspect this computer. Open a folder to browse the portfolio, or type VOL in Command Prompt to verify the completely ordinary 1 PB drive.',
    animation: 'point-right',
    links: [{ label: 'Browse projects', app: 'projects' }, { label: 'Open CMD', app: 'terminal' }]
  },
  projects: {
    text: 'It looks like you’re trying to judge the projects. Start with Aurora for the current direction, then use LlamaTerm to see how local AI work became an actual operator tool.',
    animation: 'think',
    links: [{ label: 'LlamaTerm on GitHub', href: links.llamaTerm }, { label: 'Read the CV', app: 'cv' }]
  },
  academics: {
    text: 'It looks like you’re checking the academic record. The degree gives the foundation; the labs, Nullcon work, and CTF activity show how it was applied.',
    animation: 'idle',
    links: [{ label: 'CTFGuide leaderboards', href: links.ctfguide }, { label: 'CV', app: 'cv' }]
  },
  writing: {
    text: 'It looks like you’re trying to read the technical work. Pick Bitcoin for explanation, Token-2022 for a reproducible build, or USBstorage for the investigation trail. I’ll hold still.',
    animation: 'still',
    links: [{ label: 'Token-2022 guide', href: links.solanaGuide }, { label: 'Nullcon write-up', href: links.usbStorage }]
  },
  socials: {
    text: 'It looks like you’re trying to find Kelvin elsewhere. Use GitHub for artifacts, Medium for explanations, LinkedIn for the professional trail, or Email for a direct message.',
    animation: 'point-right',
    links: [{ label: 'GitHub', href: links.github }, { label: 'Medium', href: links.medium }]
  },
  cv: {
    text: 'It looks like you’re trying to download the CV. Use the PDF link in this folder; it is the actual CV file, and I’ll stay still while you get it.',
    animation: 'still',
    links: [{ label: 'Download CV', href: links.cv }, { label: 'See projects', app: 'projects' }]
  },
  browser: {
    text: 'It looks like you’re trying to open Kelvin’s GitHub. Use the modern-tab link—Internet Explorer has already done more than anyone expected of it.',
    animation: 'point-right',
    links: [{ label: 'Open GitHub', href: links.github }, { label: 'Socials', app: 'socials' }]
  },
  terminal: {
    text: 'It looks like you’re trying to use Command Prompt. Type HELP for the command list, or begin with DIR, CD PROJECTS, TYPE AURORA.TXT, or VOL.',
    animation: 'think',
    links: [{ label: 'Open C:\\ in Explorer', app: 'computer' }]
  },
  recycle: {
    text: 'It looks like you’re trying to inspect discarded work. Open the experiment for context, then return to Projects for the current, stronger evidence.',
    animation: 'idle',
    links: [{ label: 'Stereo Matrix Virtualizer', href: links.stereoMatrix }, { label: 'Return to projects', app: 'projects' }]
  }
};

const clippyAnimations = {
  still: `${ASSET}/clippy/still.png`,
  idle: `${ASSET}/clippy/idle.webp`,
  wakeup: `${ASSET}/clippy/wakeup.webp`,
  think: `${ASSET}/clippy/think.webp`,
  'point-right': `${ASSET}/clippy/point-right.webp`,
  check: `${ASSET}/clippy/check.webp`,
  read: `${ASSET}/clippy/read.webp`
};

let topZ = 100;
let clippyTimer = null;
const openWindows = new Map();
const desktopIcons = document.querySelector('#desktop-icons');
const startApps = document.querySelector('#start-apps');

function iconMarkup(src, alt = '') {
  return `<img src="${src}" alt="${alt}">`;
}

function externalLink(href, label, className = '') {
  return `<a${className ? ` class="${className}"` : ''} href="${href}" target="_blank" rel="noreferrer">${label}</a>`;
}

function explorerShell(title, lead, content, taskLinks = []) {
  const nav = `<button type="button" data-open="computer">My Computer</button>` + taskLinks.filter(item => item.app !== 'computer').map(item => item.href
    ? `<button type="button" data-href="${item.href}">${item.label}</button>`
    : `<button type="button" data-open="${item.app}">${item.label}</button>`).join('');
  const details = title === 'Local Disk (C:)'
    ? `${title}<br>1.00 PB system volume`
    : `${title}<br>Portfolio folder`;
  return `<div class="explorer">
    <aside class="explorer-sidebar">
      <section class="side-card"><h3>System Tasks</h3><nav>${nav}</nav></section>
      <section class="side-card"><h3>Details</h3><p>${details}</p></section>
    </aside>
    <div class="explorer-main"><h2>${title}</h2><p class="lead">${lead}</p>${content}</div>
  </div>`;
}

function fileEntry({ app, href, path, icon = icons.folder, name, detail = '' }) {
  const attrs = app ? `data-open="${app}"` : path ? `data-location="${path}"` : `data-href="${href}"`;
  return `<button type="button" class="file-entry" ${attrs}>${iconMarkup(icon)}<span>${name}</span>${detail ? `<small>${detail}</small>` : ''}</button>`;
}

function renderComputer() {
  const folders = [
    { app: 'projects', name: 'Projects', detail: 'File Folder' },
    { app: 'academics', name: 'Academics', detail: 'File Folder' },
    { app: 'writing', name: 'Write-Ups', detail: 'File Folder' },
    { app: 'socials', name: 'Socials', detail: 'File Folder' },
    { app: 'cv', name: 'CV', detail: 'File Folder' },
    { path: 'C:\\README.TXT', name: 'README.TXT', detail: 'Text Document', icon: icons.help }
  ].map(fileEntry).join('');
  return explorerShell('Local Disk (C:)', 'Portfolio folders stored on this computer. Open a folder or type its path in the Address bar.', `
    <div class="drive-list">
      <article class="drive">${iconMarkup(icons.computer)}<div><strong>Local Disk (C:)</strong><div class="capacity"><i></i></div><small>VOL: KELVIN_PORTFOLIO · 1.00 PB capacity · totally real</small></div></article>
    </div>
    <h3>Files and Folders</h3><div class="file-grid">${folders}</div>
  `, [{ label: 'Open Command Prompt', app: 'terminal' }, { label: 'View projects', app: 'projects' }]);
}

function renderProjects() {
  return explorerShell('C:\\PROJECTS', 'Working systems, research prototypes, and implementation artifacts. Each entry explains what was built, how it operates, and where the evidence lives.', `
    <div class="cards">
      <article class="card featured"><h3>Aurora — current build</h3><p>Practical sovereign AI compute and local inference infrastructure built around ownership, real hardware constraints, and operator usability. Current work includes defining the compute build and sourcing path.</p><div class="tag-list"><span class="tag">local AI</span><span class="tag">compute</span><span class="tag">infrastructure</span><span class="tag">in progress</span></div></article>
      <article class="card"><h3>LlamaTerm</h3><p>A Python command-line assistant that runs against a local Ollama model. Commands execute normally first; when one fails, the model diagnoses the error and proposes a replacement for the operator to review. The shell also persists history and variables instead of treating the model as a remote black box.</p>${externalLink(links.llamaTerm, 'Open repository')}</article>
      <article class="card"><h3>Currior Anomaly Workflow</h3><p>A workflow experiment for routing system and external data through local AI analysis, with custom anomaly logic separating collection, interpretation, and operator review. It explores how useful detection can remain local and automatable.</p>${externalLink(links.currior, 'Open repository')}</article>
      <article class="card"><h3>stkn — Solana Token-2022</h3><p>The public metadata artifact behind a reproducible Token-2022 build. The accompanying guide uses devnet deliberately, then walks through CLI setup, keypairs, minting, hosted JSON/image metadata, and on-chain initialization without implying a real-currency launch.</p>${externalLink(links.stkn, 'Open repository')} · ${externalLink(links.solanaGuide, 'Read the guide')}</article>
      <article class="card"><h3>Omnihealth</h3><p>An open-source healthcare application contribution: a useful example of working inside an existing codebase where domain context, maintainability, and collaboration matter as much as starting from scratch.</p>${externalLink(links.omnihealth, 'Open repository')}</article>
      <article class="card"><h3>PromptTheFlag</h3><p>Completed all seven LLM guardrail and prompt-injection challenge levels using adversarial manipulation techniques.</p><div class="tag-list"><span class="tag">LLM security</span><span class="tag">7 / 7</span></div></article>
      <article class="card"><h3>Operator automation</h3><p>Security-minded workflows connecting n8n and Activepieces with Ollama, APIs, Telegram, and MCP tools. The emphasis is on observable hand-offs and human review points—not hiding consequential actions behind an impressive-looking demo.</p><div class="tag-list"><span class="tag">automation</span><span class="tag">local-first</span></div></article>
    </div>
  `, [{ label: 'Open GitHub', app: 'browser' }, { label: 'Read write-ups', app: 'writing' }]);
}

function renderAcademics() {
  return explorerShell('C:\\ACADEMICS', 'A First-Class cybersecurity foundation reinforced through practical certifications, labs, CTFs, and applied AI-security work.', `
    <div class="timeline">
      <article><h3>First-Class Bachelor of Cybersecurity</h3><strong>Institute of Accountancy Arusha</strong><p>Formal study spanning cybersecurity principles, systems, and applied technical practice.</p></article>
      <article><h3>eLearnSecurity Junior Penetration Tester</h3><strong>INE Security</strong><p>Offensive-security methodology and practical assessment.</p></article>
      <article><h3>AI 101: Fundamentals</h3><strong>TCM Security</strong><p>AI fundamentals supporting later local-model and LLM-security work.</p></article>
      <article><h3>Labs and CTFs</h3><p>Hack The Box, TryHackMe, Nullcon, PicoCTF, CTFZone, and PromptTheFlag.</p></article>
      <article><h3>CTFGuide — kevinscki</h3><strong>Security practice</strong><p>Challenge activity under the handle <code>kevinscki</code>.</p>${externalLink(links.ctfguide, 'Open leaderboards')}</article>
    </div>
  `, [{ label: 'Read CV', app: 'cv' }, { label: 'View projects', app: 'projects' }]);
}

function renderWriting() {
  return explorerShell('C:\\WRITEUPS', 'Long-form explanations and reproducible walkthroughs that expose the reasoning, constraints, commands, and trade-offs behind the work.', `
    <div class="cards">
      <article class="card featured"><h3>Bitcoin Explained to an 8-Year-Old Prodigy</h3><p>A 13-minute bridge from first principles to operational and economic reality: distributed trust, keys and addresses, node validation, proof-of-work mining, custody, seed phrases, liquidity, regulation, market behavior, and risk. It explains where trust moves instead of pretending blockchain removes it.</p>${externalLink(links.bitcoin, 'Read on Medium')}</article>
      <article class="card"><h3>Making a Solana Token — Token-2022 Guide</h3><p>A test-only devnet walkthrough built for reproduction on a Linux/Unix terminal. It installs the toolchain, creates a keypair and token account, mints supply, prepares public JSON/image metadata, and initializes that metadata on-chain.</p>${externalLink(links.solanaGuide, 'Read on Medium')} · ${externalLink(links.stkn, 'Open stkn')}</article>
      <article class="card"><h3>USBstorage Writeup — nullcon (2025)</h3><p>A challenge write-up from nullcon’s miscellaneous category. It records the investigation path and resulting solution as a repeatable technical artifact rather than reducing the work to a leaderboard result.</p>${externalLink(links.usbStorage, 'Read on Medium')}</article>
      <article class="card"><h3>More from Kelvin</h3><p>Security, blockchain systems, local AI, and implementation notes.</p>${externalLink(links.medium, 'Open Medium profile')}</article>
    </div>
  `, [{ label: 'Open Medium', href: links.medium }, { label: 'View projects', app: 'projects' }]);
}

function renderSocials() {
  return explorerShell('C:\\SOCIALS', 'Different surfaces for proof, depth, professional discovery, and direct contact.', `
    <div class="file-grid">
      ${fileEntry({ href: links.github, icon: icons.computer, name: 'GitHub', detail: 'Code and artifacts' })}
      ${fileEntry({ href: links.medium, icon: icons.globe, name: 'Medium', detail: 'Technical writing' })}
      ${fileEntry({ href: links.linkedin, icon: icons.people, name: 'LinkedIn', detail: 'Professional directory' })}
      ${fileEntry({ href: links.email, icon: icons.help, name: 'Email', detail: 'Direct contact' })}
    </div>
  `, [{ label: 'Open GitHub browser', app: 'browser' }, { label: 'Read CV', app: 'cv' }]);
}

function renderCV() {
  return explorerShell('C:\\CV', 'A compact version of the formal record. The complete résumé is available as a PDF.', `
    <div class="profile-grid">
      <section class="card"><h3>Kelvin Rutatina</h3><p>Cybersecurity Engineer · AI Security · Security Automation · Offensive Security</p><dl><dt>Location</dt><dd>Arusha, Tanzania</dd><dt>Email</dt><dd>kelvinrutatina@gmail.com</dd><dt>Education</dt><dd>First-Class Bachelor of Cybersecurity</dd></dl></section>
      <section class="card"><h3>Focus</h3><p>Local LLM deployment, AI infrastructure, LLM security, offensive security, Linux systems, workflow automation, and API/MCP tooling.</p><p>${externalLink(links.cv, 'Download complete CV', 'xp-button')}</p></section>
    </div>
  `, [{ label: 'View academics', app: 'academics' }, { label: 'View projects', app: 'projects' }]);
}

function renderBrowser() {
  return `<div class="browser-page"><article class="browser-hero"><p>Microsoft Internet Explorer</p><h2>Kelvin on GitHub</h2><p>This browser's home page is Kelvin's public code shelf: repositories, experiments, and the artifacts behind the claims elsewhere on this desktop.</p><p><code>${links.github}</code></p><p>${externalLink(links.github, 'Open GitHub in a modern tab', 'xp-button')}</p><hr><p><small>Tip: type <strong>START GITHUB</strong> in Command Prompt to arrive at the same place.</small></p></article></div>`;
}

function renderRecycle() {
  return explorerShell('C:\\RECYCLER', 'Experiments, discarded directions, and lessons that still earned disk space.', `
    <div class="cards">
      <article class="card"><h3>Stereo Matrix Virtualizer</h3><p>An experiment built to explore virtual-surround processing from stereo audio. Kept here as useful evidence, not presented as flagship work.</p>${externalLink(links.stereoMatrix, 'Open repository')}</article>
      <article class="card"><h3>Nothing performative here</h3><p>Small experiments belong here when they are useful context but not flagship proof. Recycle Bin is intentionally not empty; iteration leaves evidence.</p></article>
    </div>
  `, [{ label: 'Open current projects', app: 'projects' }]);
}

function terminalMarkup() {
  return `<div class="terminal-wrap"><div class="terminal-output" aria-live="polite"></div><form class="terminal-form" autocomplete="off"><span class="terminal-prompt">C:\\&gt;</span><input class="terminal-input" aria-label="Command input" spellcheck="false" autofocus></form></div>`;
}

function buildLaunchers() {
  desktopAppIds.forEach(id => {
    const app = APPS[id];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'desktop-icon';
    button.dataset.open = id;
    button.innerHTML = `${iconMarkup(app.icon)}<span>${app.title}</span>`;
    desktopIcons.append(button);
  });
  startAppIds.forEach(id => {
    const app = APPS[id];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'start-app';
    button.dataset.open = id;
    button.innerHTML = `${iconMarkup(app.icon)}<span><strong>${app.title}</strong><br><small>${app.address}</small></span>`;
    startApps.append(button);
  });
}

function openApp(id) {
  closeStart();
  const app = APPS[id];
  if (!app) return;
  if (openWindows.has(id)) {
    const existing = openWindows.get(id);
    existing.classList.remove('minimized');
    if (existing.dataset.app !== id) navigateWindowToApp(existing, id);
    focusWindow(existing);
    return;
  }

  const win = document.querySelector('#window-template').content.firstElementChild.cloneNode(true);
  win.dataset.app = id;
  win.dataset.windowId = id;
  win.querySelector('.title-icon').src = app.icon;
  win.querySelector('.window-title').textContent = app.title;
  win.querySelector('.address-value').value = app.address;
  win.querySelector('.window-content').innerHTML = app.render();
  win.querySelector('.status-text').textContent = id === 'computer' ? '6 objects' : `${app.title} — ready`;

  const offset = (openWindows.size % 7) * 18;
  win.style.left = `calc(50% + ${offset}px)`;
  win.style.top = `calc(46% + ${offset}px)`;
  document.querySelector('#window-layer').append(win);
  openWindows.set(id, win);
  win._navHistory = [{ type: 'app', id }];
  win._navIndex = win._navHistory.length - 1;
  bindWindow(win);
  addTaskButton(id);
  if (id === 'terminal') initTerminal(win);
  focusWindow(win);
  history.replaceState(null, '', `#${id}`);
}

function bindWindow(win) {
  const id = win.dataset.windowId;
  win.addEventListener('pointerdown', () => focusWindow(win));
  win.querySelector('[data-action="close"]').addEventListener('click', () => closeWindow(id));
  win.querySelector('[data-action="minimize"]').addEventListener('click', () => {
    win.classList.add('minimized');
    win.classList.remove('active');
    document.querySelector(`[data-task="${id}"]`)?.classList.remove('active');
    focusTopWindow();
  });
  win.querySelector('[data-action="maximize"]').addEventListener('click', () => win.classList.toggle('maximized'));
  win.querySelector('.titlebar').addEventListener('dblclick', event => {
    if (!event.target.closest('button')) win.classList.toggle('maximized');
  });
  win.querySelector('.addressbar').addEventListener('submit', event => {
    event.preventDefault();
    navigateToLocation(win, win.querySelector('.address-value').value);
  });
  win.querySelector('.nav-back').addEventListener('click', () => moveWindowHistory(win, -1));
  win.querySelector('.nav-forward').addEventListener('click', () => moveWindowHistory(win, 1));
  win.querySelector('.nav-up').addEventListener('click', () => {
    if (!explorerAppIds.has(win.dataset.app)) return;
    if (win.dataset.filePath) {
      const parent = win.dataset.filePath.substring(0, win.dataset.filePath.lastIndexOf('\\')) || 'C:\\';
      navigateWindowToApp(win, locationApps[parent] || 'computer');
    } else navigateWindowToApp(win, 'computer');
  });
  syncNavigationControls(win);
  const menuTrigger = win.querySelector('.menu-trigger');
  menuTrigger.addEventListener('click', event => {
    event.stopPropagation();
    const menu = menuTrigger.closest('.menu-root');
    const open = menu.classList.toggle('open');
    menuTrigger.setAttribute('aria-expanded', String(open));
  });

  let drag = null;
  const bar = win.querySelector('.titlebar');
  bar.addEventListener('pointerdown', event => {
    if (event.target.closest('button') || win.classList.contains('maximized') || innerWidth < 721) return;
    const rect = win.getBoundingClientRect();
    win.style.transform = 'none';
    win.style.left = `${rect.left}px`;
    win.style.top = `${rect.top}px`;
    drag = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    bar.setPointerCapture(event.pointerId);
  });
  bar.addEventListener('pointermove', event => {
    if (!drag) return;
    win.style.left = `${Math.max(0, Math.min(innerWidth - win.offsetWidth, event.clientX - drag.x))}px`;
    win.style.top = `${Math.max(0, Math.min(innerHeight - 70, event.clientY - drag.y))}px`;
  });
  bar.addEventListener('pointerup', () => { drag = null; });
  bar.addEventListener('pointercancel', () => { drag = null; });
}

function navigateWindowToApp(win, id, push = true) {
  const app = APPS[id];
  if (!app) return;
  win.dataset.app = id;
  delete win.dataset.filePath;
  win.querySelector('.title-icon').src = app.icon;
  win.querySelector('.window-title').textContent = app.title;
  win.querySelector('.address-value').value = app.address;
  win.querySelector('.address-value').removeAttribute('aria-invalid');
  win.querySelector('.window-content').innerHTML = app.render();
  win.querySelector('.status-text').textContent = id === 'computer' ? '6 objects' : `${app.title} — ready`;
  updateWindowTaskButton(win, app);
  if (push) pushWindowHistory(win, { type: 'app', id });
  syncNavigationControls(win);
  showClippy(id);
  if (id === 'terminal') initTerminal(win);
  history.replaceState(null, '', `#${id}`);
}

function showFileInWindow(win, key, push = true) {
  const node = virtualFs[key];
  if (!node || node.type !== 'file' || node.href) return;
  win.dataset.app = locationApps[key.substring(0, key.lastIndexOf('\\'))] || 'computer';
  win.dataset.filePath = key;
  win.querySelector('.address-value').value = key;
  win.querySelector('.window-content').innerHTML = explorerShell(key, 'Text document', `<article class="file-preview"><pre></pre></article>`, [{ label: 'Back to C:\\', app: 'computer' }]);
  win.querySelector('.file-preview pre').textContent = node.content;
  win.querySelector('.window-title').textContent = key.split('\\').pop();
  win.querySelector('.title-icon').src = icons.help;
  win.querySelector('.status-text').textContent = '1 object';
  updateWindowTaskButton(win, { title: key.split('\\').pop(), icon: icons.help });
  if (push) pushWindowHistory(win, { type: 'file', key });
  syncNavigationControls(win);
}

function pushWindowHistory(win, entry) {
  const current = win._navHistory?.[win._navIndex];
  if (current && JSON.stringify(current) === JSON.stringify(entry)) return;
  win._navHistory = (win._navHistory || []).slice(0, win._navIndex + 1);
  win._navHistory.push(entry);
  win._navIndex = win._navHistory.length - 1;
}

function moveWindowHistory(win, direction) {
  const next = win._navIndex + direction;
  if (!win._navHistory || next < 0 || next >= win._navHistory.length) return;
  win._navIndex = next;
  const entry = win._navHistory[next];
  if (entry.type === 'app') navigateWindowToApp(win, entry.id, false);
  else showFileInWindow(win, entry.key, false);
  syncNavigationControls(win);
}

function syncNavigationControls(win) {
  const historyLength = win._navHistory?.length || 0;
  win.querySelector('.nav-back').disabled = win._navIndex <= 0;
  win.querySelector('.nav-forward').disabled = win._navIndex < 0 || win._navIndex >= historyLength - 1;
  win.querySelector('.nav-up').disabled = !explorerAppIds.has(win.dataset.app) || (win.dataset.app === 'computer' && !win.dataset.filePath);
}

function updateWindowTaskButton(win, app) {
  const task = document.querySelector(`[data-task="${win.dataset.windowId}"]`);
  if (task) task.innerHTML = `${iconMarkup(app.icon)}<span>${app.title}</span>`;
}

const locationApps = {
  'C:\\': 'computer',
  'C:\\PROJECTS': 'projects',
  'C:\\ACADEMICS': 'academics',
  'C:\\WRITEUPS': 'writing',
  'C:\\SOCIALS': 'socials',
  'C:\\CV': 'cv',
  'C:\\RECYCLER': 'recycle'
};

function navigateToLocation(win, rawLocation) {
  const input = win.querySelector('.address-value');
  const status = win.querySelector('.status-text');
  const raw = rawLocation.trim();
  if (!raw) return;

  if (/^(https?:\/\/|mailto:)/i.test(raw)) {
    window.open(raw, '_blank', 'noopener');
    status.textContent = `Opening ${raw}`;
    return;
  }

  const alias = raw.toLowerCase().replace(/[\s_-]+/g, '');
  const appAliases = {
    c: 'computer', computer: 'computer', mycomputer: 'computer', localdiskc: 'computer',
    project: 'projects', projects: 'projects', academic: 'academics', academics: 'academics',
    writing: 'writing', writeup: 'writing', writeups: 'writing', social: 'socials', socials: 'socials',
    cv: 'cv', resume: 'cv', résumé: 'cv', recycle: 'recycle', recycler: 'recycle',
    cmd: 'terminal', terminal: 'terminal', commandprompt: 'terminal', github: 'browser'
  };
  if (appAliases[alias]) {
    const appId = appAliases[alias];
    navigateWindowToApp(win, appId);
    return;
  }

  const currentAddress = input.value;
  const currentParts = /^c:/i.test(currentAddress)
    ? normalizeWindowsPath(currentAddress, []) || []
    : [];
  const targetParts = normalizeWindowsPath(raw, currentParts);
  const key = targetParts ? pathKey(targetParts) : '';
  const node = virtualFs[key];

  if (!node) {
    input.setAttribute('aria-invalid', 'true');
    status.textContent = `Windows cannot find '${raw}'. Try C:\\PROJECTS or C:\\CV.`;
    input.select();
    return;
  }

  input.removeAttribute('aria-invalid');
  input.value = key;
  if (node.type === 'dir') {
    const appId = locationApps[key];
    if (appId) navigateWindowToApp(win, appId);
    return;
  }
  if (node.href) {
    window.open(node.href, '_blank', 'noopener');
    status.textContent = `Opening ${key.split('\\').pop()}`;
    return;
  }

  showFileInWindow(win, key);
}

function focusWindow(win) {
  if (!win || win.classList.contains('minimized')) return;
  document.querySelectorAll('.window, .task-button').forEach(node => node.classList.remove('active'));
  win.style.zIndex = String(++topZ);
  win.classList.add('active');
  document.querySelector(`[data-task="${win.dataset.windowId}"]`)?.classList.add('active');
  showClippy(win.dataset.app);
  if (win.dataset.app === 'terminal') requestAnimationFrame(() => win.querySelector('.terminal-input')?.focus({ preventScroll: true }));
}

function focusTopWindow() {
  const visible = [...openWindows.values()]
    .filter(win => !win.classList.contains('minimized'))
    .sort((a, b) => (Number(b.style.zIndex) || 0) - (Number(a.style.zIndex) || 0));
  if (visible[0]) focusWindow(visible[0]);
  else showClippy('welcome');
}

function closeWindow(id) {
  const win = openWindows.get(id);
  if (!win) return;
  const wasActive = win.classList.contains('active');
  win.remove();
  openWindows.delete(id);
  document.querySelector(`[data-task="${id}"]`)?.remove();
  if (wasActive || !openWindows.size) focusTopWindow();
}

function addTaskButton(id) {
  const app = APPS[id];
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'task-button active';
  button.dataset.task = id;
  button.innerHTML = `${iconMarkup(app.icon)}<span>${app.title}</span>`;
  button.addEventListener('click', () => {
    const win = openWindows.get(id);
    if (!win) return;
    if (win.classList.contains('minimized')) {
      win.classList.remove('minimized');
      focusWindow(win);
    } else if (win.classList.contains('active')) {
      win.classList.add('minimized');
      win.classList.remove('active');
      button.classList.remove('active');
      focusTopWindow();
    } else focusWindow(win);
  });
  document.querySelector('#task-buttons').append(button);
}

function normalizeWindowsPath(input, cwdParts) {
  let raw = (input || '').trim().replace(/^"|"$/g, '').replaceAll('/', '\\');
  let parts = [...cwdParts];
  if (/^[a-z]:/i.test(raw)) {
    if (!/^c:/i.test(raw)) return null;
    raw = raw.slice(2);
    parts = [];
  } else if (raw.startsWith('\\')) {
    parts = [];
  }
  raw.split('\\').forEach(part => {
    if (!part || part === '.') return;
    if (part === '..') parts.pop();
    else parts.push(part.toUpperCase());
  });
  return parts;
}

function pathKey(parts) {
  return parts.length ? `C:\\${parts.join('\\')}` : 'C:\\';
}

function renderDir(key, node) {
  const lines = [
    ' Volume in drive C is KELVIN_PORTFOLIO',
    ' Volume Serial Number is A11A-0001',
    '',
    ` Directory of ${key}`,
    ''
  ];
  node.children.forEach(name => {
    const childKey = key === 'C:\\' ? `${key}${name}` : `${key}\\${name}`;
    const child = virtualFs[childKey];
    lines.push(`10/27/2026  07:26 PM    ${child?.type === 'dir' ? '<DIR>         ' : '              '}${name}`);
  });
  const files = node.children.filter(name => {
    const childKey = key === 'C:\\' ? `${key}${name}` : `${key}\\${name}`;
    return virtualFs[childKey]?.type === 'file';
  }).length;
  const dirs = node.children.length - files;
  lines.push(`               ${files} File(s)          useful`, `               ${dirs} Dir(s)  999,874,555,289,600 bytes free`);
  return lines.join('\n');
}

function renderTree(key, prefix = '') {
  const node = virtualFs[key];
  if (!node || node.type !== 'dir') return '';
  return node.children.map((name, index) => {
    const last = index === node.children.length - 1;
    const childKey = key === 'C:\\' ? `${key}${name}` : `${key}\\${name}`;
    const child = virtualFs[childKey];
    let line = `${prefix}${last ? '└──' : '├──'} ${name}`;
    if (child?.type === 'dir') line += `\n${renderTree(childKey, prefix + (last ? '    ' : '│   '))}`;
    return line;
  }).join('\n');
}

function initTerminal(win) {
  let cwdParts = [];
  const history = [];
  let historyIndex = 0;
  const output = win.querySelector('.terminal-output');
  const input = win.querySelector('.terminal-input');
  const prompt = win.querySelector('.terminal-prompt');

  const updatePrompt = () => { prompt.textContent = `${pathKey(cwdParts)}>`; };
  output.textContent = 'Microsoft Windows XP [Version 5.1.2600]\n(C) Copyright 1985-2001 Microsoft Corp.\n\n1 PB Local Disk mounted at C:\\\nType HELP for available commands.\n\n';
  updatePrompt();

  win.querySelector('.terminal-wrap').addEventListener('pointerdown', event => {
    if (!event.target.closest('a,button')) requestAnimationFrame(() => input.focus({ preventScroll: true }));
  });

  win.querySelector('.terminal-form').addEventListener('submit', event => {
    event.preventDefault();
    const raw = input.value.trim();
    if (raw) {
      history.push(raw);
      historyIndex = history.length;
    }
    appendTerminal(output, `${pathKey(cwdParts)}>${raw}`, 'entered');
    const response = runCommand(raw);
    if (response?.text) appendTerminal(output, response.text, response.error ? 'error' : '');
    input.value = '';
    updatePrompt();
    output.scrollTop = output.scrollHeight;
  });

  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && history.length) {
      event.preventDefault();
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] || '';
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || '';
    }
  });

  function runCommand(raw) {
    const tokens = raw.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const command = (tokens.shift() || '').toLowerCase();
    const arg = tokens.join(' ').replace(/^"|"$/g, '');
    const cwdKey = pathKey(cwdParts);

    if (!command) return null;
    if (command === 'help' || command === '?') return { text: 'Commands:\n  DIR / LS           List the current folder\n  CD <folder>        Change folder\n  TREE               Show the virtual disk tree\n  TYPE / CAT <file>  Read a file\n  START <target>     Open a folder, project, or link\n  VOL                 Show the 1 PB volume details\n  CLS / CLEAR        Clear the screen\n  WHOAMI             Identify the user\n  VER                 Show system version\n\nExamples: CD PROJECTS · TYPE AURORA.TXT · START GITHUB · VOL' };
    if (command === 'cls' || command === 'clear') { output.textContent = ''; return null; }
    if (command === 'whoami') return { text: 'kelvin\\rutatina\nCybersecurity engineer · local AI infrastructure · automation' };
    if (command === 'ver') return { text: 'Kelvin Portfolio [Version 1.0.2026] — 1 PB volume' };
    if (command === 'vol') return { text: ' Volume in drive C is KELVIN_PORTFOLIO\n Volume Serial Number is A11A-0001\n\n Capacity: 1.00 PB (totally real)' };
    if (command === 'date' || command === 'time') return { text: new Date().toString() };
    if (command === 'pwd') return { text: cwdKey };
    if (command === 'echo') return { text: arg };
    if (command === 'dir' || command === 'ls') {
      const targetParts = arg ? normalizeWindowsPath(arg, cwdParts) : cwdParts;
      if (!targetParts) return { text: 'The system cannot find the drive specified.', error: true };
      const key = pathKey(targetParts);
      const node = virtualFs[key];
      if (!node) return { text: 'File Not Found', error: true };
      if (node.type === 'file') return { text: key.split('\\').pop() };
      return { text: renderDir(key, node) };
    }
    if (command === 'tree') return { text: `${cwdKey}\n${renderTree(cwdKey)}` };
    if (command === 'cd' || command === 'chdir') {
      const targetParts = normalizeWindowsPath(arg || 'C:\\', cwdParts);
      if (!targetParts) return { text: 'The system cannot find the drive specified.', error: true };
      const key = pathKey(targetParts);
      const node = virtualFs[key];
      if (!node || node.type !== 'dir') return { text: 'The system cannot find the path specified.', error: true };
      cwdParts = targetParts;
      return null;
    }
    if (command === 'type' || command === 'cat') {
      if (!arg) return { text: 'The syntax of the command is incorrect.', error: true };
      const targetParts = normalizeWindowsPath(arg, cwdParts);
      const key = targetParts ? pathKey(targetParts) : '';
      const node = virtualFs[key];
      if (!node) return { text: 'The system cannot find the file specified.', error: true };
      if (node.type === 'dir') return { text: 'Access is denied.', error: true };
      return { text: node.content };
    }
    if (command === 'start' || command === 'open') {
      if (!arg || arg === '.') { openApp('computer'); return { text: 'Opening My Computer...' }; }
      const alias = arg.toLowerCase().replace(/\s+/g, '');
      const appAliases = { projects: 'projects', project: 'projects', academics: 'academics', writing: 'writing', writeups: 'writing', socials: 'socials', cv: 'cv', cmd: 'terminal', terminal: 'terminal', computer: 'computer', explorer: 'computer', browser: 'browser', ie: 'browser' };
      const hrefAliases = { github: links.github, medium: links.medium, bitcoin: links.bitcoin, solana: links.solanaGuide, stkn: links.stkn, usb: links.usbStorage, nullcon: links.usbStorage, ctfguide: links.ctfguide, omnihealth: links.omnihealth, stereo: links.stereoMatrix, linkedin: links.linkedin, email: links.email, llamaterm: links.llamaTerm };
      if (appAliases[alias]) { openApp(appAliases[alias]); return { text: `Opening ${APPS[appAliases[alias]].title}...` }; }
      if (hrefAliases[alias]) { window.open(hrefAliases[alias], '_blank', 'noopener'); return { text: `Opening ${hrefAliases[alias]}...` }; }
      const targetParts = normalizeWindowsPath(arg, cwdParts);
      const node = targetParts ? virtualFs[pathKey(targetParts)] : null;
      if (node?.href) { window.open(node.href, '_blank', 'noopener'); return { text: `Opening ${node.href}...` }; }
      return { text: `Windows cannot find '${arg}'.`, error: true };
    }
    return { text: `'${command}' is not recognized as an internal or external command,\noperable program or batch file.`, error: true };
  }
}

function appendTerminal(output, text, className = '') {
  const line = document.createElement('div');
  if (className) line.className = className;
  line.textContent = text;
  output.append(line);
}

function setClippyAnimation(name) {
  const image = document.querySelector('#clippy-image');
  clearTimeout(clippyTimer);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    image.src = `${ASSET}/clippy/still.png`;
    return;
  }
  image.src = clippyAnimations[name] || clippyAnimations.idle;
  if (name === 'still') return;
  if (name !== 'idle') clippyTimer = setTimeout(() => { image.src = clippyAnimations.idle; }, 4800);
}

function showClippy(messageId) {
  const message = CLIPPY_MESSAGES[messageId] || CLIPPY_MESSAGES.welcome;
  const balloon = document.querySelector('#clippy-balloon');
  document.querySelector('#clippy-message').textContent = message.text;
  const linkBox = document.querySelector('#clippy-links');
  linkBox.replaceChildren();
  message.links.forEach(item => {
    const control = item.href ? document.createElement('a') : document.createElement('button');
    control.textContent = item.label;
    if (item.href) {
      control.href = item.href;
      if (!item.href.startsWith('mailto:') && !item.href.startsWith('downloads/')) {
        control.target = '_blank';
        control.rel = 'noreferrer';
      }
    } else {
      control.type = 'button';
      control.dataset.open = item.app;
    }
    linkBox.append(control);
  });
  balloon.classList.remove('hidden');
  document.querySelector('#clippy-character').setAttribute('aria-expanded', 'true');
  setClippyAnimation(message.animation);
}

function closeStart() {
  const menu = document.querySelector('#start-menu');
  menu.classList.remove('open');
  menu.setAttribute('aria-hidden', 'true');
  document.querySelector('#start-button').classList.remove('active');
  document.querySelector('#start-button').setAttribute('aria-expanded', 'false');
}

document.addEventListener('click', event => {
  const opener = event.target.closest('[data-open]');
  if (opener) {
    if (opener.matches('a')) event.preventDefault();
    const parentWindow = opener.closest('.window') || (opener.closest('#clippy') ? document.querySelector('.window.active:not(.minimized)') : null);
    const appId = opener.dataset.open;
    if (parentWindow) navigateWindowToApp(parentWindow, appId);
    else openApp(appId);
  }
  const location = event.target.closest('[data-location]');
  if (location) {
    const parentWindow = location.closest('.window');
    if (parentWindow) navigateToLocation(parentWindow, location.dataset.location);
  }
  const external = event.target.closest('[data-href]');
  if (external) window.open(external.dataset.href, '_blank', 'noopener');
  if (!event.target.closest('#start-menu, #start-button')) closeStart();
  if (!event.target.closest('.menu-root')) {
    document.querySelectorAll('.menu-root.open').forEach(menu => {
      menu.classList.remove('open');
      menu.querySelector('.menu-trigger')?.setAttribute('aria-expanded', 'false');
    });
  }
});

document.querySelector('#start-button').addEventListener('click', () => {
  const menu = document.querySelector('#start-menu');
  const open = menu.classList.toggle('open');
  menu.setAttribute('aria-hidden', String(!open));
  document.querySelector('#start-button').classList.toggle('active', open);
  document.querySelector('#start-button').setAttribute('aria-expanded', String(open));
});

document.querySelector('#logoff').addEventListener('click', () => location.reload());
document.querySelector('#clippy-close').addEventListener('click', () => {
  document.querySelector('#clippy-balloon').classList.add('hidden');
  document.querySelector('#clippy-character').setAttribute('aria-expanded', 'false');
  const activeApp = document.querySelector('.window.active')?.dataset.app;
  setClippyAnimation(['writing', 'cv'].includes(activeApp) ? 'still' : 'idle');
});
document.querySelector('#clippy-character').addEventListener('click', () => {
  const balloon = document.querySelector('#clippy-balloon');
  const hidden = balloon.classList.toggle('hidden');
  document.querySelector('#clippy-character').setAttribute('aria-expanded', String(!hidden));
  const activeApp = document.querySelector('.window.active')?.dataset.app;
  setClippyAnimation(['writing', 'cv'].includes(activeApp) ? 'still' : hidden ? 'idle' : 'wakeup');
});

document.addEventListener('keydown', event => {
  const activeWindow = document.querySelector('.window.active:not(.minimized)');
  const isTyping = event.target.matches('input, textarea, [contenteditable="true"]');
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a' && !isTyping) {
    event.preventDefault();
    document.getSelection()?.removeAllRanges();
    if (!activeWindow) document.querySelectorAll('.desktop-icon').forEach(icon => icon.classList.add('selected'));
    return;
  }
  if (activeWindow && !isTyping && ((event.altKey && event.key === 'ArrowLeft') || event.key === 'BrowserBack' || event.key === 'Backspace')) {
    event.preventDefault();
    moveWindowHistory(activeWindow, -1);
    return;
  }
  const terminal = [...openWindows.values()].find(win => win.dataset.app === 'terminal' && win.classList.contains('active') && !win.classList.contains('minimized'));
  if (!terminal || event.ctrlKey || event.metaKey || event.altKey || event.target.matches('input, textarea, [contenteditable="true"]')) return;
  if (event.key.length === 1 || ['Backspace', 'ArrowUp', 'ArrowDown'].includes(event.key)) terminal.querySelector('.terminal-input')?.focus({ preventScroll: true });
});

function tick() {
  document.querySelector('#clock').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function initDesktopSelection() {
  const desktop = document.querySelector('#desktop');
  let selection = null;
  desktop.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.target.closest('button, a, input, .window, #clippy, .taskbar, #start-menu')) return;
    event.preventDefault();
    document.querySelectorAll('.desktop-icon.selected').forEach(icon => icon.classList.remove('selected'));
    const rect = desktop.getBoundingClientRect();
    const box = document.createElement('div');
    box.className = 'desktop-selection';
    desktop.append(box);
    selection = { startX: event.clientX - rect.left, startY: event.clientY - rect.top, rect, box };
    desktop.setPointerCapture(event.pointerId);
  });
  desktop.addEventListener('pointermove', event => {
    if (!selection) return;
    const x = Math.max(0, Math.min(selection.rect.width, event.clientX - selection.rect.left));
    const y = Math.max(0, Math.min(selection.rect.height, event.clientY - selection.rect.top));
    const left = Math.min(selection.startX, x);
    const top = Math.min(selection.startY, y);
    const width = Math.abs(x - selection.startX);
    const height = Math.abs(y - selection.startY);
    Object.assign(selection.box.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
    const selectionRect = selection.box.getBoundingClientRect();
    document.querySelectorAll('.desktop-icon').forEach(icon => {
      const visibleParts = [icon.querySelector('img'), icon.querySelector('span')].filter(Boolean);
      const overlaps = visibleParts.some(part => {
        const partRect = part.getBoundingClientRect();
        const overlapWidth = Math.min(selectionRect.right, partRect.right) - Math.max(selectionRect.left, partRect.left);
        const overlapHeight = Math.min(selectionRect.bottom, partRect.bottom) - Math.max(selectionRect.top, partRect.top);
        return overlapWidth > 1 && overlapHeight > 1;
      });
      icon.classList.toggle('selected', overlaps);
    });
  });
  const finish = () => {
    selection?.box.remove();
    selection = null;
  };
  desktop.addEventListener('pointerup', finish);
  desktop.addEventListener('pointercancel', finish);
  desktop.addEventListener('lostpointercapture', finish);
  desktop.addEventListener('dragstart', event => {
    if (!event.target.closest('.window')) event.preventDefault();
  });
  desktop.addEventListener('selectstart', event => {
    if (!event.target.closest('.window, input, textarea, [contenteditable="true"]')) event.preventDefault();
  });
  window.addEventListener('blur', finish);
}

buildLaunchers();
initDesktopSelection();
tick();
setInterval(tick, 1000);
showClippy('welcome');

addEventListener('load', () => {
  setTimeout(() => {
    const boot = document.querySelector('#boot-screen');
    boot.style.opacity = '0';
    setTimeout(() => boot.remove(), 450);
  }, 1800);
  const initialApp = location.hash.slice(1);
  if (APPS[initialApp]) setTimeout(() => openApp(initialApp), 1900);
});

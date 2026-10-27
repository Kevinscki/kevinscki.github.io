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
  cv: 'downloads/Kelvin_Rutatina_CV.md'
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

const virtualFs = {
  'C:\\': { type: 'dir', children: ['PROJECTS', 'ACADEMICS', 'WRITEUPS', 'SOCIALS', 'CV', 'README.TXT'] },
  'C:\\PROJECTS': { type: 'dir', children: ['AURORA.TXT', 'LLAMATERM.URL', 'CURRIOR.URL', 'STKN.URL', 'OMNIHEALTH.URL', 'PROMPTTHEFLAG.TXT', 'AUTOMATION.TXT'] },
  'C:\\ACADEMICS': { type: 'dir', children: ['DEGREE.TXT', 'CERTIFICATIONS.TXT', 'LABS.TXT', 'CTFGUIDE.URL'] },
  'C:\\WRITEUPS': { type: 'dir', children: ['BITCOIN.URL', 'SOLANA_TOKEN_2022.URL', 'USBSTORAGE_NULLCON.URL', 'MEDIUM.URL'] },
  'C:\\RECYCLER': { type: 'dir', children: ['STEREO_MATRIX_VIRTUALIZER.URL'] },
  'C:\\SOCIALS': { type: 'dir', children: ['GITHUB.URL', 'MEDIUM.URL', 'LINKEDIN.URL', 'EMAIL.URL'] },
  'C:\\CV': { type: 'dir', children: ['KELVIN_RUTATINA_CV.MD'] },
  'C:\\README.TXT': { type: 'file', content: 'KELVIN RUTATINA\nLocal-first AI infrastructure, cybersecurity, and automation.\n\nTry: DIR, CD PROJECTS, TYPE AURORA.TXT, START GITHUB' },
  'C:\\PROJECTS\\AURORA.TXT': { type: 'file', content: 'AURORA\nCurrent direction: practical sovereign AI compute and local inference infrastructure built around real hardware, operator constraints, and ownership.' },
  'C:\\PROJECTS\\LLAMATERM.URL': { type: 'file', content: 'LlamaTerm — an AI-enhanced Linux terminal using local LLMs for command correction and operator workflows.', href: links.llamaTerm },
  'C:\\PROJECTS\\CURRIOR.URL': { type: 'file', content: 'Currior Anomaly Workflow — an automated anomaly-detection pipeline integrating local AI models and external data streams.', href: links.currior },
  'C:\\PROJECTS\\STKN.URL': { type: 'file', content: 'stkn — a Solana Token-2022 devnet token with hosted metadata, built as the working artifact behind the Token-2022 guide.', href: links.stkn },
  'C:\\PROJECTS\\OMNIHEALTH.URL': { type: 'file', content: 'Omnihealth — open-source healthcare software to which Kelvin contributed.', href: links.omnihealth },
  'C:\\PROJECTS\\PROMPTTHEFLAG.TXT': { type: 'file', content: 'PromptTheFlag — bypassed LLM guardrails across all seven challenge levels using adversarial prompt techniques.' },
  'C:\\PROJECTS\\AUTOMATION.TXT': { type: 'file', content: 'Security-minded operator workflows using n8n, Activepieces, Ollama, APIs, and MCP tooling.' },
  'C:\\ACADEMICS\\DEGREE.TXT': { type: 'file', content: 'First-Class Bachelor of Cybersecurity graduate, Institute of Accountancy Arusha. GPA: 4.55 / 5.0.' },
  'C:\\ACADEMICS\\CERTIFICATIONS.TXT': { type: 'file', content: 'eLearnSecurity Junior Penetration Tester (eJPT)\nAI 101: Fundamentals — TCM Security' },
  'C:\\ACADEMICS\\LABS.TXT': { type: 'file', content: 'Hands-on work across Hack The Box, TryHackMe, Nullcon, PicoCTF, CTFZone, and PromptTheFlag.' },
  'C:\\ACADEMICS\\CTFGUIDE.URL': { type: 'file', content: 'CTFGuide competitor and leaderboard handle: kevinscki.', href: links.ctfguide },
  'C:\\WRITEUPS\\BITCOIN.URL': { type: 'file', content: 'Bitcoin Explained to an 8-Year-Old Prodigy — a ground-up explanation moving from keys and nodes to mining economics, market structure, and risk.', href: links.bitcoin },
  'C:\\WRITEUPS\\SOLANA_TOKEN_2022.URL': { type: 'file', content: 'Making a Solana Token (Token-2022 Guide) — a practical devnet walkthrough covering token creation, minting, hosted metadata, and metadata initialization.', href: links.solanaGuide },
  'C:\\WRITEUPS\\USBSTORAGE_NULLCON.URL': { type: 'file', content: 'USBstorage Writeup — nullcon (2025), covering the first CTF challenge listed in the event\'s misc category.', href: links.usbStorage },
  'C:\\WRITEUPS\\MEDIUM.URL': { type: 'file', content: 'Kelvin Rutatina on Medium', href: links.medium },
  'C:\\RECYCLER\\STEREO_MATRIX_VIRTUALIZER.URL': { type: 'file', content: 'Stereo Matrix Virtualizer — an experiment built to explore virtual-surround processing from stereo audio.', href: links.stereoMatrix },
  'C:\\SOCIALS\\GITHUB.URL': { type: 'file', content: 'GitHub: github.com/Kevinscki', href: links.github },
  'C:\\SOCIALS\\MEDIUM.URL': { type: 'file', content: 'Medium: medium.com/@kelvinrutatina', href: links.medium },
  'C:\\SOCIALS\\LINKEDIN.URL': { type: 'file', content: 'LinkedIn: linkedin.com/in/kelvinrutatina', href: links.linkedin },
  'C:\\SOCIALS\\EMAIL.URL': { type: 'file', content: 'Email: kelvinrutatina@gmail.com', href: links.email },
  'C:\\CV\\KELVIN_RUTATINA_CV.MD': { type: 'file', content: 'First-Class Cybersecurity graduate working across AI security, local model infrastructure, offensive security, and automation.\n\nSTART CV to download the complete Markdown CV.', href: links.cv }
};

const CLIPPY_MESSAGES = {
  welcome: {
    text: "It looks like you're visiting Kelvin's computer. I can point you toward the useful evidence.",
    animation: 'wakeup',
    links: [{ label: 'Current work', app: 'projects' }, { label: 'Open C:\\', app: 'computer' }, { label: 'Try CMD', app: 'terminal' }]
  },
  computer: {
    text: 'Local Disk (C:) has a completely reasonable 1 PB capacity. Explorer and Command Prompt show the same files.',
    animation: 'point-right',
    links: [{ label: 'Browse projects', app: 'projects' }, { label: 'Open CMD', app: 'terminal' }]
  },
  projects: {
    text: 'Aurora is the current direction. LlamaTerm and the security work show the path that led there.',
    animation: 'think',
    links: [{ label: 'LlamaTerm on GitHub', href: links.llamaTerm }, { label: 'Read the CV', app: 'cv' }]
  },
  academics: {
    text: 'The degree is the foundation. The labs, Nullcon work, and CTFGuide record show the practice around it.',
    animation: 'read',
    links: [{ label: 'CTFGuide leaderboards', href: links.ctfguide }, { label: 'CV', app: 'cv' }]
  },
  writing: {
    text: 'Three useful trails: explaining Bitcoin, shipping a Token-2022 artifact, and documenting a Nullcon challenge.',
    animation: 'read',
    links: [{ label: 'Token-2022 guide', href: links.solanaGuide }, { label: 'Nullcon write-up', href: links.usbStorage }]
  },
  socials: {
    text: 'GitHub is the proof shelf. Medium is the long-form shelf. LinkedIn is mostly a directory.',
    animation: 'point-right',
    links: [{ label: 'GitHub', href: links.github }, { label: 'Medium', href: links.medium }]
  },
  cv: {
    text: 'The CV is here when a human or an applicant-tracking system insists on one.',
    animation: 'check',
    links: [{ label: 'Download CV', href: links.cv }, { label: 'See projects', app: 'projects' }]
  },
  browser: {
    text: 'Internet Explorer survived long enough to take you to GitHub. That seems fair.',
    animation: 'point-right',
    links: [{ label: 'Open GitHub', href: links.github }, { label: 'Socials', app: 'socials' }]
  },
  terminal: {
    text: 'This one speaks Windows. Try DIR, CD PROJECTS, TYPE AURORA.TXT, or START GITHUB.',
    animation: 'think',
    links: [{ label: 'Open C:\\ in Explorer', app: 'computer' }]
  },
  recycle: {
    text: 'Experiments can fail without becoming evidence that the person failed.',
    animation: 'idle',
    links: [{ label: 'Stereo Matrix Virtualizer', href: links.stereoMatrix }, { label: 'Return to projects', app: 'projects' }]
  }
};

const clippyAnimations = {
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
  const nav = taskLinks.map(item => `<button type="button" data-open="${item.app}">${item.label}</button>`).join('');
  return `<div class="explorer">
    <aside class="explorer-sidebar">
      <section class="side-card"><h3>System Tasks</h3><nav>${nav || '<button type="button" data-open="computer">View system information</button>'}</nav></section>
      <section class="side-card"><h3>Details</h3><p>${title}<br>Kelvin XP<br>Local Disk (C:)</p></section>
    </aside>
    <div class="explorer-main"><h2>${title}</h2><p class="lead">${lead}</p>${content}</div>
  </div>`;
}

function fileEntry({ app, href, icon = icons.folder, name, detail = '' }) {
  const attrs = app ? `data-open="${app}"` : `data-href="${href}"`;
  return `<button type="button" class="file-entry" ${attrs}>${iconMarkup(icon)}<span>${name}</span>${detail ? `<small>${detail}</small>` : ''}</button>`;
}

function renderComputer() {
  const folders = [
    { app: 'projects', name: 'PROJECTS', detail: 'File Folder' },
    { app: 'academics', name: 'ACADEMICS', detail: 'File Folder', icon: icons.help },
    { app: 'writing', name: 'WRITEUPS', detail: 'File Folder', icon: icons.globe },
    { app: 'socials', name: 'SOCIALS', detail: 'File Folder', icon: icons.people },
    { app: 'cv', name: 'CV', detail: 'File Folder' },
    { app: 'terminal', name: 'README.TXT', detail: 'Text Document', icon: icons.help }
  ].map(fileEntry).join('');
  return explorerShell('My Computer', 'Files Stored on This Computer', `
    <div class="drive-list">
      <article class="drive">${iconMarkup(icons.computer)}<div><strong>Local Disk (C:)</strong><div class="capacity"><i></i></div><small>61.2 TB used · 938.8 TB free · 1.00 PB capacity</small></div></article>
    </div>
    <h3>Files and folders</h3><div class="file-grid">${folders}</div>
  `, [{ label: 'Open Command Prompt', app: 'terminal' }, { label: 'View projects', app: 'projects' }]);
}

function renderProjects() {
  return explorerShell('C:\\PROJECTS', 'Current work first; older projects provide evidence rather than noise.', `
    <div class="cards">
      <article class="card featured"><h3>Aurora — current build</h3><p>Practical sovereign AI compute and local inference infrastructure built around ownership, real hardware constraints, and operator usability. Current work includes defining the compute build and sourcing path.</p><div class="tag-list"><span class="tag">local AI</span><span class="tag">compute</span><span class="tag">infrastructure</span><span class="tag">in progress</span></div></article>
      <article class="card"><h3>LlamaTerm</h3><p>An AI-enhanced Linux terminal using local LLMs for Bash correction, command optimization, and security workflows.</p>${externalLink(links.llamaTerm, 'Open repository')}</article>
      <article class="card"><h3>Currior Anomaly Workflow</h3><p>An automated anomaly-detection pipeline integrating local AI models with external data streams.</p>${externalLink(links.currior, 'Open repository')}</article>
      <article class="card"><h3>stkn — Solana Token-2022</h3><p>A devnet token with hosted metadata, built as the working artifact behind a practical Token-2022 guide.</p>${externalLink(links.stkn, 'Open repository')} · ${externalLink(links.solanaGuide, 'Read the guide')}</article>
      <article class="card"><h3>Omnihealth</h3><p>Open-source healthcare software to which I contributed.</p>${externalLink(links.omnihealth, 'Open repository')}</article>
      <article class="card"><h3>PromptTheFlag</h3><p>Completed all seven LLM guardrail and prompt-injection challenge levels using adversarial manipulation techniques.</p><div class="tag-list"><span class="tag">LLM security</span><span class="tag">7 / 7</span></div></article>
      <article class="card"><h3>Operator automation</h3><p>Security-minded workflows connecting n8n, Activepieces, Ollama, APIs, Telegram, and MCP tooling.</p><div class="tag-list"><span class="tag">automation</span><span class="tag">local-first</span></div></article>
    </div>
  `, [{ label: 'Open GitHub', app: 'browser' }, { label: 'Read write-ups', app: 'writing' }]);
}

function renderAcademics() {
  return explorerShell('C:\\ACADEMICS', 'Formal foundation and challenge-based practice.', `
    <div class="timeline">
      <article><h3>First-Class Bachelor of Cybersecurity</h3><strong>Institute of Accountancy Arusha</strong><p>GPA 4.55 / 5.0.</p></article>
      <article><h3>eLearnSecurity Junior Penetration Tester</h3><strong>INE Security</strong><p>Offensive-security methodology and practical assessment.</p></article>
      <article><h3>AI 101: Fundamentals</h3><strong>TCM Security</strong><p>AI fundamentals supporting later local-model and LLM-security work.</p></article>
      <article><h3>Labs and CTFs</h3><p>Hack The Box, TryHackMe, Nullcon, PicoCTF, CTFZone, and PromptTheFlag.</p></article>
      <article><h3>CTFGuide — kevinscki</h3><strong>Security practice</strong><p>Challenge activity under the handle <code>kevinscki</code>.</p>${externalLink(links.ctfguide, 'Open leaderboards')}</article>
    </div>
  `, [{ label: 'Read CV', app: 'cv' }, { label: 'View projects', app: 'projects' }]);
}

function renderWriting() {
  return explorerShell('C:\\WRITEUPS', 'Technical writing as evidence of understanding, not content marketing.', `
    <div class="cards">
      <article class="card featured"><h3>Bitcoin Explained to an 8-Year-Old Prodigy</h3><p>A ground-up explanation that moves from private keys, addresses, nodes, and mining to custody, incentives, liquidity, regulation, and risk.</p>${externalLink(links.bitcoin, 'Read on Medium')}</article>
      <article class="card"><h3>Making a Solana Token — Token-2022 Guide</h3><p>A practical devnet walkthrough: create the token and account, mint supply, host metadata, and initialize it on-chain.</p>${externalLink(links.solanaGuide, 'Read on Medium')} · ${externalLink(links.stkn, 'Open stkn')}</article>
      <article class="card"><h3>USBstorage Writeup — nullcon (2025)</h3><p>A write-up of the first challenge in nullcon's miscellaneous category.</p>${externalLink(links.usbStorage, 'Read on Medium')}</article>
      <article class="card"><h3>More from Kelvin</h3><p>Security, blockchain systems, local AI, and implementation notes.</p>${externalLink(links.medium, 'Open Medium profile')}</article>
    </div>
  `, [{ label: 'Open Medium', app: 'browser' }, { label: 'View projects', app: 'projects' }]);
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
  return explorerShell('C:\\CV', 'A compact version of the formal record. The complete Markdown file is downloadable.', `
    <div class="profile-grid">
      <section class="card"><h3>Kelvin Rutatina</h3><p>Cybersecurity Engineer · AI Security · Security Automation · Offensive Security</p><dl><dt>Location</dt><dd>Arusha, Tanzania</dd><dt>Email</dt><dd>kelvinrutatina@gmail.com</dd><dt>Education</dt><dd>First-Class, GPA 4.55 / 5.0</dd></dl></section>
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
    focusWindow(existing);
    return;
  }

  const win = document.querySelector('#window-template').content.firstElementChild.cloneNode(true);
  win.dataset.app = id;
  win.querySelector('.title-icon').src = app.icon;
  win.querySelector('.window-title').textContent = app.title;
  win.querySelector('.address-value').textContent = app.address;
  win.querySelector('.window-content').innerHTML = app.render();
  win.querySelector('.status-text').textContent = id === 'computer' ? '6 objects' : `${app.title} — ready`;

  const offset = (openWindows.size % 7) * 18;
  win.style.left = `calc(50% + ${offset}px)`;
  win.style.top = `calc(46% + ${offset}px)`;
  document.querySelector('#window-layer').append(win);
  openWindows.set(id, win);
  bindWindow(win);
  addTaskButton(id);
  document.querySelector('.desktop-intro').classList.add('window-open');
  if (id === 'terminal') initTerminal(win);
  focusWindow(win);
  history.replaceState(null, '', `#${id}`);
}

function bindWindow(win) {
  const id = win.dataset.app;
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
  win.querySelector('.address-go').addEventListener('click', () => {
    if (id === 'browser') window.open(links.github, '_blank', 'noopener');
    else showClippy(id);
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

function focusWindow(win) {
  if (!win || win.classList.contains('minimized')) return;
  document.querySelectorAll('.window, .task-button').forEach(node => node.classList.remove('active'));
  win.style.zIndex = String(++topZ);
  win.classList.add('active');
  document.querySelector(`[data-task="${win.dataset.app}"]`)?.classList.add('active');
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
  if (!openWindows.size) document.querySelector('.desktop-intro').classList.remove('window-open');
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
    ' Volume in drive C is KELVIN',
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
    if (command === 'help' || command === '?') return { text: 'Commands:\n  DIR / LS           List the current folder\n  CD <folder>        Change folder\n  TREE               Show the virtual disk tree\n  TYPE / CAT <file>  Read a file\n  START <target>     Open a folder, project, or link\n  CLS / CLEAR        Clear the screen\n  WHOAMI             Identify the user\n  VER                 Show system version\n\nExamples: CD PROJECTS · TYPE AURORA.TXT · START GITHUB' };
    if (command === 'cls' || command === 'clear') { output.textContent = ''; return null; }
    if (command === 'whoami') return { text: 'kelvin\\rutatina\nCybersecurity engineer · local AI infrastructure · automation' };
    if (command === 'ver') return { text: 'Kelvin XP [Version 1.0.2026] — 1 PB Local Disk' };
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
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    image.src = `${ASSET}/clippy/still.png`;
    return;
  }
  image.src = clippyAnimations[name] || clippyAnimations.idle;
  clearTimeout(clippyTimer);
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
  if (opener) openApp(opener.dataset.open);
  const external = event.target.closest('[data-href]');
  if (external) window.open(external.dataset.href, '_blank', 'noopener');
  if (!event.target.closest('#start-menu, #start-button')) closeStart();
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
  setClippyAnimation('idle');
});
document.querySelector('#clippy-character').addEventListener('click', () => {
  const balloon = document.querySelector('#clippy-balloon');
  const hidden = balloon.classList.toggle('hidden');
  document.querySelector('#clippy-character').setAttribute('aria-expanded', String(!hidden));
  setClippyAnimation(hidden ? 'idle' : 'wakeup');
});

document.addEventListener('keydown', event => {
  const terminal = [...openWindows.values()].find(win => win.dataset.app === 'terminal' && win.classList.contains('active') && !win.classList.contains('minimized'));
  if (!terminal || event.ctrlKey || event.metaKey || event.altKey || event.target.matches('input, textarea, [contenteditable="true"]')) return;
  if (event.key.length === 1 || ['Backspace', 'ArrowUp', 'ArrowDown'].includes(event.key)) terminal.querySelector('.terminal-input')?.focus({ preventScroll: true });
});

function tick() {
  document.querySelector('#clock').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

buildLaunchers();
tick();
setInterval(tick, 1000);
showClippy('welcome');

addEventListener('load', () => {
  setTimeout(() => {
    const boot = document.querySelector('#boot-screen');
    boot.style.opacity = '0';
    setTimeout(() => boot.remove(), 450);
  }, 850);
  const initialApp = location.hash.slice(1);
  if (APPS[initialApp]) setTimeout(() => openApp(initialApp), 950);
});

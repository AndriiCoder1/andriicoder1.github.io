'use strict';
const projects = {
 legal: {
  title: 'SwissLegalAssist', category: '01 / LEGALTECH + APPLIED AI',
  intro: 'A retrieval-augmented research assistant for Swiss federal and cantonal law. Built to turn a question into relevant legal documents and source-linked answers.',
  status: 'Portfolio project · Live demo suspended · 40,000+ legal documents',
  challenge: 'Swiss legal information is distributed across federal and cantonal sources. The engineering challenge was to ingest, structure and retrieve that information, then make generated answers traceable to the original documents.',
  solution: ['Custom ingestion from Fedlex, OpenCaseLaw and cantonal APIs.', 'Local bge-m3 embeddings and PostgreSQL vector retrieval.', 'Groq-based answer generation with references to original sources.', 'JWT and Google OAuth, query history and a multilingual interface.'],
  flow: ['Official sources','Parse & chunk','pgvector','LLM + sources'],
  stack: ['Python','Django / DRF','PostgreSQL / pgvector','Groq','Hugging Face','SPARQL'],
  original: 'https://andriicoder1.github.io/project-swiss_legal.html',
  repo: 'https://github.com/AndriiCoder1/swiss-legal-assist'
 },
 kolo: {
  title: 'Kolo', category: '02 / CIVICTECH + COMMUNITY PLATFORM',
  intro: 'A cooperative platform designed around the professional and social integration of migrants in Switzerland — combining membership, democratic participation and AI-assisted media monitoring.',
  status: 'Portfolio project · Live demo suspended · Stripe integration in sandbox mode',
  challenge: 'Bring membership permissions, community discussions, cooperative voting and Swiss media analysis into a single multilingual application, with clear access boundaries and privacy-conscious data flows.',
  solution: ['Three membership tiers with role-based permissions and sandbox payment webhooks.', 'Voting, surveys, forums and threaded comments.', 'News aggregation from 7 Swiss sources and 8,000+ articles, with Ollama analysis.', 'Six interface languages, Resend notifications and audit logging.'],
  flow: ['Swiss RSS feeds','Django / DRF','Local Ollama','Member dashboard'],
  stack: ['Django / DRF','PostgreSQL','Stripe sandbox','Ollama','Resend','Render'],
  original: 'https://andriicoder1.github.io/project-kolo.html', repo: 'https://github.com/AndriiCoder1/kolo'
 },
 everrest: {
  title: 'EverRest', category: '03 / SAAS + PRIVACY-FIRST ENGINEERING',
  intro: 'A digital memorial platform for funeral homes, families and guests. Unique QR codes connect physical memorials to online pages, with local AI moderation for guest tributes.',
  status: 'Portfolio project · B2B / B2C architecture · Local AI inference',
  challenge: 'Create different experiences for partners, families and guests while keeping sensitive content under clear permissions. Slow local AI moderation also needed to be separated from ordinary web requests.',
  solution: ['Partner administration, token-protected family access and public memorial pages.', 'Local Ollama moderation without third-party AI API data transfers.', 'Celery and Redis background processing for heavier AI tasks.', 'Docker Compose services, audit logging and four interface languages.'],
  flow: ['Guest tribute','Django','Celery / Redis','Local Ollama'],
  stack: ['Django','PostgreSQL','Redis','Celery','Ollama','Docker / Nginx'],
  original: 'https://andriicoder1.github.io/project-everrest.html', repo: 'https://github.com/AndriiCoder1/copy_everest'
 },
 chathelp: {
  title: 'ChatHelp', category: '04 / VOICE + CONVERSATIONAL AI',
  intro: 'A personal AI assistant for language learning and everyday questions, connecting voice input, a language model, web search and spoken responses.',
  status: 'Portfolio / open-source project · Node.js + Python architecture',
  challenge: 'Connect several separate systems into a coherent conversation: browser audio capture, speech recognition, model inference, optional internet search and text-to-speech output.',
  solution: ['Browser voice capture and Whisper-based transcription.', 'Node.js orchestration with Python-based AI and audio processing.', 'LLaMA inference, SerpAPI search and multilingual spoken responses.', 'Conversation context, response caching and silence detection.'],
  flow: ['Browser audio','Whisper','LLaMA / search','Spoken response'],
  stack: ['Node.js / Express','Python','Socket.IO','Whisper','LLaMA','SerpAPI'],
  original: 'https://andriicoder1.github.io/project-chathelp.html', repo: 'https://github.com/AndriiCoder1/chathelp'
 },
 signlang: {
  title: 'Sign Language Video Chat', category: '05 / ACCESSIBILITY + REAL-TIME',
  intro: 'A full-stack communication project exploring sign-to-text recognition and text-to-sign translation with a 3D avatar, built for more accessible conversations.',
  status: 'Portfolio / open-source project · React + Node.js · Browser-based hand tracking',
  challenge: 'Bridge camera-based gesture recognition, text communication and 3D avatar animation inside a real-time browser experience.',
  solution: ['MediaPipe / TensorFlow.js for hand landmarks and gesture recognition.', 'Three.js avatar animation for text-to-sign output.', 'WebRTC camera access with Node.js and Socket.IO communication.', 'A responsive React interface connecting the recognition and chat workflows.'],
  flow: ['Camera input','Hand landmarks','Recognition','Text / 3D avatar'],
  stack: ['React','Three.js','MediaPipe','TensorFlow.js','WebRTC','Socket.IO'],
  original: 'https://andriicoder1.github.io/project-signlang.html', repo: 'https://github.com/AndriiCoder1/video-chat'
 }
};
function externalIcon(){const ns='http://www.w3.org/2000/svg';const svg=document.createElementNS(ns,'svg');svg.setAttribute('class','icon-ne');svg.setAttribute('viewBox','0 0 20 20');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');const path=document.createElementNS(ns,'path');path.setAttribute('d','M4 16 16 4M4 4h12v12');svg.append(path);return svg;}
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

let toastTimer;
function toast(message) {
 const el = $('.toast'); el.textContent = message; el.classList.add('visible');
 clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 3000);
}
// Native anchor links keep the page useful even without JavaScript.
const menuToggle = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function closeMenu() {
 mobileNav.hidden = true; menuToggle.setAttribute('aria-expanded','false'); menuToggle.setAttribute('aria-label','Open navigation');
}
menuToggle.addEventListener('click', () => {
 const open = menuToggle.getAttribute('aria-expanded') === 'true';
 mobileNav.hidden = open; menuToggle.setAttribute('aria-expanded', String(!open));
 menuToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
});
$$('a', mobileNav).forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 700) closeMenu(); });
$$('.filter').forEach(filter => filter.addEventListener('click', () => {
 const category = filter.dataset.filter;
 $$('.filter').forEach(button => { const active = button === filter; button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active)); });
 let count = 0;
 $$('.project-card').forEach(card => {
  const show = category === 'all' || card.dataset.category.split(' ').includes(category);
  card.hidden = !show; if (show) count++;
 });
 $('.filter-count').textContent = count + (count === 1 ? ' project' : ' projects');
}));
// Render only verified project facts from the source portfolio. No remote API calls.
const caseDialog = $('#case-dialog');
let caseTrigger;
function openCase(key, trigger) {
 const project = projects[key]; if (!project) return;
 caseTrigger = trigger;
 $('#case-category').textContent = project.category;
 const content = $('#case-content');
 content.replaceChildren();
 const title = document.createElement('h2'); title.id = 'case-title'; title.textContent = project.title; content.append(title);
 const intro = document.createElement('p'); intro.className='case-intro'; intro.textContent=project.intro; content.append(intro);
 const status=document.createElement('p'); status.className='case-status';status.textContent=project.status;content.append(status);
 const stack=document.createElement('div');stack.className='tags';
 project.stack.forEach(text => { const tag=document.createElement('span');tag.textContent=text;stack.append(tag); }); content.append(stack);
 const columns=document.createElement('div');columns.className='case-columns';
 const challenge=document.createElement('div'); const h3=document.createElement('h3');h3.textContent='The challenge';const p=document.createElement('p');p.textContent=project.challenge;challenge.append(h3,p);
 const solution=document.createElement('div');const s3=document.createElement('h3');s3.textContent='The engineering';const ul=document.createElement('ul');project.solution.forEach(text => {const li=document.createElement('li');li.textContent=text;ul.append(li);});solution.append(s3,ul);columns.append(challenge,solution);content.append(columns);
 const flow=document.createElement('div');flow.className='case-flow';const label=document.createElement('p');label.className='eyebrow';label.textContent='SIMPLIFIED SYSTEM FLOW';const nodes=document.createElement('div');nodes.className='flow-nodes';
 project.flow.forEach((text,index) => { if(index){const arrow=document.createElement('i');arrow.textContent='→';arrow.setAttribute('aria-hidden','true');nodes.append(arrow);}const span=document.createElement('span');span.textContent=text;nodes.append(span); });flow.append(label,nodes);content.append(flow);
 const actions=document.createElement('div');actions.className='case-ctas';
 const source=document.createElement('a');source.className='button primary';source.href=project.original;source.target='_blank';source.rel='noopener noreferrer';source.textContent='Full project write-up';const arrow=externalIcon();source.append(arrow);
 const repo=document.createElement('a');repo.className='text-link';repo.href=project.repo;repo.target='_blank';repo.rel='noopener noreferrer';repo.textContent='Source on GitHub ';repo.append(externalIcon());actions.append(source,repo);content.append(actions);
 const disclaimer=document.createElement('p');disclaimer.className='case-disclaimer';disclaimer.textContent=project.disclaimer;content.append(disclaimer);
 caseDialog.showModal();caseDialog.scrollTop=0;document.body.classList.add('locked');
}
$$('[data-project]').forEach(card=>card.addEventListener('click',()=>openCase(card.dataset.project,card)));
$('[data-close-case]').addEventListener('click',()=>caseDialog.close());
caseDialog.addEventListener('click',event=>{if(event.target===caseDialog){const rect=caseDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)caseDialog.close();}});
caseDialog.addEventListener('close',()=>{document.body.classList.remove('locked');caseTrigger?.focus({preventScroll:true});});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
$$('[data-copy-email]').forEach(button=>button.addEventListener('click',async()=>{
 const address='denisov20051985@gmail.com';
 try{
  if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(address);}
  else{const field=document.createElement('textarea');field.value=address;field.style.cssText='position:fixed;left:-9999px';document.body.append(field);field.select();const copied=document.execCommand('copy');field.remove();if(!copied)throw new Error('Clipboard unavailable');}
  const text=$('span:last-child',button);text.textContent='Copied ✓';toast('Email copied to clipboard');setTimeout(()=>{text.textContent='Copy email';},2400);
 }catch{toast('Copy manually: '+address);}
}));
let ticking=false;
function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;$('.scroll-progress').style.width=(max>0?window.scrollY/max*100:0)+'%';ticking=false;}
window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateProgress);}},{passive:true});updateProgress();
// Single open expertise row keeps the scanning experience compact.
$$('.expertise-list details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open){$$('.expertise-list details').forEach(other=>{if(other!==detail)other.open=false;});}}));

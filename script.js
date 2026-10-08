const A='assets/';
const img=(n)=>A+n;

// Header / mobile navigation
const header=document.querySelector('.site-header');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>30),{passive:true});
const menuBtn=document.querySelector('.menu-btn'), mobileMenu=document.querySelector('.mobile-menu');
menuBtn?.addEventListener('click',()=>{mobileMenu?.classList.toggle('open'); menuBtn.setAttribute('aria-expanded',mobileMenu?.classList.contains('open')?'true':'false')});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));

// Smooth page transitions
for(const a of document.querySelectorAll('a[href]')){
  const url=new URL(a.href,location.href);
  if(url.origin===location.origin && !a.target && !a.href.includes('#')) a.addEventListener('click',e=>{e.preventDefault();document.body.classList.add('page-leave');setTimeout(()=>location.href=a.href,260)});
}

// Scroll reveals
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// WhatsApp helpers
const wa='https://wa.me/27633141801?text='+encodeURIComponent('Hello Armani Interiors, I would like to enquire about an interior design project.');
document.querySelectorAll('[data-whatsapp]').forEach(a=>a.href=wa);
document.querySelectorAll('[data-phone]').forEach(a=>a.href='tel:+27633141801');

// Portfolio filtering
const filters=document.querySelectorAll('.filter[data-filter]');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const f=btn.dataset.filter;
  document.querySelectorAll('.portfolio-card').forEach(card=>card.classList.toggle('hidden',f!=='all' && !card.dataset.category.split(' ').includes(f)));
}));

// Mood / sample boards — one photographed material study per board.
// Palettes are visual swatches only; descriptions are written to match the image itself.
const boards=[
 {title:'Linen, Oak & Charcoal',desc:'A tactile composition of pale linen, light oak, soft taupe, white stone and a deep charcoal timber accent.',image:'https://kaboompics.com/download/433e77169932c73985229122a36abc7a/medium',colors:['#EDEEE9','#ADAAA1','#8C5D3F','#4E472D','#171518']},
 {title:'Walnut & Soft Stone',desc:'Warm timber, creamy stone and quiet textile textures create a grounded contemporary material study.',image:'https://kaboompics.com/download/d7e00292aa86573d09e338e0e422348f/medium',colors:['#F7F4ED','#BAAEA2','#695743','#7C7D75','#332518']},
 {title:'Taupe Textile & Stone',desc:'Close-up fabric, pale stone and warm wood grain build a restrained scheme with a darker brown undertone.',image:'https://kaboompics.com/download/ad8ad1131b147b8994d2d7e494743e3d/medium',colors:['#CDC7B9','#B79675','#7E786C','#705247','#403926']},
 {title:'Cocoa Bouclé & Oak',desc:'Bouclé textile, natural wood and pale stone combine in a soft, warm-neutral direction with subtle tonal depth.',image:'https://kaboompics.com/download/1d67c590b3518fea3758df2e5502d7ef/medium',colors:['#EED7B8','#AB9D94','#A07650','#784822','#402D26']},
 {title:'Wood & Ink',desc:'Natural timber is paired with a near-black textile/feather accent and warm neutral samples for a darker editorial character.',image:'https://kaboompics.com/download/94f6970cde56ae2cbbfa27e8013be739/medium',colors:['#DCC8B0','#B48E67','#6D5C54','#451D11','#171518']},
 {title:'Stone, Cocoa & Charcoal',desc:'A neutral stone-and-textile arrangement moves from soft beige into charcoal and deep cocoa, keeping the composition sophisticated.',image:'https://kaboompics.com/download/4823a4b41c2d4fbab8df5963fea13a18/medium',colors:['#DBC7AF','#888177','#5D4E47','#96603E','#161417']},
 {title:'Soft Greige Textures',desc:'Rolled textiles, a pale stone edge and light timber create a quiet greige study with a restrained charcoal accent.',image:'https://kaboompics.com/download/fb0527357a45a67d2424adc8f13144a0/medium',colors:['#F4F2EE','#D8D0C8','#B8ADB0','#8C7D76','#171719']},
 {title:'Black, Taupe & Mineral',desc:'Black textile, taupe leather-like texture, pale rolled fabrics and cool grey stone form a crisp monochrome-neutral composition.',image:'https://kaboompics.com/download/d03db959cbf46d9c39880cb70f3c7e2f/medium',colors:['#F4F2EE','#D8D1CA','#9B8C8C','#7E8588','#171518']},
 {title:'Stone, Wood & Marble',desc:'Stone, wood and marble samples are arranged in a neutral architectural composition with black and warm brown contrast.',image:'https://kaboompics.com/download/0c3fa5037fed72f78149581ba4722d2c/medium',colors:['#000000','#381C0E','#CED6D9','#855843','#514A40','#B9A686']},
 {title:'Travertine & Dark Timber',desc:'Layered marble, travertine and dark wood samples create a mineral palette with strong contrast and natural warmth.',image:'https://kaboompics.com/download/bbc1b130bdbd07da7c0e4f9788672073/medium',colors:['#F4F2EE','#D8D1CA','#A79B98','#8B7B70','#171719']},
 {title:'Warm Mineral Stone',desc:'Travertine, pale stone, walnut-toned timber and cream marble create a softly layered architectural finish direction.',image:'https://kaboompics.com/download/d3c9d47d3249b5c245b6e4aa963e4b66/medium',colors:['#E8DED0','#C8B7A0','#92775D','#4A4038','#24201D']},
 {title:'Pale Timber & Charcoal',desc:'Pale timber, charcoal textile, taupe leather-like texture and cool grey stone create a restrained contemporary material study.',image:'https://kaboompics.com/download/26cd996693effe0f69299259a6f3797c/medium',colors:['#F5F3EF','#D6CEC5','#A99C9B','#8B735F','#171719']},
 {title:'Ribbed Marble & Travertine',desc:'Ribbed marble, travertine and textured stone samples create a warm mineral study with strong tactile variation.',image:'https://kaboompics.com/download/02ac1535ff18d50481614c1456e9d7d2/medium',colors:['#7F6C5B','#0E0000','#402810','#B38F5F','#D0C7B6','#2C3226']},
 {title:'Soft Black & Stone',desc:'A near-black textile, cool grey stone, ivory fabric and taupe leather-like texture form a restrained contemporary study.',image:'https://kaboompics.com/download/a997314ea0289ce46ad0ff8365ecc4ae/medium',colors:['#F1EFEB','#D0CBC5','#A79B98','#6E6A67','#171719']},
 {title:'Stone & Timber Selection',desc:'Stone blocks and warm timber are being physically arranged together, showing the tactile selection process behind a material scheme.',image:'https://kaboompics.com/download/099375c0afb4838060274da66004d5e1/medium',colors:['#1D0100','#59392A','#B4AD91','#7B6B54','#BE8B76','#EAD9D2']}
];
function renderPalette(colors,cls='palette-swatches'){return `<div class="${cls}" aria-label="Colour palette">${colors.map(c=>`<span class="palette-swatch" style="background:${c}" title="${c}" aria-label="${c}"></span>`).join('')}</div>`}
function renderBoards(){
 const grid=document.querySelector('#boardsGrid');if(!grid)return;
 grid.innerHTML=boards.map((b,i)=>`<article class="board-card photographic-board reveal delay-${(i%3)+1}" tabindex="0" data-board="${i}">
   <div class="board-single-image"><img class="board-photo" src="${b.image}" alt="${b.title}: interior design material study" loading="lazy"><span class="board-open">View board</span></div>
   <div class="board-meta-single"><h3>${b.title}</h3><p>${b.desc}</p>${renderPalette(b.colors)}</div>
 </article>`).join('');
 grid.querySelectorAll('.board-card').forEach(card=>{card.addEventListener('click',()=>openBoard(+card.dataset.board));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openBoard(+card.dataset.board)}})});
 grid.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
function openBoard(i){
 const b=boards[i]; const modal=document.querySelector('#boardModal');if(!modal)return;
 modal.querySelector('.modal-title').textContent=b.title;
 modal.querySelector('.modal-desc').textContent=b.desc;
 modal.querySelector('.modal-visual').innerHTML=`<div class="modal-photo-wrap"><img src="${b.image}" alt="${b.title} material study"></div>`;
 modal.querySelector('.modal-palette').innerHTML=renderPalette(b.colors,'modal-palette-swatches');
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeBoard(){const m=document.querySelector('#boardModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('#boardModal')?.addEventListener('click',e=>{if(e.target.id==='boardModal')closeBoard()});document.querySelector('.modal-close')?.addEventListener('click',closeBoard);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBoard()});renderBoards();

// Contact form: no fake backend. Opens a prefilled WhatsApp message as an explicit client-side handoff.
const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Armani Interiors,\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\nMessage: ${d.get('message')}`;window.open('https://wa.me/27633141801?text='+encodeURIComponent(msg),'_blank','noopener');document.querySelector('.form-status').textContent='Your enquiry has been prepared for WhatsApp. Please review it before sending.';});

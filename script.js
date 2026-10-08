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
 {title:'Warm Marble & Soft Neutrals',desc:'A tactile composition of warm stone, ribbed detailing and soft upholstered tones, creating a calm but layered residential direction.',image:'assets/moodboards/board-01.jpg',colors:['#422617','#8B8276','#71675E','#7C5C3F','#A2A2A0']},
 {title:'Walnut, Stone & Charcoal',desc:'Dark timber, veined stone and deep ribbed surfaces are layered into a refined architectural palette with strong material contrast.',image:'assets/moodboards/board-02.jpg',colors:['#755440','#261914','#978470','#291912','#3E3E3B']},
 {title:'Charcoal Stone & Bronze',desc:'A dramatic combination of dark ribbed surfaces, mineral stone and warm metallic lighting details gives the scheme a sophisticated depth.',image:'assets/moodboards/board-03.jpg',colors:['#291912','#917257','#261914','#422617','#34322E']},
 {title:'Natural Stone & Timber',desc:'Organic stone movement, warm timber and upholstered textures create a grounded interior direction with a softer residential character.',image:'assets/moodboards/board-04.jpg',colors:['#AD855F','#7C5C3F','#7E715F','#5D432F','#422617']},
 {title:'Soft Greige & Ribbed Detail',desc:'Quiet upholstered neutrals are balanced by ribbed wall texture and warm stone accents for a restrained contemporary interior.',image:'assets/moodboards/board-05.jpg',colors:['#71675E','#A2A2A0','#8B8276','#422617','#7C5C3F']},
 {title:'Dark Timber Gallery',desc:'Deep timber tones, black architectural detailing and warm stone create a richer, more intimate material story.',image:'assets/moodboards/board-06.jpg',colors:['#5D432F','#261914','#291912','#978470','#917257']},
 {title:'Veined Marble & Warm Timber',desc:'Strong marble movement is softened by timber and warm neutral surfaces, giving the composition a polished architectural character.',image:'assets/moodboards/board-07.jpg',colors:['#917257','#422617','#AD855F','#7C5C3F','#755440']},
 {title:'Monochrome Ribbed Layers',desc:'Ribbed dark surfaces, soft grey upholstery and controlled lighting create a clean monochrome direction with tactile depth.',image:'assets/moodboards/board-08.jpg',colors:['#3E3E3B','#291912','#261914','#8B8276','#71675E']},
 {title:'Champagne Stone & Timber',desc:'Warm timber, softly veined stone and muted upholstery are paired with subtle metallic lighting for an elevated residential feel.',image:'assets/moodboards/board-09.jpg',colors:['#978470','#7C5C3F','#422617','#9A8371','#7E715F']},
 {title:'Earth & Architectural Contrast',desc:'Natural stone and timber meet darker architectural surfaces, creating a balanced composition with warmth and visual weight.',image:'assets/moodboards/board-10.jpg',colors:['#AD855F','#5D432F','#8B8276','#34322E','#422617']},
 {title:'Moody Mineral Layers',desc:'Dark mineral surfaces, warm stone and controlled timber tones form a dramatic palette suited to statement interiors and feature walls.',image:'assets/moodboards/board-11.jpg',colors:['#917257','#34322E','#291912','#AD855F','#261914']},
 {title:'Greige Architectural Calm',desc:'Soft upholstered neutrals, pale walls and warm stone are layered with subtle architectural texture for a quiet contemporary scheme.',image:'assets/moodboards/board-12.jpg',colors:['#8B8276','#71675E','#A2A2A0','#AD855F','#7C5C3F']},
 {title:'Black, Bronze & Stone',desc:'Deep ribbed surfaces and dark stone are lifted by warm timber and glowing metallic details for a more dramatic luxury direction.',image:'assets/moodboards/board-13.jpg',colors:['#261914','#917257','#978470','#9A8371','#291912']},
 {title:'Layered Oak & Stone',desc:'Warm timber grain, pale stone and soft fabric textures combine into a natural material story with understated sophistication.',image:'assets/moodboards/board-14.jpg',colors:['#755440','#422617','#978470','#71675E','#AD855F']},
 {title:'Architectural Neutral Study',desc:'Pale wall tones, dark ribbed detailing, stone and soft upholstery establish a balanced neutral direction with strong texture.',image:'assets/moodboards/board-15.jpg',colors:['#A2A2A0','#261914','#422617','#8B8276','#7C5C3F']}
];

function renderPalette(colors,cls='palette-swatches'){return `<div class="${cls}" aria-label="Colour palette">${colors.map(c=>`<span class="palette-swatch" style="background:${c}" title="${c}" aria-label="${c}"></span>`).join('')}</div>`}
function renderBoards(){
 const grid=document.querySelector('#boardsGrid');if(!grid)return;
 grid.innerHTML=boards.map((b,i)=>`<article class="board-card photographic-board reveal delay-${(i%3)+1}" tabindex="0" data-board="${i}">
   <div class="board-single-image"><img class="board-photo" src="${b.image}" data-fallback="${b.fallback}" alt="${b.title}: interior design material study" loading="lazy" onerror="this.onerror=null;this.src=this.dataset.fallback"><span class="board-open">View board</span></div>
   <div class="board-meta-single"><h3>${b.title}</h3><p>${b.desc}</p>${renderPalette(b.colors)}</div>
 </article>`).join('');
 grid.querySelectorAll('.board-card').forEach(card=>{card.addEventListener('click',()=>openBoard(+card.dataset.board));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openBoard(+card.dataset.board)}})});
 grid.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
function openBoard(i){
 const b=boards[i]; const modal=document.querySelector('#boardModal');if(!modal)return;
 modal.querySelector('.modal-title').textContent=b.title;
 modal.querySelector('.modal-desc').textContent=b.desc;
 modal.querySelector('.modal-visual').innerHTML=`<div class="modal-photo-wrap"><img src="${b.image}" data-fallback="${b.fallback}" alt="${b.title} material study" onerror="this.onerror=null;this.src=this.dataset.fallback"></div>`;
 modal.querySelector('.modal-palette').innerHTML=renderPalette(b.colors,'modal-palette-swatches');
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeBoard(){const m=document.querySelector('#boardModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('#boardModal')?.addEventListener('click',e=>{if(e.target.id==='boardModal')closeBoard()});document.querySelector('.modal-close')?.addEventListener('click',closeBoard);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBoard()});renderBoards();

// Contact form: no fake backend. Opens a prefilled WhatsApp message as an explicit client-side handoff.
const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Armani Interiors,\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\nMessage: ${d.get('message')}`;window.open('https://wa.me/27633141801?text='+encodeURIComponent(msg),'_blank','noopener');document.querySelector('.form-status').textContent='Your enquiry has been prepared for WhatsApp. Please review it before sending.';});

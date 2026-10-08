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
 {title:'Verdant Ceramic & Soft Stone',desc:'Green ceramic surfaces, pale mineral stone and tactile woven texture are arranged as a calm, nature-led material direction.',image:'assets/moodboards/board-01.jpg',colors:['#56704b','#9aa18b','#d9d2bd','#6d7667','#b8c4a8']},
 {title:'Warm Taupe & Timber',desc:'Warm timber grain, taupe mineral surfaces and a soft stone accent create a restrained, layered residential palette.',image:'assets/moodboards/board-02.jpg',colors:['#e4ded1','#b8a994','#806b55','#4e4a43','#c9c1b3']},
 {title:'Coastal Blue & White',desc:'Cool blue surfaces, pale stone and crisp linear texture create a fresh coastal material story with architectural clarity.',image:'assets/moodboards/board-03.jpg',colors:['#b9d7e4','#416c8c','#eef2ed','#17374b','#8ba9b7']},
 {title:'Sandstone & Oak',desc:'Oak-like timber grain, sandy mineral surfaces and warm neutral samples build a grounded, natural interior direction.',image:'assets/moodboards/board-04.jpg',colors:['#7b5a3f','#c8a47b','#e5d8c2','#5a5147','#b6aa96']},
 {title:'Graphite & Mineral Grey',desc:'Charcoal, cool grey and pale mineral samples are balanced through ribbed and woven textures for a sophisticated monochrome scheme.',image:'assets/moodboards/board-05.jpg',colors:['#4a4d4b','#777b76','#b9b5a9','#252827','#8f918b']},
 {title:'Terracotta & Clay',desc:'Clay-inspired surfaces, warm timber texture and soft mineral tones bring a tactile Mediterranean warmth to the material story.',image:'assets/moodboards/board-06.jpg',colors:['#a15b45','#d1a07d','#e6d4bf','#6f3f35','#b9856a']},
 {title:'Deep Green & Natural Stone',desc:'Deep botanical tones sit beside pale stone and textured surfaces, creating a rich but grounded biophilic direction.',image:'assets/moodboards/board-07.jpg',colors:['#243a36','#8b9b87','#d8d1bf','#5b665b','#b9c2af']},
 {title:'Oat, Walnut & Cream',desc:'Soft oat textures, walnut grain and dark architectural accents form a warm, sophisticated material palette for living spaces.',image:'assets/moodboards/board-08.jpg',colors:['#d5c5ae','#7d6855','#f0e8db','#302e2a','#a8957d']},
 {title:'Mist Blue & Stone',desc:'Muted blue, cool stone and light mineral surfaces create a quiet contemporary scheme with subtle textural contrast.',image:'assets/moodboards/board-09.jpg',colors:['#6f7781','#aeb7bf','#e8e9e5','#3b444d','#d0c6b6']},
 {title:'Honey Oak & Earth',desc:'Warm oak tones, earthy mineral surfaces and deeper timber accents create an inviting, tactile residential direction.',image:'assets/moodboards/board-10.jpg',colors:['#c6a27c','#76563f','#ddd2c0','#3b3029','#a88968']},
 {title:'Charcoal & Silver Mineral',desc:'Dark graphite surfaces, cool mineral texture and restrained pale accents give this board a precise architectural character.',image:'assets/moodboards/board-11.jpg',colors:['#313436','#6e7778','#b7b9b2','#17191a','#8f8579']},
 {title:'Quiet Greige & Linen',desc:'Layered greige, linen-like texture and soft mineral tones create an understated palette designed for calm, refined interiors.',image:'assets/moodboards/board-12.jpg',colors:['#c7bda9','#9b8f7e','#eee9df','#655a50','#b3a692']},
 {title:'Bronze, Walnut & Stone',desc:'Warm bronze-like tones, dark timber and pale stone are composed into a richer luxury direction with strong material depth.',image:'assets/moodboards/board-13.jpg',colors:['#c2a06f','#5c4638','#ddd6c8','#2b2927','#8b7353']},
 {title:'Natural Oak & Travertine',desc:'Natural timber, pale mineral stone and muted woven surfaces create an organic architectural palette with quiet sophistication.',image:'assets/moodboards/board-14.jpg',colors:['#8e806b','#b6a98e','#ded7c9','#4e473f','#756b5b']},
 {title:'Monochrome Graphite & Limestone',desc:'Graphite, limestone-like neutrals and soft warm accents establish a contemporary monochrome material direction with tactile detail.',image:'assets/moodboards/board-15.jpg',colors:['#d7d2c8','#b5b0a7','#6b6a65','#292a29','#8f806f']}
];

function renderPalette(colors,cls='palette-swatches'){return `<div class="${cls}" aria-label="Colour palette">${colors.map(c=>`<span class="palette-swatch" style="background:${c}" aria-label="Colour swatch"></span>`).join('')}</div>`}
function renderBoards(){
 const grid=document.querySelector('#boardsGrid');if(!grid)return;
 grid.innerHTML=boards.map((b,i)=>`<article class="board-card photographic-board reveal delay-${(i%3)+1}" tabindex="0" data-board="${i}">
   <div class="board-single-image"><img class="board-photo" src="${b.image}" alt="${b.title}: material sample board" loading="lazy"><span class="board-open">View board</span></div>
   <div class="board-meta-single"><h3>${b.title}</h3><p>${b.desc}</p>${renderPalette(b.colors)}</div>
 </article>`).join('');
 grid.querySelectorAll('.board-card').forEach(card=>{card.addEventListener('click',()=>openBoard(+card.dataset.board));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openBoard(+card.dataset.board)}})});
 grid.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
function openBoard(i){
 const b=boards[i]; const modal=document.querySelector('#boardModal');if(!modal)return;
 modal.querySelector('.modal-title').textContent=b.title;
 modal.querySelector('.modal-desc').textContent=b.desc;
 modal.querySelector('.modal-visual').innerHTML=`<div class="modal-photo-wrap"><img src="${b.image}" alt="${b.title} material sample board"></div>`;
 modal.querySelector('.modal-palette').innerHTML=renderPalette(b.colors,'modal-palette-swatches');
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeBoard(){const m=document.querySelector('#boardModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('#boardModal')?.addEventListener('click',e=>{if(e.target.id==='boardModal')closeBoard()});document.querySelector('.modal-close')?.addEventListener('click',closeBoard);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBoard()});renderBoards();

// Contact form: no fake backend. Opens a prefilled WhatsApp message as an explicit client-side handoff.
const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Armani Interiors,\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\nMessage: ${d.get('message')}`;window.open('https://wa.me/27633141801?text='+encodeURIComponent(msg),'_blank','noopener');document.querySelector('.form-status').textContent='Your enquiry has been prepared for WhatsApp. Please review it before sending.';});

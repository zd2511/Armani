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
 {title:'Ivory Marble Vein',desc:'A close material study of pale stone with warm mineral veining and a subtle natural variation.',image:'https://images.unsplash.com/photo-1786673218189-b6543a8b4777?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#F4F0E7','#D9C7B0','#B77D55','#8C6047','#5B4033'],fallback:'assets/IMG-20261007-WA0000.jpg'},
 {title:'Soft Mineral Plaster',desc:'A light, tactile surface study with a restrained mineral character suited to quiet contemporary interiors.',image:'https://images.unsplash.com/photo-1785136055019-69e1e933458c?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#EEECE6','#D7D3CC','#B9B5AE','#96918A','#6F6A63'],fallback:'assets/IMG-20261007-WA0011.jpg'},
 {title:'Natural Stone Texture',desc:'Irregular stone texture and tonal variation create a grounded architectural surface direction.',image:'https://images.unsplash.com/photo-1606896202657-09c153b5948d?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#C9C1B2','#A99E8E','#817768','#655A4E','#403A34'],fallback:'assets/IMG-20261007-WA0000.jpg'},
 {title:'Weathered Coastal Mineral',desc:'A naturally eroded stone surface introduces earthy variation and an organic tactile quality.',image:'https://images.unsplash.com/photo-1770795264005-27d5fc399c55?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#D0C4B0','#A9967E','#806B56','#594D43','#302D29'],fallback:'assets/IMG-20261007-WA0011.jpg'},
 {title:'Stacked Grey Stone',desc:'Layered grey stone provides a stronger architectural texture with depth, shadow and natural irregularity.',image:'https://images.unsplash.com/photo-1784528780206-6a0545dec6fd?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#D9D7D2','#B9B6B0','#8E8A83','#5F5C56','#393733'],fallback:'assets/IMG-20261007-WA0008.jpg'},
 {title:'Deep Walnut Grain',desc:'Dark timber grain brings warmth, depth and a refined natural pattern to the material story.',image:'https://images.unsplash.com/photo-1621295693450-080546d2ec8e?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#B78A62','#80583D','#593A2B','#38241D','#191513'],fallback:'assets/IMG-20261007-WA0001.jpg'},
 {title:'Blue Mineral Surface',desc:'A saturated mineral surface introduces a considered colour accent while retaining a tactile architectural quality.',image:'https://images.unsplash.com/photo-1613375920388-f1f70f341f8a?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#D5D8D7','#899AA2','#516B78','#304C5D','#172C38'],fallback:'assets/IMG-20261007-WA0010.jpg'},
 {title:'Textured Grey Plaster',desc:'Fine gritty texture and soft grey variation create a calm, contemporary finish direction.',image:'https://images.unsplash.com/photo-1769021168076-bbdcba325d92?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#E1DFDA','#C4C1BA','#9D9991','#716E69','#45433F'],fallback:'assets/IMG-20261007-WA0008.jpg'},
 {title:'Architectural Light & Shadow',desc:'A restrained wall study where directional light creates rhythm, contrast and a quiet architectural pattern.',image:'https://images.unsplash.com/photo-1776426128523-01cd3f7fa409?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#F1EEE7','#D9D2C7','#B2A99C','#766E64','#3D3934'],fallback:'assets/IMG-20261007-WA0009.jpg'},
 {title:'Charcoal Rock Surface',desc:'A dark mineral texture with cool grey variation gives the scheme a more dramatic, sculptural character.',image:'https://images.unsplash.com/photo-1781792923560-684c17e8c98e?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#B8B3B0','#88817F','#625B5B','#3D393B','#211F21'],fallback:'assets/IMG-20261007-WA0008.jpg'},
 {title:'Red Walnut Grain',desc:'A deep reddish timber surface introduces warmth and a richer wood tone for statement joinery or panelling.',image:'https://images.unsplash.com/photo-1542966336-22953b5f7404?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#A66D4C','#7A4633','#572D24','#351C19','#170F0D'],fallback:'assets/IMG-20261007-WA0001.jpg'},
 {title:'Black Marble & Vein',desc:'Near-black stone with fine light veining creates a high-contrast luxury material direction.',image:'https://images.unsplash.com/photo-1786673211400-90f79d15b1ff?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#E9E5DE','#B9B4AE','#77736F','#353332','#111111'],fallback:'assets/IMG-20261007-WA0008.jpg'},
 {title:'Stone & Leaf Shadow',desc:'A cool stone surface softened by organic shadow creates a natural connection between architecture and light.',image:'https://images.unsplash.com/photo-1790513265772-f74c9ec31d4a?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#D7D5CE','#B8B5AC','#85837C','#55534E','#2E2E2B'],fallback:'assets/IMG-20261007-WA0011.jpg'},
 {title:'Polished Marble & Gold',desc:'Pale polished stone carries warm metallic and muted green mineral veining for a more elevated decorative direction.',image:'https://images.unsplash.com/photo-1786673218600-b44d3e7936b6?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#F0ECE2','#D6C7A9','#B59B65','#7B8061','#4B5140'],fallback:'assets/IMG-20261007-WA0010.jpg'},
 {title:'Grey Marble & Warm Vein',desc:'A polished pale stone surface combines soft grey movement with restrained warm mineral accents.',image:'https://images.unsplash.com/photo-1786673213966-939ac1e2b5b2?auto=format&fit=crop&fm=jpg&q=88&w=2200',colors:['#EAE7E0','#C8C5BF','#9C9A96','#7A7068','#A38A68'],fallback:'assets/IMG-20261007-WA0000.jpg'}
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

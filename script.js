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

// Mood / sample boards — one distinct material image per board.
// The imagery follows the supplied benchmark: tactile flat-lays, sample arrangements,
// colour studies and close-up materials rather than finished-room galleries.
const moodImages=[
 'https://images.unsplash.com/photo-1781859240244-61e274c2bf39?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1752321532730-ed24a51e7b3f?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1752321531522-20d9c4dc2e0b?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1752321531154-09b1d4307e65?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1752321531399-1e2b66043b52?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1752321531753-d02f83283c5e?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1752321532656-43e714c3deba?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1778883004941-a8b1f9d085cc?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1770795264005-27d5fc399c55?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1771582969126-3aabded89765?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1775369351415-9ecfe51eb07b?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1719200474226-3cf2fab04bd2?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1697987215011-fa6a00e71561?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1781232756080-c81ff43ff8f7?auto=format&fit=crop&fm=jpg&q=90&w=1800',
 'https://images.unsplash.com/photo-1785136055019-69e1e933458c?auto=format&fit=crop&fm=jpg&q=90&w=1800'
];
const boards=[
 ['Soft Neutral Luxury','A quiet arrangement of warm ivory, pale stone, natural wood and soft organic detail for calm residential interiors.',['#f2eee5','#d8cbb9','#a8957f','#6e6255'],0,'Ivory','Natural oak','Warm stone','Soft taupe'],
 ['Natural Timber','Layered timber tones and tactile grain create a grounded material language suited to cabinetry, wall features and bespoke joinery.',['#d2a878','#9a6942','#67432f','#33251d'],1,'Pale oak','Walnut','Timber grain','Deep wood'],
 ['Colour & Material','A composed colour study where repeated hues across timber, stone and metal create a deliberate, architectural palette.',['#8e6d93','#b39a8e','#4e5c4d','#c9b7a7'],2,'Tinted stone','Paint tone','Metal accent','Textured surface'],
 ['Cape Coastal Blue','Cool blue material accents balanced by pale stone and reflective finishes create a restrained Atlantic-inspired scheme.',['#dfe5e4','#829aa2','#4d6872','#c8b79e'],3,'Sea-glass blue','Pale stone','Smoked metal','Sand tone'],
 ['Monochrome Texture','Graphic texture, dark-and-light contrast and subtle surface variation create an understated architectural monochrome.',['#eeeae3','#b9b5ae','#68645e','#292826'],4,'Ivory surface','Grey stone','Graphite metal','Charcoal textile'],
 ['Wood & Stone','Warm timber and stone sit together in a tactile natural composition suited to refined contemporary interiors.',['#c8a887','#947052','#665346','#d8cdbb'],5,'Natural timber','Stone','Walnut','Warm neutral'],
 ['Material Colour Study','A balanced sample arrangement where colour, reflection and material finish are treated as one interior palette.',['#e1d9cc','#8d9e9a','#4f6868','#b5a783'],6,'Mineral tone','Sea green','Reflective metal','Natural stone'],
 ['Cognac Leather','Rich brown leather grain introduces depth, warmth and a tailored feel for lounges, studies and executive spaces.',['#6f402a','#8f5a3b','#b5835d','#30221c'],7,'Cognac leather','Dark timber','Tan hide','Espresso'],
 ['Soft Earth','A plush warm-brown texture creates a tactile base for relaxed residential spaces and softly layered upholstery.',['#8b6c57','#6b4f40','#b0967f','#d3c0ac'],8,'Warm fabric','Mocha','Taupe','Natural fibre'],
 ['Quiet Grey','Wavy grey textile texture gives a soft architectural rhythm for bedrooms, lounges and contemporary workspaces.',['#e2dfda','#b8b5b0','#817e79','#4b4946'],9,'Silver grey','Stone grey','Graphite','Soft charcoal'],
 ['Warm Minimalism','A restrained beige surface provides a calm foundation for light timber, limestone, linen and understated metal.',['#e9e0d2','#d1c0a8','#aa947a','#6d5d4c'],10,'Warm ivory','Sand','Linen','Natural clay'],
 ['Natural Fibre','Woven texture brings craft and warmth into the palette, pairing naturally with oak, stone and muted earthy tones.',['#d4b995','#a9845e','#765a42','#40372f'],11,'Woven fibre','Natural oak','Cane','Earth brown'],
 ['Modern African Earth','Weathered organic texture in grey and terracotta creates a grounded material direction with strong natural character.',['#8b8278','#a85f42','#6e4d3d','#c2aa93'],12,'Weathered timber','Terracotta','Stone grey','Clay'],
 ['Crafted Natural','Cane texture introduces handmade warmth and pattern, balanced by earthy neutrals for contemporary residential spaces.',['#c99f73','#9b704d','#5e4b3d','#8a7880'],13,'Cane','Natural fibre','Walnut','Muted accent'],
 ['Architectural Mineral','A pale mineral surface establishes a clean architectural base for concrete, stone, timber and minimal contemporary detailing.',['#e4e0d8','#c7c1b6','#969087','#5f5b54'],14,'Mineral surface','Light concrete','Warm grey','Stone']
];
function boardImage(i){return moodImages[i]}
function renderBoards(){
 const grid=document.querySelector('#boardsGrid');if(!grid)return;
 grid.innerHTML=boards.map((b,i)=>{const [title,desc,pal,img,mat1,mat2,mat3,mat4]=b;return `<article class="board-card photographic-board reveal delay-${(i%3)+1}" tabindex="0" data-board="${i}">
   <div class="physical-board">
     <div class="board-photo-wrap"><img class="board-photo" src="${boardImage(img)}" alt="${title}: interior-design material and texture study" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback')"><span class="board-stamp">ARMANI / MATERIAL BOARD</span></div>
     <div class="board-paper">
       <div class="board-paper-top"><span>ARMANI INTERIORS</span><span>Material Board</span></div>
       <h3>${title}</h3><p>${desc}</p>
       <div class="swatch-row">${pal.map(x=>`<span style="background:${x}"></span>`).join('')}</div>
       <div class="material-labels"><span>${mat1}</span><span>${mat2}</span><span>${mat3}</span><span>${mat4}</span></div>
     </div>
   </div>
 </article>`}).join('');
 grid.querySelectorAll('.board-card').forEach(card=>{card.addEventListener('click',()=>openBoard(+card.dataset.board));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ') {e.preventDefault();openBoard(+card.dataset.board)}})});
 grid.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
function openBoard(i){
 const b=boards[i]; const modal=document.querySelector('#boardModal');if(!modal)return;
 modal.querySelector('.modal-title').textContent=b[0];modal.querySelector('.modal-desc').textContent=b[1];
 modal.querySelector('.modal-visual').innerHTML=`<div class="modal-photo-wrap"><img src="${boardImage(b[3])}" alt="${b[0]} material board" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback')"><span>ARMANI / MATERIAL BOARD</span></div>`;
 modal.querySelector('.modal-palette').innerHTML=b[2].map((x,j)=>`<div class="material"><span style="display:block;width:100%;height:42px;background:${x};margin-bottom:9px"></span><strong>${['Base','Secondary','Depth','Accent'][j]}</strong><span>${x.toUpperCase()}</span></div>`).join('');
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeBoard(){const m=document.querySelector('#boardModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('#boardModal')?.addEventListener('click',e=>{if(e.target.id==='boardModal')closeBoard()});document.querySelector('.modal-close')?.addEventListener('click',closeBoard);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBoard()});renderBoards();

// Contact form: no fake backend. Opens a prefilled WhatsApp message as an explicit client-side handoff.
const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Armani Interiors,\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\nMessage: ${d.get('message')}`;window.open('https://wa.me/27633141801?text='+encodeURIComponent(msg),'_blank','noopener');document.querySelector('.form-status').textContent='Your enquiry has been prepared for WhatsApp. Please review it before sending.';});

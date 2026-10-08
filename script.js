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

// Mood / sample board data — built around actual material, finish and swatch imagery.
// The imagery follows the professional sample-board approach: physical materials, swatches,
// textures, finish samples and curated palettes rather than finished-room photography.
const moodImages=[
 'https://images.unsplash.com/photo-1752321532730-ed24a51e7b3f?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=90&w=1800',
 'https://images.unsplash.com/photo-1752321531522-20d9c4dc2e0b?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=90&w=1800',
 'https://images.unsplash.com/photo-1752321531154-09b1d4307e65?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=90&w=1800',
 'https://images.unsplash.com/photo-1752321531399-1e2b66043b52?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=90&w=1800',
 'https://images.unsplash.com/photo-1752321532656-43e714c3deba?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=90&w=1800',
 'https://images.unsplash.com/photo-1770970831074-6e88b6cc260b?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=90&w=1800',
 'https://images.unsplash.com/photo-1761682719790-4e0b38ed5beb?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=90&w=1800',
 'https://images.unsplash.com/photo-1776754373094-a22dc3a10398?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=90&w=1800',
 'assets/IMG-20261007-WA0001.jpg',
 'assets/IMG-20261007-WA0008.jpg'
];
const boards=[
 ['Contemporary Luxury','Blackened timber, stone, bronze and champagne metallics.',['#252321','#716452','#c8a45d','#e7dfd1'],0,4,'Walnut · Stone · Bronze · Champagne gold'],
 ['Warm Minimalism','Linen, pale oak, warm stone and restrained matte finishes.',['#eee8dc','#cdbca7','#927c65','#514a42'],1,5,'Oak · Linen · Limestone · Matte metal'],
 ['Modern African Luxury','Earth pigments, dark timber, stone and tactile woven surfaces.',['#b79a78','#705744','#2d2925','#c7a15d'],2,6,'Earth pigment · Dark oak · Stone · Brass'],
 ['Coastal Contemporary','Mineral neutrals, pale timber, sea-glass blue and brushed metal.',['#f1eee6','#d7cbb9','#83959a','#bca06c'],3,5,'Ash · Limestone · Sea-glass · Brushed metal'],
 ['Monochrome Sophistication','Graphite, ivory, black timber and layered tactile surfaces.',['#f3f0e9','#aaa69e','#403d39','#151514'],4,0,'Graphite · Ivory · Black oak · Stone'],
 ['Earthy Modern','Clay, olive, walnut and natural stone for grounded contemporary spaces.',['#d8c8b4','#8d806b','#5d5145','#aa8b64'],5,2,'Clay · Olive · Walnut · Travertine'],
 ['Soft Neutral Luxury','Cream, taupe, boucle-like textures and quiet champagne accents.',['#f0ece4','#d5c8b8','#aa9985','#c6a15e'],6,1,'Cream · Taupe · Textile · Champagne'],
 ['Executive Workspace','Dark timber, stone, bronze and deep neutral upholstery.',['#252421','#594d40','#92785f','#c5a267'],7,4,'Walnut · Stone · Bronze · Charcoal'],
 ['Modern Corporate','Clean mineral surfaces, structured timber and controlled accent metal.',['#eeece6','#b9b6ae','#77736b','#bda36e'],8,5,'Ash · Stone · Steel · Bronze'],
 ['Dark Luxury','Charcoal, dramatic stone, smoked timber and warm metallic detail.',['#171716','#39332e','#76604d','#d0a85f'],9,0,'Smoked oak · Stone · Bronze · Gold'],
 ['Marble & Gold','Veined stone, black timber and metallic gold with refined tactile layers.',['#f5f1e7','#bdb4a4','#5a5148','#c8a258'],0,3,'Marble · Black oak · Gold · Stone'],
 ['Natural Textures','Timber grain, woven fibre, mineral texture and low-sheen surfaces.',['#dfd3c1','#b39b7f','#796b5c','#423d36'],1,7,'Timber · Fibre · Plaster · Stone'],
 ['Cape Town Coastal','Sand, weathered timber, mineral blue and warm stone.',['#f3efe7','#d6c9b8','#87979a','#af8f66'],2,5,'Sandstone · Oak · Mineral blue · Bronze'],
 ['Contemporary Hospitality','Rich timber, tactile textiles, stone and intimate metallic accents.',['#e0d1c0','#745e4d','#302c29','#c4a064'],3,6,'Stone · Walnut · Textile · Bronze'],
 ['Modern Residential Elegance','Fluted timber, warm stone, neutral textiles and soft metallic detail.',['#ebe7df','#c5b7a7','#6d6256','#bd9b63'],4,7,'Fluted oak · Limestone · Textile · Brass']
];
function boardImage(i){return moodImages[i % moodImages.length]}
function renderBoards(){
 const grid=document.querySelector('#boardsGrid');if(!grid)return;
 grid.innerHTML=boards.map((b,i)=>{const [title,desc,pal,a,c,mat]=b;return `<article class="board-card reveal delay-${(i%3)+1}" tabindex="0" data-board="${i}"><div class="board-art sample-art"><img class="a" src="${boardImage(a)}" alt="${title} material and finish sample board" loading="lazy"><img class="b" src="${boardImage(c)}" alt="${title} supporting material sample" loading="lazy"><div class="sample-strip">${pal.slice(0,3).map((x,j)=>`<span style="background:${x}" aria-label="Colour sample ${j+1}"></span>`).join('')}</div></div><div class="board-meta"><div class="eyebrow">Material / Finish Board</div><h3>${title}</h3><p>${desc}</p><div class="board-palette">${pal.map(x=>`<span style="background:${x}"></span>`).join('')}</div></div></article>`}).join('');
 grid.querySelectorAll('.board-card').forEach(card=>{card.addEventListener('click',()=>openBoard(+card.dataset.board));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ') {e.preventDefault();openBoard(+card.dataset.board)}})});
 grid.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
function openBoard(i){
 const b=boards[i]; const modal=document.querySelector('#boardModal');if(!modal)return;
 modal.querySelector('.modal-title').textContent=b[0];modal.querySelector('.modal-desc').textContent=b[1];
 modal.querySelector('.modal-visual').innerHTML=`<img src="${boardImage(b[3])}" alt="${b[0]} primary material sample board"><img src="${boardImage(b[4])}" alt="${b[0]} supporting material sample board">`;
 modal.querySelector('.modal-palette').innerHTML=b[2].map((x,j)=>`<div class="material"><span style="display:block;width:100%;height:34px;background:${x};margin-bottom:9px"></span><strong>${['Base','Secondary','Depth','Accent'][j]}</strong><span>${x.toUpperCase()}</span></div>`).join('');
 modal.querySelector('.modal-materials').innerHTML=['Primary material','Surface / finish','Furniture character','Lighting language','Textile direction','Architectural detail'].map((x,j)=>`<div class="material"><strong>${x}</strong><span>${[b[5],'Tactile, low-sheen and layered','Soft-edged, tailored silhouettes','Warm ambient pools','Natural, textural upholstery','Quietly graphic detailing'][j]}</span></div>`).join('');
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeBoard(){const m=document.querySelector('#boardModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('#boardModal')?.addEventListener('click',e=>{if(e.target.id==='boardModal')closeBoard()});document.querySelector('.modal-close')?.addEventListener('click',closeBoard);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBoard()});renderBoards();

// Contact form: no fake backend. Opens a prefilled WhatsApp message as an explicit client-side handoff.
const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Armani Interiors,\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\nMessage: ${d.get('message')}`;window.open('https://wa.me/27633141801?text='+encodeURIComponent(msg),'_blank','noopener');document.querySelector('.form-status').textContent='Your enquiry has been prepared for WhatsApp. Please review it before sending.';});

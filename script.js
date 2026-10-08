const A='/assets/';
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

// Mood board data
const boards=[
 ['01','Contemporary Luxury','Polished stone, warm timber and brushed metal create a quiet, tailored sense of luxury.',['#e8e1d4','#b7a99a','#3d3934','#c7a15a'],1,2,'Stone · Walnut · Champagne metal'],
 ['02','Warm Minimalism','Soft neutrals, tactile linen and restrained timber for calm, architectural interiors.',['#eee9df','#d5c8b7','#9b8c78','#514c45'],2,5,'Limestone · Oak · Linen'],
 ['03','Modern African Luxury','Earth-led tones paired with dark architectural details and sculptural accents.',['#c8b29a','#755d47','#272522','#d1a866'],3,8,'Clay · Dark oak · Brass'],
 ['04','Coastal Contemporary','Cape Town light translated through stone, sand, pale oak and ocean-inspired accents.',['#f3efe7','#c9c1b3','#73858a','#bda36d'],4,6,'Travertine · Ash · Sea glass'],
 ['05','Monochrome Sophistication','Black, ivory and graphite sharpened by layered textures and controlled lighting.',['#f4f2ed','#b8b4ad','#373633','#11110f'],8,9,'Graphite · Fluted oak · Quartz'],
 ['06','Earthy Modern','Natural stone, muted greens and timber bring warmth without visual noise.',['#d8d1c3','#9a9b83','#625b4e','#b18c63'],11,5,'Stone · Olive · Oak'],
 ['07','Soft Neutral Luxury','Cream, taupe, champagne and curved forms create a serene residential language.',['#f0ece4','#d4c9ba','#a99683','#c7a15a'],6,10,'Bouclé · Marble · Champagne'],
 ['08','Executive Workspace','Deep graphite, timber slats and warm lighting designed for confident professional spaces.',['#292826','#554b40','#9c856b','#c6a46b'],7,3,'Walnut · Fluted panel · Brass'],
 ['09','Modern Corporate','Clean geometry, acoustic textures and light stone create a focused workplace.',['#f0efeb','#bcb9b1','#6e6b64','#c2a76c'],12,7,'Stone · Ash · Bronze'],
 ['10','Dark Luxury','Moody charcoal, dramatic stone and warm metallics for hospitality and evening spaces.',['#171716','#393530','#715d49','#d0aa62'],9,4,'Marble · Smoked oak · Gold'],
 ['11','Marble & Gold','Veined stone becomes the hero, balanced by quiet upholstery and fine metallic detail.',['#f4f1e9','#c9c0af','#806e58','#c9a45f'],10,3,'Calacatta · Brass · Walnut'],
 ['12','Natural Textures','Layered timber, woven textures and tactile wall treatments for an organic modern feel.',['#ded4c5','#b39b80','#7b6b5b','#403c35'],0,11,'Timber · Plaster · Linen'],
 ['13','Cape Town Coastal','Refined coastal living: mineral whites, warm timber and soft blue-grey notes.',['#f5f3ee','#ddd4c5','#8c9b9d','#b28f64'],4,11,'Limestone · Oak · Mineral blue'],
 ['14','Contemporary Hospitality','Statement lighting, rich stone and intimate seating create a memorable guest experience.',['#e3d7c8','#705e50','#2d2a27','#c5a263'],5,4,'Stone · Bronze · Velvet'],
 ['15','Modern Residential Elegance','Layered neutrals, architectural paneling and soft illumination for timeless homes.',['#ece8df','#c7b9a8','#675f55','#bd9a62'],12,6,'Fluted panel · Oak · Brass']
];
const cleanRefs=[2,3,4,5,6,8,9,12]; const boardImages=n=>[img(`IMG-20261007-WA${String(cleanRefs[n%cleanRefs.length]).padStart(4,'0')}.jpg`)];
function renderBoards(){
 const grid=document.querySelector('#boardsGrid');if(!grid)return;
 grid.innerHTML=boards.map((b,i)=>{const [no,title,desc,pal,a,c,mat]=b;return `<article class="board-card reveal delay-${(i%3)+1}" tabindex="0" data-board="${i}"><div class="board-art"><img class="a" src="${boardImages(a)[0]}" alt="${title} interior design reference" loading="lazy"><img class="b" src="${boardImages(c)[0]}" alt="${title} material reference" loading="lazy"><div class="swatch-stack">${pal.slice(0,3).map((x,j)=>`<span style="background:${x}"></span>`).join('')}</div></div><div class="board-meta"><div class="eyebrow">Concept Board ${no}</div><h3>${title}</h3><p>${desc}</p><div class="board-palette">${pal.map(x=>`<span style="background:${x}"></span>`).join('')}</div></div></article>`}).join('');
 grid.querySelectorAll('.board-card').forEach(card=>{card.addEventListener('click',()=>openBoard(+card.dataset.board));card.addEventListener('keydown',e=>{if(e.key==='Enter')openBoard(+card.dataset.board)})});
 grid.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
function openBoard(i){
 const b=boards[i]; const modal=document.querySelector('#boardModal');if(!modal)return;
 modal.querySelector('.modal-title').textContent=b[1];modal.querySelector('.modal-desc').textContent=b[2];
 modal.querySelector('.modal-visual').innerHTML=`<img src="${boardImages(b[4])[0]}" alt="${b[1]} primary reference"><img src="${boardImages(b[5])[0]}" alt="${b[1]} supporting reference">`;
 modal.querySelector('.modal-palette').innerHTML=b[3].map((x,j)=>`<div class="material"><span style="display:block;width:100%;height:34px;background:${x};margin-bottom:9px"></span><strong>${['Base','Secondary','Depth','Accent'][j]}</strong><span>${x.toUpperCase()}</span></div>`).join('');
 modal.querySelector('.modal-materials').innerHTML=['Material direction','Surface / finish','Furniture character','Lighting language','Textile direction','Architectural detail'].map((x,j)=>`<div class="material"><strong>${x}</strong><span>${[b[6],'Tactile, low-sheen and layered','Soft-edged, tailored silhouettes','Warm ambient pools','Natural, textural upholstery','Quietly graphic detailing'][j]}</span></div>`).join('');
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeBoard(){const m=document.querySelector('#boardModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('#boardModal')?.addEventListener('click',e=>{if(e.target.id==='boardModal')closeBoard()});document.querySelector('.modal-close')?.addEventListener('click',closeBoard);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBoard()});renderBoards();

// Contact form: no fake backend. Opens a prefilled WhatsApp message as an explicit client-side handoff.
const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Armani Interiors,\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\nMessage: ${d.get('message')}`;window.open('https://wa.me/27633141801?text='+encodeURIComponent(msg),'_blank','noopener');document.querySelector('.form-status').textContent='Your enquiry has been prepared for WhatsApp. Please review it before sending.';});

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

// Mood / sample boards — photographic material compositions, not room-photo galleries.
// Sources deliberately follow the supplied visual benchmark: tactile flat-lays of samples,
// timber, stone, fabric, colour and small styling objects.
const moodImages=[
 'https://images.unsplash.com/photo-1752321532730-ed24a51e7b3f?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=92&w=1800',
 'https://images.unsplash.com/photo-1752321531522-20d9c4dc2e0b?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=92&w=1800',
 'https://images.unsplash.com/photo-1752321531154-09b1d4307e65?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=92&w=1800',
 'https://images.unsplash.com/photo-1752321531399-1e2b66043b52?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=92&w=1800',
 'https://images.unsplash.com/photo-1781859240244-61e274c2bf39?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=92&w=1800',
 'https://images.unsplash.com/photo-1752321532656-43e714c3deba?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=92&w=1800'
];
const boards=[
 ['Contemporary Luxury','A restrained composition of dark timber, veined stone, brushed metal and warm champagne accents.',['#252321','#716452','#c8a45d','#e7dfd1'],0,'Walnut','Travertine','Brushed bronze','Champagne textile'],
 ['Warm Minimalism','Pale oak, linen, mineral stone and softly textured neutrals create a quiet, tactile palette.',['#eee8dc','#cdbca7','#927c65','#514a42'],1,'Pale oak','Limestone','Linen','Matte taupe'],
 ['Modern African Luxury','Earth pigments, carved timber, stone and woven texture create depth without visual clutter.',['#b79a78','#705744','#2d2925','#c7a15d'],2,'Dark oak','Earth stone','Woven fibre','Antique brass'],
 ['Coastal Contemporary','Sand, weathered timber, mineral blue and pale stone translate Cape Town coastal light indoors.',['#f1eee6','#d7cbb9','#83959a','#bca06c'],3,'Weathered oak','Sandstone','Sea-glass blue','Brushed metal'],
 ['Monochrome Sophistication','Ivory, graphite, black timber and tactile surfaces create an architectural monochrome scheme.',['#f3f0e9','#aaa69e','#403d39','#151514'],4,'Black oak','Ivory stone','Graphite textile','Dark metal'],
 ['Earthy Modern','Clay, olive, walnut and natural stone build a grounded contemporary material story.',['#d8c8b4','#8d806b','#5d5145','#aa8b64'],5,'Walnut','Travertine','Olive textile','Clay plaster'],
 ['Soft Neutral Luxury','Cream, taupe, tactile fabric and quiet metallic detail create a calm residential direction.',['#f0ece4','#d5c8b8','#aa9985','#c6a15e'],0,'Natural oak','Cream stone','Bouclé texture','Champagne metal'],
 ['Executive Workspace','Dark timber, stone, bronze and tailored upholstery form a confident boardroom palette.',['#252421','#594d40','#92785f','#c5a267'],1,'Walnut veneer','Dark stone','Bronze','Charcoal textile'],
 ['Modern Corporate','Mineral surfaces, structured timber and controlled metal accents keep the workspace precise.',['#eeece6','#b9b6ae','#77736b','#bda36e'],2,'Ash timber','Mineral stone','Steel','Warm bronze'],
 ['Dark Luxury','Charcoal, smoked timber, dramatic stone and warm metallics create a cinematic direction.',['#171716','#39332e','#76604d','#d0a85f'],3,'Smoked oak','Veined stone','Charcoal fabric','Aged brass'],
 ['Marble & Gold','Veined marble, black timber and metallic gold are balanced with soft tactile neutrals.',['#f5f1e7','#bdb4a4','#5a5148','#c8a258'],4,'Black oak','Marble','Champagne gold','Ivory textile'],
 ['Natural Textures','Timber grain, woven fibre, mineral texture and low-sheen surfaces keep the palette organic.',['#dfd3c1','#b39b7f','#796b5c','#423d36'],5,'Natural timber','Limestone','Woven fibre','Mineral plaster'],
 ['Cape Town Coastal','Warm sand, pale timber, mineral blue and stone echo a sophisticated Atlantic palette.',['#f3efe7','#d6c9b8','#87979a','#af8f66'],0,'Pale oak','Shell limestone','Ocean blue','Brushed brass'],
 ['Contemporary Hospitality','Rich timber, tactile textile, stone and intimate metallic detail create a layered hospitality feel.',['#e0d1c0','#745e4d','#302c29','#c4a064'],1,'Walnut','Warm stone','Textured textile','Soft bronze'],
 ['Modern Residential Elegance','Fluted timber, warm stone, neutral textile and soft metallic detail create a polished home direction.',['#ebe7df','#c5b7a7','#6d6256','#bd9b63'],2,'Fluted oak','Limestone','Natural textile','Soft brass']
];
function boardImage(i){return moodImages[i % moodImages.length]}
function renderBoards(){
 const grid=document.querySelector('#boardsGrid');if(!grid)return;
 grid.innerHTML=boards.map((b,i)=>{const [title,desc,pal,img,mat1,mat2,mat3,mat4]=b;return `<article class="board-card photographic-board reveal delay-${(i%3)+1}" tabindex="0" data-board="${i}">
   <div class="physical-board">
     <div class="board-photo-wrap"><img class="board-photo" src="${boardImage(img)}" alt="${title}: photographed interior-design material sample composition" loading="lazy" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback')"><span class="board-stamp">ARMANI / MATERIAL STUDY</span></div>
     <div class="board-paper">
       <div class="board-paper-top"><span>ARMANI INTERIORS</span><span>Material Study ${String(i+1).padStart(2,'0')}</span></div>
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
 modal.querySelector('.modal-visual').innerHTML=`<div class="modal-photo-wrap"><img src="${boardImage(b[3])}" alt="${b[0]} photographed material sample composition" onerror="this.style.display='none';this.parentElement.classList.add('image-fallback')"><span>ARMANI / MATERIAL STUDY</span></div>`;
 modal.querySelector('.modal-palette').innerHTML=b[2].map((x,j)=>`<div class="material"><span style="display:block;width:100%;height:42px;background:${x};margin-bottom:9px"></span><strong>${['Base','Secondary','Depth','Accent'][j]}</strong><span>${x.toUpperCase()}</span></div>`).join('');
 modal.querySelector('.modal-materials').innerHTML=[b[4],b[5],b[6],b[7]].map((x,j)=>`<div class="material"><strong>${['Timber','Stone / surface','Textile / metal','Accent finish'][j]}</strong><span>${x}</span></div>`).join('');
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeBoard(){const m=document.querySelector('#boardModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('#boardModal')?.addEventListener('click',e=>{if(e.target.id==='boardModal')closeBoard()});document.querySelector('.modal-close')?.addEventListener('click',closeBoard);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBoard()});renderBoards();

// Contact form: no fake backend. Opens a prefilled WhatsApp message as an explicit client-side handoff.
const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Armani Interiors,\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\nMessage: ${d.get('message')}`;window.open('https://wa.me/27633141801?text='+encodeURIComponent(msg),'_blank','noopener');document.querySelector('.form-status').textContent='Your enquiry has been prepared for WhatsApp. Please review it before sending.';});

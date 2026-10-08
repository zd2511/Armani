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

// Mood / sample boards — one image per board, with metadata matched to the image's actual visual language.
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
 ['Neutral Material Study','Warm ivory, pale beige, natural timber and muted green form a calm, tactile foundation for contemporary residential interiors.','Ivory · Oat · Natural timber · Muted sage',0],
 ['Timber & Warm Grain','Natural wood grain and warm brown surfaces create a grounded, crafted direction with a quiet architectural character.','Honey oak · Walnut · Caramel · Deep brown',1],
 ['Colour Material Study','A composed study of coloured surfaces and reflective details, balancing muted green with dusty mauve and mineral neutrals.','Sage · Dusty mauve · Mineral grey · Soft beige',2],
 ['Atlantic Blue','Cool blue material notes meet pale stone and restrained metallic detail, creating a refined coastal direction without feeling nautical.','Sea blue · Mist · Pale stone · Smoked grey',3],
 ['Monochrome Texture','Layered grey, charcoal and off-white textures create a restrained, graphic material language for sophisticated modern interiors.','Chalk · Warm grey · Graphite · Charcoal',4],
 ['Wood & Stone','Earthy timber, stone and warm neutral surfaces create a tactile palette suited to contemporary residential architecture.','Sandstone · Oak · Walnut · Earth brown',5],
 ['Mineral Green','Soft mineral greens and reflective neutral surfaces bring a fresh, sophisticated material direction with subtle contrast.','Eucalyptus · Mineral grey · Moss · Warm white',6],
 ['Cognac & Espresso','Rich leather-like browns and deep timber tones create a tailored, intimate palette appropriate to studies, lounges and executive spaces.','Cognac · Chestnut · Espresso · Tan',7],
 ['Earth & Clay','Warm clay, mocha and natural fibre tones create an organic, grounded scheme with a softly layered tactile quality.','Clay · Mocha · Sand · Natural fibre',8],
 ['Quiet Grey','Cool grey texture with soft tonal variation creates a calm, understated foundation for bedrooms, lounges and contemporary workspaces.','Silver grey · Pebble · Smoke · Charcoal',9],
 ['Warm Ivory','Cream, sand and light natural finishes create an understated luxury palette designed to keep interiors bright, warm and timeless.','Cream · Sand · Linen · Light taupe',10],
 ['Natural Fibre','Woven texture, timber and earthy neutrals create a relaxed material direction with visible craft and natural variation.','Wheat · Honey · Cane · Umber',11],
 ['Earth & Terracotta','Weathered neutrals paired with terracotta create a warmer, more expressive material direction with an African-earth character.','Stone grey · Terracotta · Clay · Warm beige',12],
 ['Cane & Natural Wood','Natural cane and timber textures bring pattern and warmth together in a restrained contemporary scheme.','Cane · Oak · Walnut · Soft taupe',13],
 ['Architectural Mineral','Pale mineral, concrete and stone tones create a clean architectural base for contemporary detailing and restrained luxury.','Limestone · Concrete · Greige · Stone',14]
];
function boardImage(i){return moodImages[i]}
function renderBoards(){
 const grid=document.querySelector('#boardsGrid');if(!grid)return;
 grid.innerHTML=boards.map((b,i)=>{const [title,desc,palette,img]=b;return `<article class="board-card photographic-board reveal delay-${(i%3)+1}" tabindex="0" data-board="${i}">
   <div class="board-single-image"><img class="board-photo" src="${boardImage(img)}" alt="${title}: interior design material study" loading="lazy"><span class="board-open">View board</span></div>
   <div class="board-meta-single"><h3>${title}</h3><p>${desc}</p><div class="board-palette-text">${palette}</div></div>
 </article>`}).join('');
 grid.querySelectorAll('.board-card').forEach(card=>{card.addEventListener('click',()=>openBoard(+card.dataset.board));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openBoard(+card.dataset.board)}})});
 grid.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
function openBoard(i){
 const b=boards[i]; const modal=document.querySelector('#boardModal');if(!modal)return;
 modal.querySelector('.modal-title').textContent=b[0];
 modal.querySelector('.modal-desc').textContent=b[1];
 modal.querySelector('.modal-visual').innerHTML=`<div class="modal-photo-wrap"><img src="${boardImage(b[3])}" alt="${b[0]} material study"></div>`;
 modal.querySelector('.modal-palette').innerHTML=`<p class="modal-palette-text"><strong>Palette</strong><br>${b[2]}</p>`;
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeBoard(){const m=document.querySelector('#boardModal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}
document.querySelector('#boardModal')?.addEventListener('click',e=>{if(e.target.id==='boardModal')closeBoard()});document.querySelector('.modal-close')?.addEventListener('click',closeBoard);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBoard()});renderBoards();

// Contact form: no fake backend. Opens a prefilled WhatsApp message as an explicit client-side handoff.
const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Armani Interiors,\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\nMessage: ${d.get('message')}`;window.open('https://wa.me/27633141801?text='+encodeURIComponent(msg),'_blank','noopener');document.querySelector('.form-status').textContent='Your enquiry has been prepared for WhatsApp. Please review it before sending.';});

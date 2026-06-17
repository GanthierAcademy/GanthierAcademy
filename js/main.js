(function(){
  "use strict";
  const $=(s,p=document)=>p.querySelector(s); const $$=(s,p=document)=>Array.from(p.querySelectorAll(s));
  const header=$('.site-header');
  function headerState(){ if(!header)return; header.classList.toggle('is-scrolled', window.scrollY>12); }
  headerState(); window.addEventListener('scroll',headerState,{passive:true});
  const toggle=$('.menu-toggle'), menu=$('.nav-menu');
  if(toggle&&menu){
    toggle.addEventListener('click',()=>{const open=menu.classList.toggle('active');toggle.classList.toggle('active',open);toggle.setAttribute('aria-expanded',String(open));});
    $$('.nav-link',menu).forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('active');toggle.classList.remove('active');toggle.setAttribute('aria-expanded','false');}));
    document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!toggle.contains(e.target)&&menu.classList.contains('active')){menu.classList.remove('active');toggle.classList.remove('active');toggle.setAttribute('aria-expanded','false');}});
  }
  const current=window.location.pathname.split('/').pop()||'index.html';
  $$('.nav-link').forEach(a=>{const h=a.getAttribute('href'); if(h&&(h.split('/').pop()===current||(current===''&&h==='index.html')))a.classList.add('active');});
  const reveals=$$('.reveal,.reveal-left,.reveal-right');
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>{entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('visible');io.unobserve(en.target);}})},{threshold:.14,rootMargin:'0px 0px -40px 0px'});reveals.forEach(el=>io.observe(el));} else reveals.forEach(el=>el.classList.add('visible'));
  const faqItems=$$('.faq-item');
  faqItems.forEach(item=>{const q=$('.faq-question',item), ans=$('.faq-answer',item); if(!q||!ans)return; q.addEventListener('click',()=>{const active=item.classList.contains('active'); faqItems.forEach(o=>{const oa=$('.faq-answer',o),oq=$('.faq-question',o); o.classList.remove('active'); if(oa)oa.style.maxHeight=null; if(oq)oq.setAttribute('aria-expanded','false');}); if(!active){item.classList.add('active'); ans.style.maxHeight=ans.scrollHeight+'px'; q.setAttribute('aria-expanded','true');}});});
  window.addEventListener('resize',()=>faqItems.forEach(item=>{const ans=$('.faq-answer',item); if(item.classList.contains('active')&&ans)ans.style.maxHeight=ans.scrollHeight+'px';}));
  const form=$('.contact-form');
  if(form){form.addEventListener('submit',e=>{e.preventDefault(); let ok=true; $$('[required]',form).forEach(f=>{if(!f.value.trim()){ok=false;f.setAttribute('aria-invalid','true');}else f.setAttribute('aria-invalid','false');}); const old=$('.form-message',form); if(old)old.remove(); const msg=document.createElement('p'); msg.className='form-message'; msg.style.fontWeight='800'; msg.style.color=ok?'#1f5f8b':'#9f741c'; msg.textContent=ok?'Thank you for contacting Ganthier Academy. This static GitHub Pages form is ready for integration with your preferred form service.':'Please complete all required fields before submitting your message to Ganthier Academy.'; form.appendChild(msg); if(ok)form.reset();});}
  $$('.current-year').forEach(el=>el.textContent=new Date().getFullYear());
})();

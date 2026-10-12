// Signature motion: firehouse then -> storefront now, scrubbed. Plus quiet reveals. Reduced motion: static, stacked.
(function(){
  if(!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  var mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',function(){
    var box=document.querySelector('[data-scrub]');
    if(box){
      box.classList.add('is-scrub');
      var now=box.querySelector('.now img');
      gsap.set(now,{clipPath:'inset(0 0 0 100%)'});
      var tl=gsap.timeline({scrollTrigger:{trigger:box,start:'top 15%',end:'+=120%',scrub:.6,pin:true,pinSpacing:true,anticipatePin:1}});
      tl.to(now,{clipPath:'inset(0 0 0 0%)',ease:'none'});
    }
    gsap.utils.toArray('.disp,.ev,.way,.taplist,.hours,.past').forEach(function(el){
      gsap.from(el,{y:20,opacity:0,duration:.7,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 85%',once:true}});
    });
    return function(){box&&box.classList.remove('is-scrub');};
  });
})();

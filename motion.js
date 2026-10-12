// Signature motion: firehouse then -> storefront now, scrubbed while image and story stay pinned together.
// Plus quiet transform-only reveals for content below the first screen. Reduced motion / no JS: static layout.
(function(){
  if(!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  var mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',function(){
    var hist=document.querySelector('[data-scrub-pin]'),box=document.querySelector('[data-scrub]'),nav=document.querySelector('.nav'),bar=document.querySelector('.mbar');
    function navH(){return nav?nav.getBoundingClientRect().height:0;}
    function barH(){return bar&&getComputedStyle(bar).display!=='none'?bar.getBoundingClientRect().height:0;}
    function desk(){return innerWidth>=900;}
    function pinEl(){return desk()?hist:hist.querySelector('.hist__pin');}
    function fit(){ // size the pinned block to the free screen (below the sticky header, above the mobile bar)
      var avail=innerHeight-navH()-barH();
      document.documentElement.style.setProperty('--navh',navH()+'px');
      hist.style.setProperty('--pinh',avail+'px');
      var imgs=box.querySelectorAll('img');imgs.forEach(function(i){i.style.height='';});
      if(!desk()){var el=pinEl(),h=el.scrollHeight,ih=imgs[0].getBoundingClientRect().height,over=h-avail+28;
        if(over>0){var nh=Math.max(120,ih-over);imgs.forEach(function(i){i.style.height=nh+'px';});}}
    }
    if(hist&&box){
      hist.classList.add('is-scrub');box.classList.add('is-scrub');
      var now=box.querySelector('.now img'),line=box.querySelector('.wipe-line');
      fit();
      gsap.set(now,{clipPath:'inset(0 0 0 100%)'});gsap.set(line,{left:'100%'});
      var tl=gsap.timeline({scrollTrigger:{trigger:function(){return pinEl();}(),start:function(){return 'center '+(navH()+(innerHeight-navH()-barH())/2)+'px';},end:'+=120%',scrub:.6,pin:true,pinSpacing:true,anticipatePin:1,invalidateOnRefresh:true,onRefreshInit:fit}});
      tl.to(now,{clipPath:'inset(0 0 0 0%)',ease:'none'},0).to(line,{left:'0%',ease:'none'},0);
    }
    // Reveals: transform only (no opacity), and never for anything already within 1.2x the first screen.
    var lim=innerHeight*1.2;
    gsap.utils.toArray('.disp,.ev,.way,.taplist,.hours,.past').forEach(function(el){
      if(hist&&hist.contains(el))return;
      if(el.getBoundingClientRect().top+scrollY<lim)return;
      gsap.from(el,{y:20,duration:.7,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}});
    });
    return function(){if(hist){hist.classList.remove('is-scrub');box.classList.remove('is-scrub');}};
  });
})();

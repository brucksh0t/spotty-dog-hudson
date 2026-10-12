// Today at the Spotty: hours as posted on thespottydog.com/contact ("ish"), America/New_York.
// Preview: ?now=2026-10-24T18:00
(function(){
  var CLOSE={0:18,1:17,2:17,3:20,4:20,5:20,6:20},OPEN=12;
  var N=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  function h12(h){return (h%12||12)+(h>=12?' PM':' AM');}
  function now(){var q=new URLSearchParams(location.search).get('now'),m=q&&q.match(/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)/);
    if(m){return {day:new Date(Date.UTC(+m[1],m[2]-1,+m[3])).getUTCDay(),min:+m[4]*60+ +m[5],ts:Date.UTC(+m[1],m[2]-1,+m[3],+m[4]+4,+m[5])};}
    var p={};new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value;});
    return {day:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(p.weekday),min:(+p.hour%24)*60+ +p.minute,ts:Date.now()};}
  function compute(n){var c=CLOSE[n.day];
    if(n.min>=OPEN*60&&n.min<c*60)return {c:'open',t:'Open now, until about '+h12(c)+'.'};
    if(n.min<OPEN*60)return {c:'later',t:'Opens today at noon, until about '+h12(c)+'.'};
    var d=(n.day+1)%7;return {c:'closed',t:'Closed now (closing times are “ish”). Opens tomorrow, '+N[d]+', at noon.'};}
  var n=now(),r=compute(n);
  var row=document.querySelector('[data-today-hours]');
  if(row){row.querySelector('.dot').className='dot dot--'+r.c;row.querySelector('[data-text]').innerHTML=r.t+' Call to confirm: <a href="tel:+15186716006">518-671-6006</a>';}
  var card=document.querySelector('[data-event-card]');
  if(card&&n.ts>Date.parse(card.getAttribute('data-end'))){card.hidden=true;document.querySelector('[data-none]').hidden=false;
    var ev=document.querySelector('[data-today-event] [data-text]');if(ev)ev.textContent='No upcoming event posted yet. Check the events page.';
    document.querySelector('[data-today-event] .dot').className='dot dot--closed';}
  var tr=document.querySelector('[data-hours] tr[data-day="'+n.day+'"]');if(tr)tr.classList.add('today');
  window.__sd={compute:compute};
})();

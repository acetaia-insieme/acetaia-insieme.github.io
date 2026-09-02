(function(){
  var NAV = {
    'index.html':   {it:'Home', en:'Home', de:'Start', es:'Inicio', fr:'Accueil', pt:'Início'},
    'acetaia.html': {it:"L'acetaia", en:'The acetaia', de:'Die Acetaia', es:'La acetaia', fr:"L'acetaia", pt:'A acetaia'},
    'imparare.html':{it:'Imparare', en:'Learn', de:'Lernen', es:'Aprender', fr:'Apprendre', pt:'Aprender'},
    'album.html':   {it:'Album', en:'Album', de:'Album', es:'Álbum', fr:'Album', pt:'Álbum'},
    'contatti.html':{it:'Contatti', en:'Contact', de:'Kontakt', es:'Contacto', fr:'Contact', pt:'Contato'}
  };
  var LANGS=['it','en','de','es','fr','pt'];
  function setLang(l){
    document.documentElement.setAttribute('data-lang', l);
    document.documentElement.setAttribute('lang', l);
    try{localStorage.setItem('ai-lang', l);}catch(e){}
    document.querySelectorAll('.ai-lang button').forEach(function(b){
      b.classList.toggle('active', b.dataset.lang===l);
    });
    document.querySelectorAll('nav.navbar a.nav-link').forEach(function(a){
      var href=(a.getAttribute('href')||'').split('/').pop().split('#')[0];
      if(NAV[href]){ a.textContent=NAV[href][l]; }
    });
    var bt=document.querySelector('.ai-banner-text'); if(bt) bt.textContent=BANNER[l];
    var bl=document.querySelector('.ai-banner-link'); if(bl) bl.textContent=BLINK[l];
    document.dispatchEvent(new CustomEvent('ai-lang', {detail:l}));
  }
  var BANNER={it:'La nostra acetaia familiare è anche un laboratorio scientifico: decidiamo con i dati, e i dati sono aperti a tutti.',
    en:'Our family acetaia is also a scientific laboratory: we decide with data, and the data are open to everyone.',
    de:'Unsere Familien-Acetaia ist auch ein wissenschaftliches Labor: wir entscheiden mit Daten, und die Daten sind für alle offen.',
    es:'Nuestra acetaia familiar es también un laboratorio científico: decidimos con datos, y los datos están abiertos a todos.',
    fr:'Notre acetaia familiale est aussi un laboratoire scientifique : nous décidons avec les données, et les données sont ouvertes à tous.',
    pt:'Nossa acetaia familiar também é um laboratório científico: decidimos com dados, e os dados são abertos a todos.'};
  var BLINK={it:'Dati aperti: consulta e scarica →',en:'Open data: consult and download →',de:'Offene Daten: ansehen und herunterladen →',es:'Datos abiertos: consulta y descarga →',fr:'Données ouvertes : consulter et télécharger →',pt:'Dados abertos: consulte e baixe →'};
  function banner(){
    if(document.querySelector('.ai-banner')) return;
    var nav=document.getElementById('quarto-header')||document.querySelector('nav.navbar');
    var b=document.createElement('div'); b.className='ai-banner';
    b.innerHTML='<span class="ai-banner-text"></span> <a class="ai-banner-link" href="acetaia.html#dati"></a>';
    if(nav&&nav.parentNode) nav.parentNode.insertBefore(b, nav.nextSibling);
  }
  function build(){
    banner();
    var host=document.querySelector('nav.navbar .navbar-collapse') || document.querySelector('nav.navbar');
    if(!host || document.querySelector('.ai-lang')) return;
    var box=document.createElement('div'); box.className='ai-lang';
    LANGS.forEach(function(l){
      var b=document.createElement('button'); b.type='button'; b.dataset.lang=l; b.textContent=l.toUpperCase();
      b.setAttribute('aria-label', l); b.addEventListener('click', function(){setLang(l);});
      box.appendChild(b);
    });
    var tools=document.querySelector('nav.navbar .quarto-navbar-tools');
    if(tools){ tools.insertBefore(box, tools.firstChild); }
    else host.appendChild(box);
    setLang(document.documentElement.getAttribute('data-lang')||'it');
  }
  function openHash(){
    var h=location.hash; if(!h||h.length<2) return;
    var el=null; try{ el=document.querySelector(h); }catch(e){}
    if(!el) return;
    var pane=el.closest('.tab-pane');
    if(pane && !pane.classList.contains('active')){
      var link=document.querySelector('.panel-tabset .nav-link[data-bs-target="#'+pane.id+'"], .panel-tabset .nav-link[href="#'+pane.id+'"]');
      if(link){ link.click(); }
    }
    setTimeout(function(){ el.scrollIntoView({behavior:'smooth',block:'start'}); }, 350);
  }
  window.addEventListener('hashchange', openHash);
  window.addEventListener('load', function(){ setTimeout(openHash, 200); });
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', build); else build();
  window.aiLang=function(){return document.documentElement.getAttribute('data-lang')||'it';};
})();

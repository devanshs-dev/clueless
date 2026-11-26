window.copyText=function(t){try{if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(t).then(()=>true,()=>false)}catch(e){}var a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();var ok=false;try{ok=document.execCommand("copy")}catch(e){}a.remove();return Promise.resolve(ok)};
const $=i=>document.getElementById(i);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
// ADD NEW GAMES HERE (u = page link; no u = shows as "soon"). Home and Games pages update automatically.
const GAMES=[
{e:"🗣️",c:"#FFC83D",n:"Bolo Mat!",d:"Describe 5 words without saying them. Half desi, half global. Team vs team, live on your phones.",m:"2–10 players · online",u:"bolo-mat.html"},
{e:"🧩",c:"#9BE1F5",n:"Daily Clue",d:"One mystery word a day. Five clues, five tries. Keep your streak alive.",m:"Solo · 2 minutes",u:"daily.html"},
{e:"✏️",c:"#FFB3D1",n:"Desi Draw",d:"Draw it, your team guesses it. Coming soon."},
{e:"🙋",c:"#CBBBFF",n:"Who Am I?",d:"A secret name on your forehead, yes or no questions only. Coming soon."}];
const NAV=[["index","Home"],["games","Games"],["how-to-play","How to play"],["hall","Hall of fame"],["suggest","Suggest"]];
const here=(location.pathname.split("/").pop()||"index").replace(".html","")||"index";
if($("nav")){$("nav").innerHTML=`<header class="nav" id="hd"><a class="logo" href="index.html">Clueless</a><button class="mbtn" id="mb" aria-label="Menu" aria-expanded="false" aria-controls="menu"><span></span><span></span></button><nav id="menu">${NAV.map(n=>`<a href="${n[0]}.html" class="${here===n[0]?"on":""}">${n[1]}</a>`).join("")}</nav></header>`;
 const hd=$("hd"),mb=$("mb"),set=o=>{hd.classList.toggle("open",o);mb.setAttribute("aria-expanded",o)};
 mb.onclick=()=>set(!hd.classList.contains("open"));
 document.addEventListener("keydown",e=>{if(e.key==="Escape")set(false)});
 document.addEventListener("click",e=>{if(!hd.contains(e.target))set(false)});
 $("menu").onclick=e=>{if(e.target.closest("a"))set(false)}}
if($("ft"))$("ft").innerHTML=`<div class="ft"><span class="brand">Clueless</span><a href="how-to-play.html">How to play</a><a href="about.html">About</a><a href="suggest.html">Suggest a word or game</a><span class="copy">Made with chai in India · Free forever · No sign-up</span></div>`;
if($("games")){$("games").innerHTML=GAMES.map((g,i)=>{const num=String(i+1).padStart(2,"0"),b=`<i class="art">${g.e||""}</i><span class="em">${num}</span><b>${esc(g.n)}</b><span>${esc(g.d)}</span><i class="tag">${g.u?esc(g.m):"soon"}</i>`;return g.u?`<a class="game" style="--gc:${g.c||"#fff"}" href="${g.u}">${b}</a>`:`<div class="game soon" style="--gc:${g.c||"#fff"}">${b}</div>`}).join("");
 document.querySelectorAll(".game").forEach(g=>g.addEventListener("pointermove",e=>{const r=g.getBoundingClientRect();g.style.setProperty("--mx",e.clientX-r.left+"px");g.style.setProperty("--my",e.clientY-r.top+"px")}))}
if("IntersectionObserver" in window){document.documentElement.classList.add("js");
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const el=e.target;io.unobserve(el);el.classList.add("in");setTimeout(()=>el.classList.remove("rv"),1400)}}),{threshold:.1});
 document.querySelectorAll(".sub,.sec,.card,.game,.split,.btns,.marq,.hero,.h1b,.eye,.stack").forEach(el=>{el.style.transitionDelay=Math.min([...el.parentNode.children].indexOf(el),5)*90+"ms";el.classList.add("rv");io.observe(el)})}

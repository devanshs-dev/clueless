window.copyText=function(t){try{if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(t).then(()=>true,()=>false)}catch(e){}var a=document.createElement("textarea");a.value=t;a.style.cssText="position:fixed;opacity:0";document.body.appendChild(a);a.select();var ok=false;try{ok=document.execCommand("copy")}catch(e){}a.remove();return Promise.resolve(ok)};
const $=i=>document.getElementById(i);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
// ADD NEW GAMES HERE (u = page link; no u = shows as "soon"). Home and Games pages update automatically.
const GAMES=[
{e:"🗣️",c:"#FFC83D",n:"Bolo Mat!",d:"Describe 5 words without saying them. Half desi, half global. Team vs team, live on your phones.",m:"2–10 players · online",u:"bolo-mat.html"},
{e:"🧩",c:"#9BE1F5",n:"Daily Clue",d:"One mystery word a day. Five clues, five tries. Keep your streak alive.",m:"Solo · 2 minutes",u:"daily.html"},
{e:"🚩",c:"#FF8FA3",n:"Red Flag?",d:"Swipe dating, friend and work situations. See how India voted and find out what kind of flag you are.",m:"Solo or group · 3 minutes",u:"red-flag.html"},
{e:"🔥",c:"#FF9E6B",n:"After Dark",d:"A steamy truth-or-dare for couples. Four heat levels, one phone. 18+ only.",m:"2 players · 18+",u:"after-dark.html"},
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

document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||a.target||e.metaKey||e.ctrlKey||a.origin!==location.origin||a.getAttribute("href").startsWith("#")||matchMedia("(prefers-reduced-motion:reduce)").matches)return;e.preventDefault();document.body.classList.add("leave");setTimeout(()=>location.href=a.href,220)});
window.addEventListener("pageshow",()=>document.body.classList.remove("leave"));
document.querySelectorAll(".game:not(.soon)").forEach(g=>{g.addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;const r=g.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;g.style.transform=`perspective(700px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translate(-3px,-3px)`});g.addEventListener("pointerleave",()=>g.style.transform="")});
window.confetti=window.confetti||function(){const c=["#FF6B1A","#FFC83D","#12A4D9","#FF5FA2","#12B76A","#7B5CFF"];for(let i=0;i<70;i++){const d=document.createElement("i");d.style.cssText=`position:fixed;top:-12px;left:${Math.random()*100}vw;width:9px;height:14px;background:${c[i%6]};z-index:99;pointer-events:none;border-radius:2px;transition:transform ${1.6+Math.random()*1.4}s cubic-bezier(.2,.6,.4,1),opacity 3s`;document.body.appendChild(d);requestAnimationFrame(()=>{d.style.transform=`translate(${Math.random()*160-80}px,${innerHeight+40}px) rotate(${Math.random()*900}deg)`;d.style.opacity=".9"});setTimeout(()=>d.remove(),3200)}};
document.addEventListener("pointerdown",e=>{const b=e.target.closest(".btn,.game:not(.soon),.pk,button");if(!b||matchMedia("(prefers-reduced-motion:reduce)").matches)return;const c=["#FF6B1A","#FFC83D","#12A4D9","#FF5FA2","#7B5CFF"];for(let i=0;i<8;i++){const d=document.createElement("i");d.className="tapfx";const a=i/8*6.283+Math.random()*.5,r=26+Math.random()*24;d.style.cssText=`left:${e.clientX-4}px;top:${e.clientY-4}px;background:${c[i%5]};--x:${Math.cos(a)*r}px;--y:${Math.sin(a)*r}px`;document.body.appendChild(d);setTimeout(()=>d.remove(),600)}if(navigator.vibrate)navigator.vibrate(6)});

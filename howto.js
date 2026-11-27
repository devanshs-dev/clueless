// Story-style "How to play" player. Use: howto("say") / data-howto="say" on any button.
(()=>{
const css=`
.hx{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;background:rgba(18,12,36,.72);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);animation:hxIn .3s ease both;font-family:Manrope,system-ui,sans-serif}
@keyframes hxIn{from{opacity:0}}
.hx-card{position:relative;width:min(420px,94vw);height:min(760px,92vh);border-radius:32px;border:3px solid #1B1633;box-shadow:8px 8px 0 #1B1633;background:var(--hb,#FFC83D);overflow:hidden;display:flex;flex-direction:column;animation:hxPop .45s cubic-bezier(.3,1.5,.5,1) both;user-select:none;-webkit-user-select:none;transition:background .5s}
@keyframes hxPop{from{transform:scale(.85) translateY(30px);opacity:0}}
.hx-bars{display:flex;gap:5px;padding:16px 16px 0}
.hx-bars i{flex:1;height:5px;border-radius:3px;background:rgba(27,22,51,.2);overflow:hidden}
.hx-bars i b{display:block;height:100%;width:0;background:#1B1633}
.hx-bars i.done b{width:100%}
.hx-bars i.on b{animation:hxBar var(--dur) linear forwards}
.hx-card.paused .hx-bars i.on b{animation-play-state:paused}
@keyframes hxBar{to{width:100%}}
.hx-top{display:flex;justify-content:space-between;align-items:center;padding:12px 18px 0;font-weight:800;font-size:14px;color:#1B1633}
.hx-top button{background:#fff;border:2px solid #1B1633;border-radius:50%;width:36px;height:36px;font-size:18px;font-weight:800;cursor:pointer;color:#1B1633}
.hx-stage{flex:1;display:grid;place-items:center;padding:10px 22px;position:relative}
.hx-txt{padding:0 26px 30px;color:#1B1633}
.hx-step{font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;opacity:.65}
.hx-txt h3{font:800 clamp(28px,8vw,36px)/1.02 Syne,Manrope,sans-serif;letter-spacing:-1px;margin:6px 0 8px}
.hx-txt p{font-size:16px;line-height:1.45;margin:0;opacity:.85}
.hx-tap{position:absolute;top:70px;bottom:0;width:35%;z-index:2}
.hx-tap.l{left:0}.hx-tap.r{right:0;width:65%}
.hx-cta{display:block;margin:0 26px 26px;padding:17px;border-radius:18px;border:3px solid #1B1633;background:#1B1633;color:#fff;font:800 18px Manrope,sans-serif;text-align:center;text-decoration:none;box-shadow:4px 4px 0 #fff;position:relative;z-index:3;animation:hxPop .5s .2s cubic-bezier(.3,1.5,.5,1) both}
.hx-again{display:block;text-align:center;margin:-14px 0 22px;font-weight:800;color:#1B1633;position:relative;z-index:3;background:none;border:0;cursor:pointer;font-size:14px;text-decoration:underline}
.hx-hint{position:absolute;right:20px;bottom:14px;font-size:12px;font-weight:700;color:#1B1633;opacity:.55}
/* visual primitives */
.hx-v{width:100%;max-width:320px;display:grid;gap:10px;justify-items:center}
.pp{animation:ppIn .5s cubic-bezier(.3,1.6,.5,1) both;animation-delay:var(--d,0s)}
@keyframes ppIn{from{opacity:0;transform:scale(.6) translateY(16px)}}
.hx-phone{width:220px;background:#fff;border:3px solid #1B1633;border-radius:28px;box-shadow:5px 5px 0 #1B1633;padding:16px;display:grid;gap:8px}
.hx-chip{background:#fff;border:2.5px solid #1B1633;border-radius:14px;padding:9px 14px;font:800 18px Syne,Manrope,sans-serif;color:#1B1633;box-shadow:3px 3px 0 #1B1633;text-align:center}
.hx-row{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap}
.hx-av{width:54px;height:54px;border-radius:50%;border:3px solid #1B1633;display:grid;place-items:center;font:800 20px Syne,sans-serif;color:#1B1633;box-shadow:3px 3px 0 #1B1633}
.hx-vs{font:800 28px Syne,sans-serif;color:#1B1633}
.hx-bub{position:relative;background:#fff;border:3px solid #1B1633;border-radius:22px;padding:14px 16px;font-weight:700;font-size:16px;color:#1B1633;box-shadow:4px 4px 0 #1B1633;max-width:280px}
.hx-no{position:relative;display:inline-block}
.hx-no::after{content:"";position:absolute;left:-4px;right:-4px;top:50%;height:4px;background:#E5365B;border-radius:2px;transform:scaleX(0);transform-origin:left;animation:strike .4s .9s forwards}
@keyframes strike{to{transform:scaleX(1)}}
.hx-badge{display:inline-block;background:#E5365B;color:#fff;border:2.5px solid #1B1633;border-radius:99px;padding:5px 12px;font-weight:800;font-size:14px}
.hx-badge.ok{background:#12B76A}
.hx-type{display:inline-block;overflow:hidden;white-space:nowrap;border-right:3px solid #1B1633;width:0;animation:typ 1s steps(var(--n,4)) .4s forwards,car .6s step-end infinite}
@keyframes typ{to{width:calc(var(--n,4) * 1ch + 2px)}}
@keyframes car{50%{border-color:transparent}}
.hx-input{font:800 22px ui-monospace,Menlo,monospace;background:#FFF9EC;border:3px solid #1B1633;border-radius:14px;padding:10px 14px;width:220px;color:#1B1633}
.hx-ring{width:130px;height:130px;border-radius:50%;background:conic-gradient(#1B1633 var(--p,100%),rgba(27,22,51,.15) 0);display:grid;place-items:center;animation:ring 4s linear forwards}
@property --p{syntax:"<percentage>";inherits:false;initial-value:100%}
@keyframes ring{to{--p:0%}}
.hx-ring b{width:100px;height:100px;border-radius:50%;background:#fff;display:grid;place-items:center;font:800 40px Syne,sans-serif;color:#1B1633;border:3px solid #1B1633}
.hx-card3{width:230px;height:150px;background:#fff;border:3px solid #1B1633;border-radius:22px;box-shadow:5px 5px 0 #1B1633;display:grid;place-items:center;text-align:center;padding:16px;font:800 19px/1.2 Syne,Manrope,sans-serif;color:#1B1633}
.sw-l{animation:swl 2.6s .6s ease-in-out infinite}
@keyframes swl{0%,15%{transform:none}45%,60%{transform:translateX(-90px) rotate(-14deg)}90%,100%{transform:none}}
.sw-r{animation:swr 2.6s .6s ease-in-out infinite}
@keyframes swr{0%,15%{transform:none}45%,60%{transform:translateX(90px) rotate(14deg)}90%,100%{transform:none}}
.hx-split{display:flex;width:260px;height:48px;border:3px solid #1B1633;border-radius:14px;overflow:hidden;font-weight:800}
.hx-split span{display:grid;place-items:center;width:50%;transition:width 1s}
.hx-split .r{background:#E5365B;color:#fff;animation:sp1 1.2s .5s cubic-bezier(.2,.9,.2,1) both}
.hx-split .g{background:#3DDC97;color:#1B1633;animation:sp2 1.2s .5s cubic-bezier(.2,.9,.2,1) both}
@keyframes sp1{from{width:50%}to{width:74%}}@keyframes sp2{from{width:50%}to{width:26%}}
.hx-lock{font-size:44px;display:inline-block;animation:unl 1.6s .6s infinite}
@keyframes unl{0%,40%{transform:none}50%{transform:rotate(-14deg) scale(1.15)}60%,100%{transform:none}}
.hx-flip{width:200px;height:250px;perspective:900px}
.hx-flip>div{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:flp 3s .6s ease-in-out infinite}
@keyframes flp{0%,20%{transform:none}40%,85%{transform:rotateY(180deg)}100%{transform:rotateY(360deg)}}
.hx-flip .f{position:absolute;inset:0;border-radius:22px;border:3px solid #1B1633;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:grid;place-items:center;text-align:center;padding:18px;font:700 18px/1.3 Georgia,serif}
.hx-flip .f1{background:linear-gradient(160deg,#3A1030,#160A1F);color:#FF8A3D;font-size:54px}
.hx-flip .f2{background:#24112B;color:#F7EDF4;transform:rotateY(180deg)}
.hx-heat{display:flex;gap:6px}.hx-heat i{width:44px;height:12px;border-radius:6px;border:2px solid #1B1633;background:#fff;animation:ht .4s both}
.hx-heat i:nth-child(1){animation-delay:.4s}.hx-heat i:nth-child(2){animation-delay:.9s}.hx-heat i:nth-child(3){animation-delay:1.4s}.hx-heat i:nth-child(4){animation-delay:1.9s}
@keyframes ht{to{background:#FF3D7F}}
.hx-big{font-size:84px;line-height:1;animation:bob2 2s ease-in-out infinite}
@keyframes bob2{50%{transform:translateY(-10px) rotate(-6deg)}}
.hx-chk{font-size:12px;font-weight:800;color:#1B1633;opacity:.7}
@media (prefers-reduced-motion:reduce){.hx *{animation-duration:.01s!important;animation-iteration-count:1!important}}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const av=(t,c,d)=>`<div class="hx-av pp" style="background:${c};--d:${d}s">${t}</div>`;
const G={
say:{n:"Say Less",c:["#FFC83D","#9BE1F5","#FFB3D1","#CBBBFF","#3DDC97"],u:"bolo-mat.html",cta:"Make a room →",s:[
 ["Split into 2 teams","Grab your gang. Team Chai vs Team Samosa. 2 people is fine too (pick Duel).",`<div class="hx-v"><div class="hx-row">${av("A","#fff",.1)}${av("R","#fff",.25)}</div><div class="hx-vs pp" style="--d:.5s">VS</div><div class="hx-row">${av("K","#FF8FA3",.7)}${av("S","#FF8FA3",.85)}</div></div>`],
 ["One of you gets 5 secret words","Only the describer sees them. Everyone else, eyes off the screen 👀",`<div class="hx-phone">${["Chai","Godzilla","Jugaad","Netflix","Pani Puri"].map((w,i)=>`<div class="hx-chip pp" style="--d:${.2+i*.25}s">${w}</div>`).join("")}</div>`],
 ["Describe it. Don’t say it.","Act, explain, give hints. Just never say the word itself (or any part of it).",`<div class="hx-v"><div class="hx-bub pp">“Hot drink. Every aunty offers it. Adrak wali…”</div><div class="pp" style="--d:.5s"><span class="hx-chip hx-no">Chai</span></div><span class="hx-badge pp" style="--d:1.1s">can’t say this</span></div>`],
 ["Your team types guesses","Right guess = points. Spelled perfectly = bonus.",`<div class="hx-v"><div class="hx-input"><span class="hx-type" style="--n:4">chai</span></div><span class="hx-badge ok pp" style="--d:1.6s">✓ +2 perfect</span></div>`],
 ["40 seconds. Go go go.","Get as many as you can. Teams take turns. First to 40 wins 🏆",`<div class="hx-ring"><b>40</b></div>`]]},
clue:{n:"Daily Clue",c:["#9BE1F5","#FFC83D","#CBBBFF","#3DDC97"],u:"daily.html",cta:"Play today’s word →",s:[
 ["One secret word a day","Same word for everyone in India. New one at midnight.",`<div class="hx-v"><div class="hx-big">🔒</div><div class="hx-chip pp" style="--d:.4s">? ? ? ? ? ?</div></div>`],
 ["Read clue 1. Take a guess.","Clues start vague. Trust your gut.",`<div class="hx-v"><div class="hx-bub pp">Clue 1: “Slang for hopeful fantasy”</div><div class="hx-input pp" style="--d:.6s"><span class="hx-type" style="--n:6">dreamy</span></div></div>`],
 ["Wrong? Next clue unlocks","Every miss gives you a bigger hint. 5 tries max.",`<div class="hx-v"><span class="hx-badge pp">✗ not it</span><span class="hx-lock">🔓</span><div class="hx-bub pp" style="--d:1.2s">Clue 2: “Short for a longer word”</div></div>`],
 ["Fewer clues = bigger flex","Come back daily to keep your streak 🔥",`<div class="hx-v"><div class="hx-big">🔥</div><div class="hx-chip pp" style="--d:.4s">7 day streak</div></div>`]]},
flag:{n:"Red Flag?",c:["#FF8FA3","#3DDC97","#FFC83D","#CBBBFF"],u:"red-flag.html",cta:"Start swiping →",s:[
 ["You get a situation","Dating, friends, work. Real stuff that happens.",`<div class="hx-card3 pp">Replies “k” after you sent a paragraph</div>`],
 ["Swipe left = 🚩","If it’s a red flag, throw it left.",`<div class="hx-card3 sw-l">Still follows their ex on Insta</div>`],
 ["Swipe right = 💚","Green flag? Send it right.",`<div class="hx-card3 sw-r">Remembers your chai order</div>`],
 ["See how India voted","Are you with the crowd or a hot take machine?",`<div class="hx-v"><div class="hx-split"><span class="r">🚩 74%</span><span class="g">💚 26%</span></div></div>`],
 ["Get your flag type","12 cards later, find out what kind of flag YOU are. Send it to the gc.",`<div class="hx-v"><div class="hx-big">🧐</div><div class="hx-chip pp" style="--d:.3s">The Picky One</div></div>`]]},
dark:{n:"After Dark",c:["#FF8FA3","#FF9E6B","#FF5FA2","#CBBBFF"],u:"after-dark.html",cta:"Enter After Dark →",s:[
 ["Just you two, one phone","Put your names in. Phone stays between you.",`<div class="hx-v"><div class="hx-row">${av("You","#FFB3D1",.1)}<div class="hx-vs pp" style="--d:.3s">❤</div>${av("Bae","#FFB3D1",.5)}</div></div>`],
 ["Pick your heat","Sweet → Flirty → Spicy → After Dark. Start wherever you’re comfy.",`<div class="hx-v"><div class="hx-heat"><i></i><i></i><i></i><i></i></div><div class="hx-row"><span class="hx-chip pp" style="--d:.3s">🌸</span><span class="hx-chip pp" style="--d:.8s">😏</span><span class="hx-chip pp" style="--d:1.3s">🌶️</span><span class="hx-chip pp" style="--d:1.8s">🖤</span></div></div>`],
 ["Truth or dare? Flip it.","Answer honestly or do the dare. Skipping costs a kiss 💋",`<div class="hx-flip"><div><div class="f f1">🔥</div><div class="f f2">Whisper a compliment in their ear</div></div></div>`],
 ["It heats up by itself","Every 6 cards, the level goes up. Either of you can say stop anytime.",`<div class="hx-v"><div class="hx-big">🌡️</div><span class="hx-chk">18+ only · consent first, always</span></div>`]]}};
let cur=null;
window.howto=function(k){const g=G[k];if(!g)return;close();let i=0,t=null;const D=4600;
 const el=document.createElement("div");el.className="hx";el.setAttribute("role","dialog");el.setAttribute("aria-label","How to play "+g.n);
 el.innerHTML=`<div class="hx-card"><div class="hx-bars">${g.s.map(()=>"<i><b></b></i>").join("")}<i><b></b></i></div><div class="hx-top"><span>How to play · ${g.n}</span><button aria-label="Close">✕</button></div><div class="hx-body" style="display:contents"></div><div class="hx-tap l"></div><div class="hx-tap r"></div></div>`;
 document.body.appendChild(el);cur=el;document.documentElement.style.overflow="hidden";
 const card=el.querySelector(".hx-card"),body=el.querySelector(".hx-body"),bars=[...el.querySelectorAll(".hx-bars i")],N=g.s.length;
 const show=n=>{i=Math.max(0,Math.min(N,n));clearTimeout(t);bars.forEach((b,j)=>{b.className=j<i?"done":j===i?"on":"";b.style.setProperty("--dur",D+"ms")});card.style.setProperty("--hb",g.c[i%g.c.length]);
  if(i<N){const s=g.s[i];body.innerHTML=`<div class="hx-stage">${s[2]}</div><div class="hx-txt"><div class="hx-step">Step ${i+1} of ${N}</div><h3>${s[0]}</h3><p>${s[1]}</p></div><span class="hx-hint">tap to skip →</span>`;t=setTimeout(()=>show(i+1),D)}
  else{bars[N].className="done";body.innerHTML=`<div class="hx-stage"><div class="hx-v"><div class="hx-big">🎉</div></div></div><div class="hx-txt"><div class="hx-step">That’s it fr</div><h3>You’re ready.</h3><p>Seriously, that’s the whole game. Go play.</p></div><a class="hx-cta" href="${g.u}">${g.cta}</a><button class="hx-again">Watch again</button>`;body.querySelector(".hx-again").onclick=e=>{e.stopPropagation();show(0)}}
  if(navigator.vibrate)navigator.vibrate(5)};
 let held=0,long=false;el.querySelector(".hx-tap.r").onclick=()=>{if(!long)show(i+1)};el.querySelector(".hx-tap.l").onclick=()=>{if(!long)show(i-1)};
 el.querySelector(".hx-top button").onclick=close;el.onclick=e=>{if(e.target===el)close()};
 card.addEventListener("pointerdown",()=>{held=Date.now();long=false;card.classList.add("paused");clearTimeout(t)});
 card.addEventListener("pointerup",()=>{card.classList.remove("paused");if(Date.now()-held>350){long=true;if(i<N)show(i)}});
 el._k=e=>{if(e.key==="Escape")close();if(e.key==="ArrowRight")show(i+1);if(e.key==="ArrowLeft")show(i-1)};document.addEventListener("keydown",el._k);
 show(0)};
function close(){if(!cur)return;document.removeEventListener("keydown",cur._k);cur.remove();cur=null;document.documentElement.style.overflow=""}
document.addEventListener("click",e=>{const b=e.target.closest("[data-howto]");if(!b)return;e.preventDefault();e.stopPropagation();howto(b.dataset.howto)},true);
})();

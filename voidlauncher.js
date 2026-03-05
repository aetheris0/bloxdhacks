javascript:(function(){

if(window.VoidLauncherLoaded){document.getElementById("voidLauncher").style.display="block";return;}
window.VoidLauncherLoaded=true;

/* ---------- SCRIPT LOADER ---------- */

function loadVoidScript(url){
console.log("[Void Launcher] Loading:",url);
fetch(url)
.then(r=>r.text())
.then(code=>{
code=code.replace(/// ==UserScript==[\s\S]*?// ==/UserScript==/g,"");
const s=document.createElement("script");
s.textContent=code;
document.documentElement.appendChild(s);
s.remove();
console.log("[Void Launcher] Loaded");
})
.catch(e=>alert("Void Launcher failed to load script"));
}

/* ---------- UI ---------- */

const launcher=document.createElement("div");
launcher.id="voidLauncher";
launcher.style=`position:fixed;
top:120px;
left:120px;
width:520px;
height:360px;
background:rgba(10,10,20,.75);
backdrop-filter:blur(12px);
border:2px solid #7a2bff;
border-radius:14px;
box-shadow:0 0 30px #7a2bff;
color:white;
font-family:Segoe UI;
z-index:999999;
overflow:hidden;`;

document.body.appendChild(launcher);

/* ---------- PARTICLE BACKGROUND ---------- */

const canvas=document.createElement("canvas");
canvas.style="position:absolute;inset:0;z-index:-1";
launcher.appendChild(canvas);

const ctx=canvas.getContext("2d");

function resize(){
canvas.width=launcher.clientWidth;
canvas.height=launcher.clientHeight;
}
resize();
window.addEventListener("resize",resize);

let particles=[];
for(let i=0;i<60;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-.5)*.4,
vy:(Math.random()-.5)*.4,
s:Math.random()*2+1
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.x+=p.vx;
p.y+=p.vy;

if(p.x<0||p.x>canvas.width)p.vx*=-1;
if(p.y<0||p.y>canvas.height)p.vy*=-1;

ctx.fillStyle="#9a5cff";
ctx.beginPath();
ctx.arc(p.x,p.y,p.s,0,Math.PI*2);
ctx.fill();
});

requestAnimationFrame(animate);
}
animate();

/* ---------- HEADER ---------- */

const header=document.createElement("div");
header.textContent="Void Launcher";
header.style=`padding:10px;
font-weight:bold;
background:linear-gradient(90deg,#5c22ff,#9a5cff);
cursor:move;`;
launcher.appendChild(header);

/* ---------- DRAG ---------- */

let dragging=false,dx=0,dy=0;

header.onmousedown=e=>{
dragging=true;
dx=e.clientX-launcher.offsetLeft;
dy=e.clientY-launcher.offsetTop;
};

document.onmousemove=e=>{
if(dragging){
launcher.style.left=e.clientX-dx+"px";
launcher.style.top=e.clientY-dy+"px";
}
};

document.onmouseup=()=>dragging=false;

/* ---------- TABS ---------- */

const tabs=document.createElement("div");
tabs.style="display:flex;background:#111";
launcher.appendChild(tabs);

const content=document.createElement("div");
content.style="padding:15px";
launcher.appendChild(content);

function makeTab(name){
const t=document.createElement("button");
t.textContent=name;
t.style="flex:1;background:#111;border:none;color:white;padding:8px;cursor:pointer";
tabs.appendChild(t);
return t;
}

const clientsTab=makeTab("Clients");
const toolsTab=makeTab("Tools");

function clear(){content.innerHTML=""}

/* ---------- BUTTON CREATOR ---------- */

function clientButton(name,script){
const b=document.createElement("button");
b.textContent=name;
b.style=`display:block;
width:100%;
margin:6px 0;
padding:10px;
background:#1a1a2e;
border:1px solid #7a2bff;
color:white;
border-radius:6px;
cursor:pointer;`;

b.onclick=()=>loadVoidScript(script);

content.appendChild(b);
}

/* ---------- CLIENT TAB ---------- */

clientsTab.onclick=()=>{
clear();

clientButton("Void V2 Bloxd",
"https://raw.githubusercontent.com/aetheris0/bloxdhacks/main/void.js");

clientButton("Voidium Yohoho",
"https://raw.githubusercontent.com/aetheris0/bloxdhacks/main/voidium.js");

clientButton("Void v3 Miniblox",
"https://raw.githubusercontent.com/aetheris0/bloxdhacks/main/minidih.js");

clientButton("VoidPoxel Pro",
"https://raw.githubusercontent.com/aetheris0/bloxdhacks/main/voidpoxel.js");
};

/* ---------- TOOLS TAB ---------- */

toolsTab.onclick=()=>{
clear();

clientButton("Nitrotype Autotyper",
"https://raw.githubusercontent.com/aetheris0/bloxdhacks/main/nitro.js");

const bot=document.createElement("button");
bot.textContent="VoidBot (Monkeytype)";
bot.style=`display:block;
width:100%;
margin:6px 0;
padding:10px;
background:#1a1a2e;
border:1px solid #7a2bff;
color:white;
border-radius:6px;
cursor:pointer;`;

bot.onclick=()=>setTimeout(()=>{
loadVoidScript("https://raw.githubusercontent.com/aetheris0/bloxdhacks/main/voidbot.js");
},500);

content.appendChild(bot);
};

/* default tab */

clientsTab.click();

/* ---------- RIGHT SHIFT TOGGLE ---------- */

document.addEventListener("keydown",e=>{
if(e.code==="ShiftRight"){
launcher.style.display=
launcher.style.display==="none"?"block":"none";
}
});

})();

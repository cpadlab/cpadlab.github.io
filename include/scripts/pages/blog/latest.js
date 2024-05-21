/* <!-- 
#   ___  ____  __   
#  / __)(  _ \(  )  
# ( (__  )___/ )(__  (code by cpadlab)
#  \___)(__)  (____)

# Author >> Carlos Padilla
# Proyect >> CPWvFeb24 (Carlos Padilla Web 2024 May Update)
# Download Code >> https://github.com/cpadlab/cpadlab.github.io
# Follow me >> https://twitter.com/cpadlab
--> */

export function createLatest(e){let t=document.createElement("div");t.className="bbrc-blog-content";let l=document.createElement("div");l.className="bbrcb-right";let n=document.createElement("span");n.id="bbrcb-right-date",n.textContent=e.querySelector("date").textContent,l.appendChild(n);let r=document.createElement("h1");r.id="bcb-right-h1-"+e.querySelector("code").textContent,r.textContent=e.querySelector("title").textContent,l.appendChild(r);let a=document.createElement("h2");a.textContent=e.querySelector("desc").textContent,l.appendChild(a);let c=document.createElement("div");function b(e,t){let l=document.createElement("div");l.className="bbrcb-right-label";let n=document.createElement("div");n.className=e;let r=document.createElement("span");return r.textContent=t,l.appendChild(n),l.appendChild(r),l}c.className="bbrcb-right-labels",c.appendChild(b("bbrcb-right-label-color",e.querySelector("type").textContent)),c.appendChild(b("bbrcb-right-label-color-2",e.querySelector("label_1").textContent)),c.appendChild(b("bbrcb-right-label-color-2",e.querySelector("label_2").textContent)),l.appendChild(c),t.appendChild(l);let o=document.querySelector(".bbr-blog");o&&(o.appendChild(t),o.addEventListener("click",function(){window.open(e.querySelector("link").textContent,"_blank")}))}
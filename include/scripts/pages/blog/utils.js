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

export function findYear(e){return new Date(e.querySelector("date").textContent).getFullYear()}export function findMonth(e){let t=new Date(e.querySelector("date").textContent).getMonth();return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t]}export function findBlogYearContainer(e){let t=document.getElementById("blog").querySelectorAll("div.blog-year");Array.from(t).find(t=>t.getAttribute("data-year")===String(e))||YearContainer(e)}function YearContainer(e){let t=document.createElement("div");t.className="blog-year",t.id="blog-year",t.setAttribute("data-year",e),t.setAttribute("data-toggle","show");let a=document.createElement("div");a.className="by-separator",a.addEventListener("click",function(){let e=t.querySelectorAll(".by-host-posts");"show"===t.getAttribute("data-toggle")?(e.forEach(e=>{e.style.display="none"}),t.setAttribute("data-toggle","hidden")):(e.forEach(e=>{e.style.display="block"}),t.setAttribute("data-toggle","show"))});let n=document.createElement("div");n.className="by-line";let l=document.createElement("button");l.id="by-button";let r=document.createElement("span");r.textContent=e,l.appendChild(r),a.appendChild(n),a.appendChild(l);let o=document.createElement("div");o.classList.add("by-host-posts"),t.appendChild(a),t.appendChild(o);let d=document.getElementById("blog");d.appendChild(t)}
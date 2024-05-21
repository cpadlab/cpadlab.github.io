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

import{findYear as e,findBlogYearContainer as t}from"./utils.js";import{createCookie as n}from"../../modules/cookies.js";function createPost(e,t){var n=document.createElement("div");n.classList.add("byhp-post"),n.setAttribute("data-type",t.querySelector("type").textContent),n.addEventListener("click",function(){window.open(t.querySelector("link").textContent,"_blank")});var l=document.createElement("div");l.classList.add("byhp-post-content");var a=document.createElement("span");a.id="byhp-post-date",a.innerText=t.querySelector("date").textContent;var o=document.createElement("h1");o.innerText=t.querySelector("title").textContent;var r=document.createElement("h2");r.innerText=t.querySelector("desc").textContent;var p=document.createElement("div");function d(e,t){let n=document.createElement("div");n.className="byhp-post-label";let l=document.createElement("div");l.className=e;let a=document.createElement("span");return a.textContent=t,n.appendChild(l),n.appendChild(a),n}p.classList.add("byhp-post-labels"),p.appendChild(d("byhp-post-label-color",t.querySelector("type").textContent)),p.appendChild(d("byhp-post-label-color-2",t.querySelector("label_1").textContent)),p.appendChild(d("byhp-post-label-color-2",t.querySelector("label_2").textContent)),n.appendChild(l),l.appendChild(a),l.appendChild(o),l.appendChild(r),l.appendChild(p),e.appendChild(n)}function updateSelect(){var e=document.querySelectorAll(".byhp-post"),t=document.getElementById("bb-type");e.forEach(function(e){var n=e.getAttribute("data-type");if(!t.querySelector('option[value="'+n+'"]')){var l=document.createElement("option");l.value=n,l.textContent=n,t.appendChild(l)}})}export function createPosts(n,l){for(var a=l;a>l-l;a--)for(var o=0;o<n.length;o++)if(parseInt(parseInt(n[o].querySelector("code").textContent))==a){let r=e(n[o]);t(r),createPost(document.querySelector('section#blog div.blog-year[data-year="'+r+'"] div.by-host-posts'),n[o]);break}updateSelect()}
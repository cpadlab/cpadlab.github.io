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

import{getCookie as t}from"../../modules/cookies.js";import{toggleToDark as e,toggleToLight as l}from"../../modules/theme.js";import{bootNavbar as o}from"../../common/navbar.js";import{createLatest as r}from"./latest.js";import{createPosts as a}from"./blog.js";function bootBlog(){var c;$("header").load("/include/templates/common/navbar-2.html",function(){o()}),"dark"===t("theme")?e():l(),$(".pt-type-text").each(function(){var t=$(this).attr("title")+";"+$(this).text();$(this).empty().attr("title","").teletype({text:$(t.split(";"),$.trim),typeDelay:10,backDelay:20,blinkSpeed:1e3,cursor:"▋",delay:3e3,preserve:!1,prefix:">_ ",loop:0,humanise:!0,smoothBlink:!0,callbackNext:null,callbackType:null,callbackFinished:null})}),fetch("/include/content/blog.xml").then(t=>t.text()).then(t=>{let e=new DOMParser,l=e.parseFromString(t,"text/xml"),o=l.querySelectorAll("post");for(var c=parseInt(l.getElementsByTagName("blog")[0].getAttribute("total")),s=c;s>c-1;s--)for(var n=0;n<o.length;n++)if(parseInt(parseInt(o[n].querySelector("code").textContent))==s){r(o[n]);break}a(o,c)}).catch(t=>console.error("Error:",t)),document.getElementById("bb-type").addEventListener("change",function(){var t=document.getElementById("bb-type"),e=document.querySelectorAll(".byhp-post");"All"!=t.value?(document.querySelectorAll(".by-host-posts").forEach(t=>{t.style.display="block"}),document.querySelectorAll(".blog-year").forEach(t=>{t.setAttribute("data-toggle","show")}),e.forEach(function(t){$(t).css({display:"block"})}),e.forEach(function(e){e.getAttribute("data-type")!=t.value&&$(e).css({display:"none"})})):(document.querySelectorAll(".by-host-posts").forEach(t=>{t.style.display="block"}),document.querySelectorAll(".blog-year").forEach(t=>{t.setAttribute("data-toggle","show")}),e.forEach(function(t){$(t).css({display:"block"})}))})}$(document).ready(function(){bootBlog()});
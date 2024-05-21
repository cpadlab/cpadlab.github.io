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

import{getCookie as e}from"../../modules/cookies.js";import{toggleToDark as t,toggleToLight as o}from"../../modules/theme.js";import{bootNavbar as a}from"../../common/navbar.js";import{sectionAbout as l}from"./about.js";import{sectionBlog as r}from"./blog.js";export function bootIndex(){var i;$("header").load("/include/templates/common/navbar.html",function(){a()}),"dark"===e("theme")?t():o(),$("#about").load("/include/templates/pages/index/about.html",function(){l(),$("#about").scrolla({once:!0}),$("#certifieds-2").scrolla({once:!0})}),$("#blog").load("/include/templates/pages/index/blog.html",function(){r(),$("#blog").scrolla({once:!0})}),$("#live-timeline").roadmap([{date:"September 2021",content:"Start I.D. Microcomputer Systems and Networks"},{date:"December 2022",content:"Decided to learn Python"},{date:"March 2023",content:"Go work to Italic as a Systems Technician"},{date:"July 2023",content:"eJPT Passed"},{date:"September 2023",content:"Start H.D. Multiplatform Application Development"},],{eventsPerSlide:5,rootClass:"roadmap"}),$(".pt-type-text").each(function(){var e=$(this).attr("title")+";"+$(this).text();$(this).empty().attr("title","").teletype({text:$(e.split(";"),$.trim),typeDelay:10,backDelay:20,blinkSpeed:1e3,cursor:"▋",delay:3e3,preserve:!1,prefix:">_ ",loop:0,humanise:!0,smoothBlink:!0,callbackNext:null,callbackType:null,callbackFinished:null})}),$("#proyects").load("/include/templates/pages/index/proyects.html",function(){$(window).width()>500&&$(".gpwshell-proyect").resizable({onDragStart:function(e,t,o){t.css("cursor","nwse-resize")},onDragStop:function(e,t,o){t.css("cursor","")},resizeHeight:!1,resizeWidthFrom:"right"})}),$(".certifieds-slider").slick({infinite:!0,dots:!1,centerMode:!0,variableWidth:!0,adaptiveHeight:!0,arrows:!1,autoplay:!0,autoplaySpeed:1e3}),$("#certifieds").scrolla({once:!0}),$("#proyects").scrolla({once:!0})}$(document).ready(function(){bootIndex()});
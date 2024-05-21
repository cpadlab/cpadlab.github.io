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

import{toggleTheme as e}from"../modules/theme.js";export function bootNavbar(){document.getElementById("toggle-about-btn").addEventListener("click",function(){$("#nul-about-link-r2").hasClass("rotate180deg")?($("#munu-ul-about").css({display:"none",opacity:"0"}),$("#nul-about-link-r2").removeClass("rotate180deg")):($("#nul-about-link-r2").addClass("rotate180deg"),$("#munu-ul-about").css({display:"flex"}),$("#munu-ul-about").animate({opacity:"1"}))}),document.getElementById("go-up-btn").addEventListener("mouseover",function(){$(".fixed-bottom-btns").css({transform:"translateY(-5px)"})}),document.getElementById("go-up-btn").addEventListener("mouseout",function(){$(".fixed-bottom-btns").css({transform:"translateY(0)"})}),document.getElementById("toggle-theme-btn").addEventListener("click",function(){e()}),document.getElementById("toggle-hidden-menu").addEventListener("mouseover",function(){$("#toggle-hidden-menu i").removeClass("fa-bars").addClass("fa-bars-staggered")}),document.getElementById("toggle-hidden-menu").addEventListener("mouseout",function(){$("#toggle-hidden-menu i").removeClass("fa-bars-staggered").addClass("fa-bars")}),document.getElementById("toggle-hidden-menu").addEventListener("click",function(){$(".host-hidden-menu").load("/include/templates/common/hidden-menu.html",function(){$(".host-hidden-menu").css({opacity:1,transform:"translateX(0%)",pointerEvents:"all"}),document.getElementById("close-hidden-menu-btn").addEventListener("click",function(){$(".host-hidden-menu").css({opacity:0,transform:"translateX(50%)",pointerEvents:"none"},function(){$(".host-hidden-menu").empty()})})})})}
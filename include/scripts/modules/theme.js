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

import{createCookie as e}from"./cookies.js";export function toggleToDark(){e("theme","dark",24),document.documentElement.setAttribute("data-theme","dark"),$("#toggle-theme-btn i").removeClass("fa-sun").addClass("fa-moon")}export function toggleToLight(){e("theme","light",24),document.documentElement.setAttribute("data-theme","light"),$("#toggle-theme-btn i").removeClass("fa-moon").addClass("fa-sun")}function returnCurrentTheme(){return document.documentElement.getAttribute("data-theme")}export function toggleTheme(){"dark"===returnCurrentTheme()?toggleToLight():toggleToDark()}
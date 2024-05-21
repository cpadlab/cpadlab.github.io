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

export function createCookie(t,e,i=12){var r=new Date;r.setTime(r.getTime()+36e5*i);var o="expires="+r.toUTCString();document.cookie=t+"="+e+";"+o+";path=/"}export function getCookie(t){let e=document.cookie.split(";");for(let i=0;i<e.length;i++){let r=e[i].trim();if(r.startsWith(t+"="))return decodeURIComponent(r.substring(t.length+1))}return null}
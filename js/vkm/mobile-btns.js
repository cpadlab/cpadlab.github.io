/*
# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     (code by wual)
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

# See proyect >> https://github.com/14wual/14wual.github.io
# Follow me >> https://twitter.com/codewual
*/
const homeButton = document.getElementById("go-home-mobile");
const vkmButton = document.getElementById("go-download-VKM");

btnSettings.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "http://14wual.github.io/";
})

vkmButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "http://14wual.github.io/pages/vkm.html";
})
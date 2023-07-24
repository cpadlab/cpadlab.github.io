
/* 
# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     (code by wual)
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

# VKM JS
# See proyect >> https://github.com/14wual/vkm
# Follow me >> https://twitter.com/14wual
*/

const fold = document.getElementById("fold");
const unfold = document.getElementById("unfold");
const vkm_buttons = document.getElementById("vkm-buttons");

fold.addEventListener("click", function() {
    fold.style.display = 'none';unfold.style.display = 'inline';
    vkm_buttons.style.opacity = '1';vkm_buttons.style.transform = 'translate(0, 0%)';
})

unfold.addEventListener("click", function() {
    fold.style.display = 'inline';unfold.style.display = 'none';
    vkm_buttons.style.opacity = '0';vkm_buttons.style.transform = 'translate(0, -500%)';
})
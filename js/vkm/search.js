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
const botonBusqueda = document.querySelector(".search-btn");

botonBusqueda.addEventListener("click", function() {
    const inputText = document.querySelector('.search-bar').value;
    const search_alert = "Your Search: '" + inputText + "'";
    window.alert(search_alert)
}); 

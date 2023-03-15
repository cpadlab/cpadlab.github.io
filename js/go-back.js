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
function getSearchFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    console.log(backPage);
    return urlParams.get('previousPage');
}

var backPage = getSearchFromURL();
console.log(backPage);

if (backPage == "") {
    window.location.href = "http://14wual.github.io/";
} else if (backPage == "") {
    window.location.href = "http://14wual.github.io/pages/vkm.html";
} else if (backPage == "") {
    window.location.href = "http://14wual.github.io/pages/vkm/download.html";
} else if (backPage == "") {
    window.location.href = "http://14wual.github.io/pages/vkm/pre-beta.html";
} else if (backPage == "") {
    window.location.href = "http://14wual.github.io/pages/vkm/preview.html";
} else if (backPage == "") {
    window.location.href = "http://14wual.github.io/pages/vkm/thanks.html";
} else {
    window.location.href = "http://14wual.github.io";
}

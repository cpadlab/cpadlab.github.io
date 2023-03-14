var title = document.title;

function goMenu(title){
    //window.location.href = "http://14wual.github.com/htdocs/menu.html?previousPage=" + encodeURIComponent(title);
    window.location.href = "http://localhost:5500/htdocs/menu.html?previousPage=" + encodeURIComponent(title)
}

goMenu(title)
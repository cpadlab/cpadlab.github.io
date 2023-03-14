var title = document.title;

function goMenu(title){
    window.location.href = "http://14wual.github.io/pages/menu.html?previousPage=" + encodeURIComponent(title);
}

goMenu(title)
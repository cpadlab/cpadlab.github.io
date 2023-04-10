document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      g_search();
    }
});


function g_search() {
    const search_str = document.getElementById('search')
    const search_val = search_str.value
    location.href = "https://www.google.com/search?q=" + search_val;
}
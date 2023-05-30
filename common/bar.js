const btn_bars = document.getElementById("btn-bars");
const btn_delete = document.getElementById("btn-delete");
const bars = document.getElementById("bars");

btn_bars.addEventListener("click", function(event) {
    event.preventDefault()
    bars.style.display = "block"
});

btn_delete.addEventListener("click", function(event) {
    event.preventDefault()
    bars.style.display = "none"
});
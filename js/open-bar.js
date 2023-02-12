var bar = document.getElementById("bar");
var openbarButton = document.getElementById("open-bar-button");
var closebarButton = document.getElementsByClassName("close-button")[0];

openbarButton.onclick = function() {
  bar.style.display = "block";
}

closebarButton.onclick = function() {
  bar.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == bar) {
    bar.style.display = "none";
  }
}

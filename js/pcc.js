let pcclabel = document.getElementById("pcclabel");

document.getElementById("show-content-2").addEventListener("change", function() {
    if (this.checked) {
      document.querySelector(".pcc_see_more").style.display = "block";
      pcclabel.textContent = "See Less";
    } else {
      document.querySelector(".pcc_see_more").style.display = "none";
      pcclabel.textContent = "See More";
    }
});
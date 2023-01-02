let pcclabel = document.getElementById("vkmlabel");

document.getElementById("show-content-1").addEventListener("change", function() {
    if (this.checked) {
      document.querySelector(".vkm_see_more").style.display = "block";
      pcclabel.textContent = "See Less";
    } else {
      document.querySelector(".vkm_see_more").style.display = "none";
      pcclabel.textContent = "See More";
    }
});





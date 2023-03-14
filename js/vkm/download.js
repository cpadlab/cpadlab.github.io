const selectBTN = document.getElementById("install-btn");
const install_guide = document.getElementById("install-guide");
const closeBTN = document.getElementById("close-install-btn");
const blackoutDiv = document.getElementById("blackout-dow");


selectBTN.addEventListener("click", function() {
    event.preventDefault();
    install_guide.style.display = "block"
    blackoutDiv.style.display = "block"
});

closeBTN.addEventListener("click", function() {
    event.preventDefault();
    install_guide.style.display = "none"
    blackoutDiv.style.display = "none"
});
const helpfileUrl = 'https://14wual.github.io/files/vkm/install-help.pdf';
const helpBtn = document.getElementById('help-install-btn');
helpBtn.addEventListener('click', function() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', helpfileUrl, true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    if (xhr.status === 200) {
      const url = URL.createObjectURL(xhr.response);
      const a = document.createElement('a');
      a.href = url;
      a.download = helpfileUrl.split('/').pop();
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };
  xhr.send();
});

//const fileUrl = 'http://127.0.0.1:5500/files/vkm/install-help.pdf';
const downloadBtn = document.getElementById('flip');
downloadBtn.addEventListener('click', function() {
  const alertstr = "VKM is currently under development, in early phase, fill in the form below to enter the pre-beta, which will be released soon."
  window.alert(alertstr)
  const url = "http://14wual.github.io/pages/vkm/pre-beta.html";
  var win = window.open(url, '_blank');
  win.focus();
  /*const xhr = new XMLHttpRequest();
  xhr.open('GET', fileUrl, true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    if (xhr.status === 200) {
      const url = URL.createObjectURL(xhr.response);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileUrl.split('/').pop();
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };
  xhr.send();*/
});
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
const showFormBtn = document.getElementById('show-form-btn');
const hiddenFormBtn = document.getElementById('hidden-form-btn');
const addToVaultBtn = document.getElementById('add-nw-key-event');
const blackout = document.querySelector('.blackout');
const ankPanel = document.querySelector('.ank-panel');
const body = document.querySelector('body');

showFormBtn.addEventListener('click', () => {
    blackout.style.display = 'block';
    ankPanel.style.display = 'block';
});

hiddenFormBtn.addEventListener('click', () => {
    ankPanel.style.display = 'none';
    blackout.style.display = 'none';
    document.querySelectorAll('.ank-inputs input').forEach(input => {
        input.value = '';
      });      
});

addToVaultBtn.addEventListener('click', () => {

    const usernameInput = document.getElementById("user-input");
    const passwordInput = document.getElementById("pswd-input");
    const siteInput = document.getElementById("siteInput");
    const urlInput = document.getElementById("urlInput");
    const categorySelect = document.getElementById("categorySelect");  

    const username = usernameInput.value || "none";
        const password = passwordInput.value || "none";
        const site = siteInput.value || "none";
        const url = urlInput.value || "none";
        const category = categorySelect.value || "none";

        const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('site', site);
            formData.append('url', url);
            formData.append('category', category);

        console.log(formData)
        const alert_string = "Added New Key: site(" + site + "), user(" + username + ")" 
        window.alert(alert_string)
});



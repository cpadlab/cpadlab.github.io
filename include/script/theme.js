import { setCookie, getCookie } from "./cookie.js" ;

$(document).ready(function() {

    function setTheme(theme) {
        setCookie('theme', btoa(theme))
        changeImage(theme);
        $('html').attr('data-theme', theme);
    }

    function changeImage(theme) {
        var imgSrc, imgSrc2;
        if (theme === "light") {
            imgSrc = "/include/assets/dark-vault.png";
            imgSrc2 = "/include/assets/dark-gpwshell.png";
        } else {
            imgSrc = "/include/assets/light-vault.png";
            imgSrc2 = "/include/assets/light-gpwshell.png";
        }
        $('#vault-image').attr('src', imgSrc);
        $('#gpwshell-image').attr('src', imgSrc2);
        
    }

    let cookieTheme = atob(getCookie('theme'))
    if (cookieTheme) {
        
        if (cookieTheme == 'dark') {
            setTheme('dark');
            $("#theme-checkbox").prop("checked", false);
        } else {
            setTheme('light');
            $("#theme-checkbox").prop("checked", true);
        }

    } else {setTheme('dark');}

    $("#switch-theme").click(function() {
        var isChecked = $("#theme-checkbox").prop("checked");
        if (isChecked == true) {setTheme('light');}
        else {setTheme('dark');}
    });

});
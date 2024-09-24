function checkCookiesConsent() {
    // Verificar si ya se aceptaron las cookies
    return document.cookie.split('; ').some(cookie => cookie.startsWith('cookies_accepted=true'));
}

function showCookieBanner() {
    if (window.jQuery) {
        // Usar jQuery si está disponible
        $("#cookie-banner").css("display", "flex");
    } else {
        // JavaScript nativo
        var banner = document.getElementById("cookie-banner");
        if (banner) {
            banner.style.display = "flex";
        }
    }
}


function hiddeCookies() {
    $("#cookie-banner").css({
        transform: 'translateY(150%)',
        opacity: 0
    })
}

function acceptCookies() {
    hiddeCookies();
    document.cookie = "cookies_accepted=true; path=/; max-age=" + 60*60*24*365; // 1 año de validez

    (function() {
        var script = document.createElement('script');
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-6H58BQD6RM";
        document.head.appendChild(script);

        script.onload = function() {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-6H58BQD6RM');
        };
    })();
}

function rejectCookies() {
    hiddeCookies();
}

function hideCookieBanner() {
    if (window.jQuery) {
        // Usar jQuery si está disponible
        $("#cookie-banner").css("display", "none");
    } else {
        // JavaScript nativo
        var banner = document.getElementById("cookie-banner");
        if (banner) {
            banner.style.display = "none";
        }
    }
}

if (checkCookiesConsent()) {
    hideCookieBanner();  // Ocultar si ya se aceptaron
} else {
    showCookieBanner();  // Mostrar si no se han aceptado
}
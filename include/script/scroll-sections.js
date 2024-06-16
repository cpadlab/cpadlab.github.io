function scrollToSection(event) {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    var targetId = this.getAttribute('href').substring(1); // Obtiene el id de la sección objetivo
    var targetElement = document.getElementById(targetId);
    if (targetElement) {
        var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        var offsetPosition = targetPosition - 50; // Ajusta la posición de desplazamiento

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Asigna la función scrollToSection a cada enlace
document.getElementById('hn-link-blog').addEventListener('click', scrollToSection);
document.getElementById('hn-link-writeups').addEventListener('click', scrollToSection);
document.getElementById('hn-link-proyects').addEventListener('click', scrollToSection);
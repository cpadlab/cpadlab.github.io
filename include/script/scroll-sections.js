function scrollToSection(event) {
    event.preventDefault();

    var targetId = this.getAttribute('href').substring(1);
    var targetElement = document.getElementById(targetId);
    if (targetElement) {
        var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        var offsetPosition = targetPosition - 50;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
    }
}

document.getElementById('hn-link-blog').addEventListener('click', scrollToSection);
document.getElementById('hn-link-writeups').addEventListener('click', scrollToSection);
document.getElementById('hn-link-proyects').addEventListener('click', scrollToSection);
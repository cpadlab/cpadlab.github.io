const cursor = document.querySelector('.follow-cursor');
let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let cursorX = 0;
let cursorY = 0;
const delay = 0.1;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    let speedX = Math.abs(mouseX - lastMouseX);
    let speedY = Math.abs(mouseY - lastMouseY);

    lastMouseX = mouseX;
    lastMouseY = mouseY;
});

function animateCursor() {
    cursorX += (window.scrollX + mouseX - cursorX) * delay;
    cursorY += (window.scrollY + mouseY - cursorY) * delay;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();
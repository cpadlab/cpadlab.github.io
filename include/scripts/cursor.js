/*
#   ___  ____  __   
#  / __)(  _ \(  )  
# ( (__  )___/ )(__  (code by cpadlab)
#  \___)(__)  (____)

# Author >> Carlos Padilla
# Proyect >> CPWvFeb24 (Carlos Padilla Web 2024 Feb Update)
# Download Code >> https://github.com/cpadlab/cpadlab.github.io
# Follow me >> https://twitter.com/nerezza0
*/

const cursor = document.querySelector('.custom-cursor');
let mouseX = 0;let mouseY = 0;
let lastMouseX = 0;let lastMouseY = 0;
let cursorX = 0;let cursorY = 0;
const delay = 0.1;

document.addEventListener('mousemove', (e) => {

    mouseX = e.clientX;mouseY = e.clientY;

    let speedX = Math.abs(mouseX - lastMouseX);
    let speedY = Math.abs(mouseY - lastMouseY);

    if (speedX > 20 || speedY > 20) {
        cursor.classList.add('drop-effect');
    } else {
        cursor.classList.remove('drop-effect');
    }

    const hoveredElement = document.elementFromPoint(mouseX, mouseY);
    if (
        hoveredElement && (hoveredElement.tagName === 'A' 
        || hoveredElement && hoveredElement.tagName === 'BUTTON')
    )

    {cursor.classList.add('hover-effect');
    } else {cursor.classList.remove('hover-effect');}

    lastMouseX = mouseX;lastMouseY = mouseY;

});

function animateCursor() {

    cursorX += (window.scrollX + mouseX - cursorX) * delay;
    cursorY += (window.scrollY + mouseY - cursorY) * delay;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);

}

animateCursor();
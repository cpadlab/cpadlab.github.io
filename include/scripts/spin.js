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

function randomChar() {return String.fromCharCode(Math.floor(Math.random() * (126 - 33 + 1)) + 33);}

function spinText($element) {

    var $this = $element;

    $this.css({color: 'var(--accent)'})

    var finalText = $this.data('final-text');
    var totalLength = finalText.length;
    var currentIndex = 0;var randomTries = 0;

    var totalDelayPerChar = 3000 / totalLength;
    var attemptDelay = totalDelayPerChar / 10;

    function updateText() {

        var currentText = finalText.substring(0, currentIndex);

        if (currentText.length < finalText.length) {currentText += randomChar();}
        
        $this.text(currentText);

        if (randomTries >= 2 || currentText[currentIndex] === finalText[currentIndex]) {currentIndex++;randomTries = 0;
        } else {randomTries++;}

        setTimeout(updateText, attemptDelay);
    }
    
    updateText();
}

$(document).ready(function() {spinText($('#hn-1 h1'))});
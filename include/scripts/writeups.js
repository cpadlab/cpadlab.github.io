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

$(document).ready(function() {

    $.getJSON("include/assets/writeups.json", function(data) {

        function generateDivs(data) {
            $.each(data, function(index, item) {
                if(index < 3) {
                    var div = `
                        <div class="writeup writeup-${index + 1}" data-link="${item.link}">

                            <img src="${item.image}" alt="${item.alt}">

                            <div class="wa-info">
                                <h1>${item.title}</h1>
                                <p>${item.desc}</p>
                                <div class="wai-info-data">
                                    <div id="wai-difficulty" class="dificulty-${item.dificulty}"></div>
                                    <span>Questions: ${item.questions}</span>
                                </div>
                            </div>

                            <button><i class="fa-regular fa-bookmark"></i> Read</button>

                        </div>
                    `;
                    $(".writeups-articles").append(div);
                }
            });

            $('.writeup').on('click', function() {window.open($(this).data('link'), '_blank');});
        }

        generateDivs(data);

    }).fail(function() {console.log("Error loading writeups.json file");});
});

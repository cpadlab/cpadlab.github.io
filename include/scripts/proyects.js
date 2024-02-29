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

    $.getJSON("include/assets/proyects.json", function(data) {

        function generateDivs(data) {
            $.each(data, function(index, item) {
                if(index < 3) {
                    var div = `
                        <div class="repository ${item.view}">
                            
                            <div class="repo-content">

                                <i class="fa-solid ${item.icon}"></i>

                                <h1>${item.title} <span>${item.view}</span></h1>

                                <p>${item.desc}</p>

                                <div class="code-lang ${item.lang}"></div>
                                <i class="${item.lang_icon}"></i>

                            </div>

                            <div class="repo-links">
                                <a href="${item.link}" target="_blank"><i class="fa-solid ${item.link_icon}"></i> ${item.link_text}</a>
                            </div>
                            
                        </div>
                    `;
                    $(".proyects-flexgrid").append(div);
                }
            });

            $('.repository').on('click', function() {window.open($(this).data('link'), '_blank');});
        }

        generateDivs(data);

    }).fail(function() {console.log("Error loading proyects.json file");});
});

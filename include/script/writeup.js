$(document).ready(function() {
    var itemsPerPage = 11;
    var items = [];
    var totalPages = 0;
    var currentPage = 1;
    var selectedCategory = "all"; // Inicialmente, mostrar todos los elementos

    function loadItems(xml) {
        $(xml).find('item').each(function(index) {
            var title = $(this).find('title').text();
            var link = $(this).find('link').attr('href');
            var date = $(this).find('pubDate').text();
            var category = $(this).find('category').text();
            var dateStr = moment(date).format("MMM DD, YYYY");
            var tooltipText =  $(this).find('category').text() + " TryHackMe CTF. " + $(this).find('description').text();

            var itemHTML = `    
                <a href="${link}" class="wc-writeup" target="_blank" data-category="${category}" data-tooltip="${tooltipText}">
                    <div class="wc-dificulty wc-${category}"></div>
                    <i class="fa-solid fa-sort-up" id="wcw-float-arrow"></i>
                    <h2>${title}</h2>
                    <span datetime="${date}" id="wcw-date">${dateStr}</span>
                </a>
            `;

            items.push(itemHTML);
        });

        totalPages = Math.ceil(items.length / itemsPerPage);
        showPage(1);
        renderButtons();
    }

    function showPage(page) {
        var startIndex = (page - 1) * itemsPerPage;
        var endIndex = startIndex + itemsPerPage;
        var filteredItems = items.filter(function(item) {
            if (selectedCategory === "all") {
                return true;
            } else {
                return $(item).data('category') === selectedCategory;
            }
        });

        var writeupsContainer = $('.wc-writeups');
        writeupsContainer.animate({ height: 0, opacity: 0 }, 500, function() {
            writeupsContainer.empty().append(filteredItems.slice(startIndex, endIndex));
            writeupsContainer.css('height', 'auto'); // Establece la altura automática para calcular la altura real
            var newHeight = writeupsContainer.height(); // Obtén la nueva altura
            writeupsContainer.css('height', 0); // Establece la altura de nuevo a 0 antes de la animación
            writeupsContainer.css('opacity', 0);
            writeupsContainer.animate({ height: newHeight, opacity: 1 }, 500); // Anima a la nueva altura
        });
    }

    function renderButtons() {
        var filteredItems = items.filter(function(item) {
            if (selectedCategory === "all") {
                return true;
            } else {
                return $(item).data('category') === selectedCategory;
            }
        });

        totalPages = Math.ceil(filteredItems.length / itemsPerPage);

        $('.wc-nexts-btns').empty();
        for (var i = 1; i <= totalPages; i++) {
            var button = $('<button/>', {
                text: i,
                click: function() {
                    $('.wc-nexts-btns button').removeAttr('id');
                    $(this).attr('id', 'wc-nexts-on');
                    var page = parseInt($(this).text());
                    showPage(page);
                }
            });
            if (i === 1) {
                button.attr('id', 'wc-nexts-on');
            }
            $('.wc-nexts-btns').append(button);
        }
    }

    $("input[name='value-radio']").change(function() {
        selectedCategory = $(this).val(); // Actualizar la categoría seleccionada
        showPage(1); // Mostrar la primera página de la nueva categoría
        renderButtons(); // Volver a generar los botones basados en la nueva categoría
        // Establecer el primer botón como activo
        $('.wc-nexts-btns button').removeAttr('id');
        $('.wc-nexts-btns button:first').attr('id', 'wc-nexts-on');
    });
    

    $.ajax({
        type: "GET",
        url: "/include/writeup.xml",
        dataType: "xml",
        success: function(xml) {
            loadItems(xml);
        },
        error: function(xhr, status, error) {
            console.error("Error al cargar el archivo XML:", error);
        }
    });

    $("input[name='value-radio'][value='all']").prop("checked", true);
});


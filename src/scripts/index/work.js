$(document).ready(function() {
    
    $.getJSON('/src/content/data.json', function(data) {

        data.forEach(function(project) {

            var button = `<button class="work-card link" data-id="${project.id}" data-image="${project.image_hover}"><div class="wc-border"></div><span data-text="${project.table_project_name}" class="wc-project">${project.table_project_name}</span><span data-text="${project.table_project_category}" class="wc-category">${project.table_project_category}</span><span data-text="${project.table_project_client}" class="wc-client">${project.table_project_client}</span><span data-text="${project.table_project_year}" class="wc-year">${project.table_project_year}</span><div class="wc-background"></div></button>`;
            $('#wc-hover').append(button);

            var section = `<section class="project" id="${project.id}" style="display: none;"><div class="project-content"><div class="project-close"><button class="work-card-link-close" data-id="${project.id}"><svg width="100" height="18" viewBox="0 0 50 9"><path vector-effect="non-scaling-stroke" d="m0 4.5 5-3m-5 3 5 3m45-3h-77"></path></svg><div><span data-text="Return">Return</span></div></button></div><h2>${project.section_project_text}</h2><div><a href="${project.section_project_link}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg><span>See website</span></a></div><div><ul>${project.section_project_labels.map(function(label) {return `<li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg><span>${label}</span></li>`;}).join('')}</ul></div><div class="project-images">${project.section_project_images.map(function(image, index) {return `<div><img loading="lazy" src="${image}" alt="${project.table_project_name} Website Photo ${index + 1}"></div>`;}).join('')}</div></div></section>`;
            $('body').append(section);

        });

        $('button.work-card.link[data-id]').click(function() {
            var projectId = $(this).data('id');
            openWork($('#' + projectId));
        });

        $('button.work-card-link-close[data-id]').click(function() {
            var projectId = $(this).data('id');
            closeWork($('#' + projectId));
        });

        $('.work-card').on('mouseenter', function(event) {
            var cardHeight = $(this).outerHeight();
            var cursorY = event.pageY - $(this).offset().top;

            var $background = $(this).find('.wc-background');

            if (cursorY < cardHeight / 2) {
                $background.css('top', '-100%');
            } else {
                $background.css('top', '100%');
            }

            $background.stop().animate({
                top: '0'
            }, 300);
        });

        $('.work-card').on('mouseleave', function(event) {
            var cardHeight = $(this).outerHeight();
            var cursorY = event.pageY - $(this).offset().top;

            var $background = $(this).find('.wc-background');

            if (cursorY < cardHeight / 2) {
                $background.stop().animate({
                    top: '-100%'
                }, 300);
            } else {
                $background.stop().animate({
                    top: '100%'
                }, 300);
            }
        });

    });
});

function openWork($container) {

    var $projectTransition = $('.project-transition');
    var $project = $container;

    $projectTransition.css({display: 'block'});
    $projectTransition.animate({top: '0%'}, 500);

    $project.css({
        'display': 'block',
        'opacity': 0
    });

    $projectTransition.animate({ 'top': '-100%' }, 500);

    setTimeout(function() {

        $project.css({ 'opacity': 1 });

        setTimeout(function() {
            $projectTransition.css({ display: 'none' });
        }, 1000);

    }, 200);

}

function closeWork($container) {

    var $projectTransition = $('.project-transition');
    
    $projectTransition.css({display: 'block'});
    $projectTransition.animate({top: '0%'}, 500);

    setTimeout(function() {

        $container.css({ 'display': 'none' });

        setTimeout(function() {
            $projectTransition.animate({ 'top': '100%' }, 500);

            setTimeout(function() {
                $projectTransition.css({ display: 'none' });
            }, 1000);

        }, 1);

    }, 400);

}

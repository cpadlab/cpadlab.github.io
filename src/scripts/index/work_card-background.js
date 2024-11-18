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
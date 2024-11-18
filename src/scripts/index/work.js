
function openWork($container) {
    
    var $projectTransition = $('.project-transition');

    $projectTransition.css({display: 'block'})
    $projectTransition.animate({top: '0%'},500);

    $container.css({
        'display': 'block',
        'opacity': 0
    });

    $projectTransition.animate({
        'top': '-100%',
    }, 500);

    setTimeout(function() {
        $container.css({
            'opacity': 1
        });

        setTimeout(function() {
            $projectTransition.css({display: 'none'})
        }, 1000)

    }, 200)

}

function closeWork($container) {
    
    var $projectTransition = $('.project-transition');

    $projectTransition.css({display: 'block'})
    $projectTransition.animate({top: '0%'},500);

    
    setTimeout(function() {
        $container.css({
            'display': 'none',
        });

        setTimeout(function() {
            $projectTransition.animate({
                'top': '100%',
            }, 500);
            
            setTimeout(function() {
                $projectTransition.css({
                    'display': 'none',
                });
            }, 1000)
        }, 1)

    }, 400)
    
}



$(document).ready(function() {

    setTimeout(function() {
        
        /* $(".home-intro-background").css({
            animation: '_introSlideUp 0.2s linear forwards'
        }); */

        setTimeout(function() {

            $(".home-intro-background").css({
                animation: '_outroSlideUp 0.2s linear forwards'
            });  

            $(".home-intro-video-outro").css({
                background: 'var(--dark)',
                opacity: 1
            });

            setTimeout(function() {

                $(".home-content h1").addClass("dark")
                
                $(".home-intro-video-outro, .home-intro-video video").css({
                    display: 'none'
                });

                $(".home-intro-background").css({
                    zIndex: '-1'
                }); 

            }, 201);

        }, 799);

    }, 200);

});

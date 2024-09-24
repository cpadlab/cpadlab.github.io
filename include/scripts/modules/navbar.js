function _toggleNavbar() {
    if (!$("._header-button_toggle_hidden_navbar").hasClass("open")) {
        $("._header-button_toggle_hidden_navbar").addClass("open");

        $(".hidden-navbar").css({display: 'block'})
        setTimeout(function() {
            $(".hidden-navbar").css({transform: 'translateX(0%)'})
            setTimeout(function() {

                $("._header-link_main, ._header-link_lang").css({display: 'none'});

                $(".hidden-navbar-content").css({transform: 'translateX(0%)'})
            },200)
        },1)


    } else {
        $("._header-button_toggle_hidden_navbar").removeClass("open")

        
        $(".hidden-navbar-content").css({transform: 'translateX(100%)'})
        setTimeout(function() {
            $("._header-link_main, ._header-link_lang").css({display: 'flex'});
            $(".hidden-navbar").css({transform: 'translateX(100%)'})
            setTimeout(function() {
                $(".hidden-navbar").css({display: 'none'})
            },500)
        },200)

    }
}


$(document).ready(function() {

    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to(".home-background-container", {
        width: "90%",
        borderRadius: "3em",
        scrollTrigger: {
            trigger: ".home-background-container",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });

    gsap.to("header", {
        width: "90%",
        scrollTrigger: {
            trigger: ".home-background-container",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });

    gsap.to(".home-content", {
        width: "90%",
        scrollTrigger: {
            trigger: ".home-background-container",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });

    const textElement = document.getElementById('about-content-text');
    const spans = textElement.querySelectorAll('span');

    spans.forEach(span => {
        gsap.set(span, { opacity: .5 });
    });

    gsap.to(spans, {
        scrollTrigger: {
            trigger: $(".about-content"),
            scrub: true,
            start: 'top center',
            end: '+=300',
        },
        opacity: 1,
        ease: 'none',
        stagger: 0.1
    });

    const textElement_2 = document.getElementById('about-content-intro');
    const spans_2 = textElement_2.querySelectorAll('span');

    spans_2.forEach(span => {
        gsap.set(span, { opacity: .5 });
    });

    gsap.to(spans_2, {
        scrollTrigger: {
            trigger: $(".about-content"),
            scrub: true,
            start: 'top center',
            end: '+=300',
        },
        opacity: 1,
        ease: 'none',
        stagger: 0.1
    });

    /* const wc_hover = document.getElementById('wc-hover');
    const wc_hover_btn = wc_hover.querySelectorAll('button');

    wc_hover_btn.forEach(btn => {
        gsap.set(btn, { opacity: .5 });
    });

    gsap.to(wc_hover_btn, {
        scrollTrigger: {
            trigger: $(".works"),
            scrub: true,
            start: 'top center',
            end: '+=300',
        },
        opacity: 1,
        ease: 'none',
        stagger: 0.1
    });
 */

});

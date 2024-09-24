

const scroll = new LocomotiveScroll({
    el:document.querySelector("[data-scroll-container]"),
    smooth:!0,
    smartphone:{smooth:!1},
    tablet:{smooth:!1}
})

/* gsap.registerPlugin(ScrollTrigger);

gsap.to(".about-intro-full_image-container", {
    scrollTrigger: {
        trigger: ".about-intro-full_image",
        start: "top top",
        end: "top top",
        scrub: true,
        pin: false,
    },
    opacity: 1,
    duration: 1,
}); */


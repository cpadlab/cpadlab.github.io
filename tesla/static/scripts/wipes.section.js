
TweenLite.defaultEase = Linear.easeNone;
var controller = new ScrollMagic.Controller();
var tl = new TimelineMax();

// Animaciones para cada sección
tl.from("section.panel.model-y", 1, {yPercent: 100});
tl.from("section.panel.model-3", 1, {xPercent: 100});
tl.from("section.panel.model-x", 1, {xPercent: 100});
tl.from("section.panel.model-s", 1, {xPercent: 100});
tl.from("section.panel.cybertruck", 1, {xPercent: 100});
tl.from("section.panel.solar-panels", 1, {xPercent: 100});
tl.from("section.panel.solar-roof", 1, {xPercent: 100});
tl.from("section.panel.powerwall", 1, {xPercent: 100});
tl.from("section.panel.accessories", 1, {xPercent: 100});

// Escena de ScrollMagic
new ScrollMagic.Scene({
    triggerElement: ".pin-wrapper",
    triggerHook: "onLeave",
    duration: "700%"
})
.setPin(".pin-wrapper")
.setTween(tl)
.addTo(controller);

/* 
tl.from("section.panel.model-y", 1, {xPercent: 100});
tl.from("section.panel.model-3", 1, {xPercent: -100});
tl.from("section.panel.model-x", 1, {yPercent: 100});
tl.from("section.panel.model-s", 1, {yPercent: 100});
tl.from("section.panel.cybertruck", 1, {xPercent: 100});
tl.from("section.panel.solar-panels", 1, {xPercent: -100});
tl.from("section.panel.solar-roof", 1, {yPercent: 100});
tl.from("section.panel.powerwall", 1, {xPercent: 100});
tl.from("section.panel.accessories", 1, {xPercent: -100}); 
*/

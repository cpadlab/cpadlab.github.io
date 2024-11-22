/* const transforms = [
    { x: -0.8, y: -0.6, rotationZ: -29 },
    { x: -0.2, y: -0.4, rotationZ: -6 },
    { x: -0.05, y: 0.1, rotationZ: 12 },
    { x: -0.05, y: -0.1, rotationZ: -9 },
    { x: -0.1, y: 0.55, rotationZ: 3 },
    { x: 0, y: -0.1, rotationZ: 9 },
    { x: 0.1, y: 0.4, rotationZ: 12 },
    { x: 0, y: -0.15, rotationZ: -9 },
    { x: 0.2, y: 0.15, rotationZ: 12 },
    { x: 0.8, y: 0.6, rotationZ: 20 },
];
 */

const grid_transforms = [
    { paddingTop: 3 },
    { paddingTop: -8 },
    { paddingTop: 12 },
    { paddingTop: 15 },
    { paddingTop: -5 },
    { paddingTop: 0 },
    { paddingTop: 10 },
    { paddingTop: -7 },
    { paddingTop: 5 },
    { paddingTop: 14 },
    { paddingTop: -3 },
    { paddingTop: 8 },
    { paddingTop: 7 },
    { paddingTop: -10 },
    { paddingTop: 2 },
    { paddingTop: -1 }
];

function createProjectCard(project) {
    return `<a class="gc-card" target="_blank" href="${project.url}"><h3>${project.name}</h3><p>${project.desc}</p><div class="gcc-labels"><div><time datetime="${project.date}">${new Date(project.date).toLocaleDateString('en-US', {month: 'short',day: 'numeric'})}</time></div><div><span>${project.lang}</span></div><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg><span>${project.stars}</span></div></div></a>`
}

$(document).ready(function () {

    $.getJSON('src/content/projects.json', function (projects) {
        $.each(projects, function (index, project) {
            $('.github-container').append($(createProjectCard(project)));
        });
    });

    const svgContent1 = `<svg class="kitten" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 74"><g><polygon points="38 64 34 64 34 68 30 68 30 72 26 72 26 74 46 74 46 72 42 72 42 68 38 68 38 64"/><rect x="16" y="34" width="4" height="4"/><rect x="52" y="34" width="4" height="4"/><path d="M60,0V8H52v8H48v6H44V16H38v6H34V16H28v6H24V16H20V8H12V0H6V28H0V52H14v4H6v4H20v4H16v4H30V64h4V54H30V50H42v4H38V64h4v4H56V64H52V60H66V56H58V52H72V28H66V0ZM10,12h4v6h4v4H10ZM28,38H24v4H12V38H8V34h4V30H24v4h4ZM54,18h4V12h4V22H54ZM64,38H60v4H48V38H44V34h4V30H60v4h4Z"/></g></svg>`;
    const svgContent3 = `<svg class="kitten" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 74"><g><polygon points="38 64 34 64 34 68 30 68 30 72 26 72 26 74 46 74 46 72 42 72 42 68 38 68 38 64"/><rect x="16" y="34" width="4" height="4"/><rect x="52" y="34" width="4" height="4"/><path d="M60,0V8H52v8H48v6H44V16H38v6H34V16H28v6H24V16H20V8H12V0H6V28H0V52H14v4H6v4H20v4H16v4H30V64h4V54H30V50H42v4H38V64h4v4H56V64H52V60H66V56H58V52H72V28H66V0ZM10,12h4v6h4v4H10ZM28,38H24v4H12V38H8V34h4V30H24v4h4ZM54,18h4V12h4V22H54ZM64,38H60v4H48V38H44V34h4V30H60v4h4Z"/></g></svg>`;
    /* const svgContent3 = `<svg class="kitten kitten-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 74"><g><polygon points="38 64 34 64 34 68 30 68 30 72 26 72 26 74 46 74 46 72 42 72 42 68 38 68 38 64"/><rect x="16" y="34" width="4" height="4"/><rect x="52" y="34" width="4" height="4"/><path d="M60,0V8H52v8H48v6H44V16H38v6H34V16H28v6H24V16H20V8H12V0H6V28H0V52H14v4H6v4H20v4H16v4H30V64h4V54H30V50H42v4H38V64h4v4H56V64H52V60H66V56H58V52H72V28H66V0ZM10,12h4v6h4v4H10ZM28,38H24v4H12V38H8V34h4V30H24v4h4ZM54,18h4V12h4V22H54ZM64,38H60v4H48V38H44V34h4V30H60v4h4Z"/></g></svg>`; */
    const elements = [svgContent1, svgContent3];
    let currentIndex = 0;

    function switchContent() {
        $(".change-animation").html(elements[currentIndex]);
        currentIndex = (currentIndex + 1) % elements.length;
    };setInterval(switchContent, 700);

    /* TweenLite.defaultEase = Linear.easeNone;
    var controller = new ScrollMagic.Controller();
    var tl = new TimelineMax();

    tl.from("section.about", 1, {yPercent: 100, opacity: 0});

    new ScrollMagic.Scene({
        triggerElement: ".ha-transition-wrapper",
        triggerHook: "onLeave",
        duration: "150%"
    })
    .setPin(".ha-transition-wrapper")
    .setTween(tl)
    .addTo(controller); */

    grid_transforms.forEach((transform, index) => {
        gsap.to(`section.home div.home-pixels #hp-pixel-id-${index + 1} div.hp-pixel-transform`, {
            paddingTop: `${transform.paddingTop}px`,
            scrollTrigger: {
                trigger: "section.home",
                scrub: 1,
                pin: false,
                start: "top top",
                end: "+=100",
            },
        });
    });

    $('section.about div.about-container p').contents().each(function () {
        if (this.nodeType === Node.TEXT_NODE) {
            const words = this.nodeValue.split(/\s+/);
            const wordDivs = words.map(word => {
                if (word.trim() === '') return '';
                const spans = word.split('').map(letter => `<span>${letter}</span>`).join('');
                return `<div>${spans}</div>`;
            }).join(' ');
            $(this).replaceWith(wordDivs);
        }
    });    

    const about_spans = $('section.about div.about-container p span').toArray();

    about_spans.forEach(span => {
        gsap.set(span, { opacity: 0.1 });
    });
  
    gsap.to(about_spans, {
        scrollTrigger: {
            trigger: $(".about-container"),
            scrub: true,
            start: 'top top',
            end: '+=300',
            scrub: 1,
        },
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
    });

    gsap.to("section.projects div.projects-container div.pc-content div.lumber-jack-container", {
        scrollTrigger: {
            trigger: $(".projects"),
            scrub: true,
            start: 'top center',
            end: '+=1000',
        },
        marginTop: "2vh",
        ease: 'none',
        stagger: 0.1,
    });

    const iframes = $('iframe').toArray();

    iframes.forEach(iframe => {
        gsap.set(iframe, { opacity: 0.1 });
    });

    gsap.to(iframes, {
        scrollTrigger: {
            trigger: $(".projects"),
            scrub: true,
            start: 'top center',
            end: '+=1000',
        },
        opacity: "1",
        ease: 'none',
        stagger: 0.1,
    });

    /* $("section.home div.home-content h2 a.text-disperse").each(function () {
        const $textDisperse = $(this);
        const text = $textDisperse.text();
    
        $textDisperse.empty();
        text.split("").forEach((char, i) => {
            $textDisperse.append(`<span style="transform: translate(0, 0) rotate(0deg);" data-index="11${i}">${char}</span>`);
        });
    
        const $spans = $textDisperse.find("span");
    
        $textDisperse.on("mouseenter", function () {
            $spans.each(function () {
                const i = $(this).data("index");
                const { x, y, rotationZ } = transforms[i % transforms.length];
    
                $(this).css({
                    transform: `translate(${x}em, ${y}em) rotate(${rotationZ}deg)`,
                    zIndex: 1,
                });
            });

            $("div.black-overlay").css({opacity: .5});

        });

        $textDisperse.on("mouseleave", function () {
            $spans.css({
                transform: "translate(0, 0) rotate(0deg)",
                zIndex: 0,
            });

            $("div.black-overlay").css({opacity: .0});
        });
    });
     */

});


$(document).ready(function() {

    $(".home-background-container").css({
        display: "block"
    });
  
    const durationImage = 1500;
    const easing = "easeOutCubic";
  
    const animateClipPath = (progress) => {
        const x1 = 50 - 50 * progress + "%";
        const y1 = 25 - 25 * progress + "%";
        const x2 = 50 + 50 * progress + "%";
        const y2 = 35 * (1 - progress) + "%";
        const x3 = 50 + 50 * progress + "%";
        const y3 = 75 + 25 * progress + "%";
        const x4 = 50 - 50 * progress + "%";
        const y4 = 65 + 35 * progress + "%";

        $(".home-background-container").css({
            "clip-path": `polygon(${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}, ${x4} ${y4})`
        });

    };

    $({ progress: 0 }).animate({ progress: 1 }, {
        duration: durationImage,
        easing: easing,
        step: animateClipPath
    });

    $(".scroll-item").each(function(index) {
        setTimeout(() => {
            $(this).addClass("show");
        }, index * 100);
    });
    
});

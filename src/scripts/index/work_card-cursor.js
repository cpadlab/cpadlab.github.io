$(document).ready(function() {
    const $circle = $("#wc-cursor");
    const $hoverElement = $("#wc-hover");
  
    const screenSizes = {
      width: $(window).width(),
      height: $(window).height()
    };
  
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = screenSizes.width / 2;
    let cursorY = screenSizes.height / 2;
    const lerpSpeed = 0.1;
  
    // Cambiar opacidad al hacer hover
    $hoverElement.on("mouseover", function() {
      $circle.css("opacity", "1");
    });
  
    $hoverElement.on("mouseout", function() {
      $circle.css("opacity", "0");
    });
  
    function updateCursor() {
      cursorX = lerp(cursorX, mouseX, lerpSpeed);
      cursorY = lerp(cursorY, mouseY, lerpSpeed);
  
      const offsetX = $circle.outerWidth() / 2;
      const offsetY = $circle.outerHeight() / 2;
  
      $circle.css({
        transform: `translateX(${cursorX - offsetX}px) translateY(${cursorY - offsetY}px)`
      });
  
      requestAnimationFrame(updateCursor);
    }
  
    function lerp(min, max, value) {
      return (min + (max - min) * value);
    }
  
    $(document).on("mousemove", function(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });
  
    updateCursor();
    
    $(document).ready(function() {
        
        const imageCache = [];
      
        function preloadImage(url) {
          const img = new Image();
          img.src = url;
          imageCache.push(img);
        }
      
        $(".work-card.link").each(function() {
          const imageUrl = $(this).data("image");
          if (imageUrl) {
            preloadImage(imageUrl);
          }
        });
      
        $(".work-card.link").on("mouseover", function() {
          const imageUrl = $(this).data("image");
      
          $circle.css({
            "background": `url(${imageUrl}) no-repeat center center fixed`,
            "background-size": "cover"
          });
        });
      
      });
      
    
  });
  
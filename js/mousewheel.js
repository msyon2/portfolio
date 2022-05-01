jQuery(function () {
  var wheelDelta = 0; //휠이벤트 발생시 반환값 확인 변수
  var browser = 0; //파이어폭스 브라우저 판별 변수  BOM

  //Slide
  let slides = $(".slides"),
    slide = slides.find(".portfolio"),
    slideH = slide.outerHeight();
  (cnt = 0), (current = null);


  $(".section").each(function (index) {
    //0 1 2 ... 8 (9개섹션)
    $(this).on("mousewheel DOMMouseScroll", function (event) {
      event.preventDefault();

      browser = window.navigator.userAgent.toLowerCase().indexOf("firefox");

      if (browser >= 0) {
        wheelDelta = -event.detail * 40;
      } else {
        wheelDelta = event.originalEvent.wheelDelta;
      }
      //console.log(wheelDelta);

      if (wheelDelta < 0) {
        if (index < $(".section").length - 1) {
          if (index != 2) {
            $("html,body")
              .stop()
              .animate({ scrollTop: $(this).next().offset().top }, 1000);
			  projAnimation();
          } else {
            current = $(this);
            nextSlide();
          }
        }
      } else {
        //위로 섹션 이전(prev())으로 이동 120
        if (index > 0) {
          if (index != 2) {
            $("html,body")
              .stop()
              .animate({ scrollTop: $(this).prev().offset().top }, 1000);
          } else {
            current = $(this);
            prevSlide();
          }
        }
      }

      //next slide 함수
      function nextSlide() {
        if (!slide.is(":animated")) {
          cnt++;
        }
        if (cnt >= 3) {
          cnt = 3;
        }
        slide.stop().animate({ top: -slideH * cnt }, 800, function () {
          if (cnt == 3) {
            $("html,body")
              .stop()
              .animate({ scrollTop: current.next().offset().top }, 800);
			  
          }
        });
      }
      //prev slide 함수
      function prevSlide() {
        if (!slide.is(":animated")) {
          cnt--;
        }
        if (cnt <= 0) {
          cnt = 0;
        }
        slide.stop().animate({ top: -slideH * cnt }, 800, function () {
          if (cnt == 0) {
            $("html,body")
              .stop()
              .animate({ scrollTop: current.prev().offset().top }, 800);
          }
        });
      }


	  
	  /* project animation doesn't load when its proj slide page is loaded
	  	how to trigger the animation????
	  */
      //project section slide-ins
	  function projAnimation(indx){
      console.log(indx)
	}

    });
  });
}); //mousewheel.js
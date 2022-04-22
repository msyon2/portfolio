jQuery(function () {
  var wheelDelta = 0; //휠이벤트 발생시 반환값 확인 변수
  var browser = 0; //파이어폭스 브라우저 판별 변수  BOM

  //Slide
  let slides = $(".slides"),
    slide = slides.find(".portfolio"),
    slideH = slide.outerHeight();
  (cnt = 0), (current = null);

  $(".section").each(function (index) {
    $(this).on("mousewheel DOMMouseScroll", function (event) {
      event.preventDefault();

      //크로스브라우징 파이어폭스 마우스휠이벤트 DOMMouseScroll
      //사용자가 사용중인 브라우저 종류 - 소문자 변환 통일 toLowerCase() / toUpperCase()
      // indexOf() 일치하면 첫번째인덱스값 반환 0, 불일치 -1
      browser = window.navigator.userAgent.toLowerCase().indexOf("firefox");

      // browser>=0 파이어폭스
      if (browser >= 0) {
        //- 파이어폭스의 휠 델타 값(기본값 아래:3,  위:-3)
        //- 변환 : 아래 -120 위 120
        wheelDelta = -event.detail * 40;
      } else {
        wheelDelta = event.originalEvent.wheelDelta;
      }
      //console.log(wheelDelta);

      if (wheelDelta < 0) {
        //아래로 섹션 다음(next())으로 이동
        if (index < $(".section").length - 1) {
          if (index != 2) {
            $("html,body")
              .stop()
              .animate({ scrollTop: $(this).next().offset().top }, 1000);
            
          } else {
            current = $(this);
            nextSlide();
          }
        }
      } else {
        //위로 섹션 이전(prev())으로 이동
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
          slideAnimation();
        }
        if (cnt >= 4) {
          cnt = 4;
        }
        slide.stop().animate({ top: -slideH * cnt }, 800, function () {
          if (cnt == 4) {
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


      //project slide animation trigger 함수
      function slideAnimation(){
        const prjSections = $("#section2 .portfolio");
        let newWheelDelta = null;
        //console.log(newWheelDelta);

        prjSections.each(function(i,o) {
          
          if (newWheelDelta >= -720 && i <= prjSections.length){
            prjSections.eq(i).find(".left").addClass("in");
            prjSections.eq(i).find(".right").addClass("in");
            i++;
            
          }
        });
      }

    });
  });
});

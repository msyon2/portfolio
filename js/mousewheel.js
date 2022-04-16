jQuery(function () {
  var wheelDelta = 0; //휠이벤트 발생시 반환값 확인 변수
  var browser = 0; //파이어폭스 브라우저 판별 변수  BOM

  //Slide
  let slides = $(".slides"),
    slide = slides.find(".portfolio"),
    slideH = slide.outerHeight();
  (cnt = 0), (current = null);

  //섹션9개 클래스 요소를 배열처리
  //마우스 휠을 아래(-120) 한번 이상 휠 이벤트가 발생하면
  //다음(next()) 섹션으로 스크롤이벤트가 부드럽게 발생(스무스 스크롤이벤트)
  //마우스 휠을 위로( 120) 한번 이상 휠 이벤트가 발생하면
  //이전(prev()) 섹션으로 스크롤이벤트가 부드럽게 발생(스무스 스크롤이벤트)
  //Browser[Event - mousewheel] : 크롬,익스프롤러,사파리,오페라등..
  //Browser[Event - DOMMouseScroll] : 파이어폭스
  //파이어폭스 : 휠을 아래(30) 휠을 위로(-30) 다른 브라우저 반대로 수행
  //휠 다운시 파이어폭스를 제외한 브라우저에선 음수의 값을, 파이어폭스는 양수의 값을 돌려받는다.
  //파이어폭스 브라우저 판별 해야한다. => window.navigator.userAgent

  $(".section").each(function (index) {
    //0 1 2 ... 8 (9개섹션)
    $(this).on("mousewheel DOMMouseScroll", function (event) {
      event.preventDefault();

      //크로스브라우징 파이어폭스 마우스휠이벤트 DOMMouseScroll
      //사용자가 사용중인 브라우저 종류 - 소문자 변환 통일 toLowerCase() / toUpperCase()
      // indexOf() 일치하면 첫번째인덱스값 반환 0, 불일치 -1
      browser = window.navigator.userAgent.toLowerCase().indexOf("firefox");

      if (browser >= 0) {
        //긍정문 browser>=0 파이어폭스 이면  browser!=-1 부정문
        //- 파이어폭스의 휠 델타 값(기본값 아래:3,  위:-3)
        //- 변환 : 아래 -120 위 120
        wheelDelta = -event.detail * 40;
      } else {
        //그밖에 모든 브라우저  크롬,익스프롤러,사파리,오페라등..
        wheelDelta = event.originalEvent.wheelDelta; //방향 알수 있다 위+120, 아래-120
      }
      console.log(wheelDelta);

      if (wheelDelta < 0) {
        //아래로 섹션 다음(next())으로 이동  -120
        if (index < $(".section").length - 1) {
          //9개(8)이므로 마지막전(7)까지 사용
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
	  function projAnimation(){
		const prjSections = $("#section2 .portfolio")
		const speed = 500
      prjSections.each(function (i, o) {
        if (scrollTop >= prjSections.eq(i).offset().top+speed) {
          prjSections.eq(i).find(".left").addClass("in");
          prjSections.eq(i).find(".right").addClass("in");
        }
      });
	}

    });
  });
}); //mousewheel.js

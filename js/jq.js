const topMenu = $("nav ul.gnb>li");
const sections = $(".section");
const prjSections = $("#section2 .portfolio");
const speed = 500;
//button click시 이동
topMenu.click(function (e) {
  e.preventDefault();
  let target = $(this);
  let index = target.index();
  let section = $(".section").eq(index);
  let offset = section.offset().top;
  //offset gets coordinate value
  $("html,body").animate({ scrollTop: offset }, 1000, "easeOutCirc");
});

//custom cursor
$(window).on({
  mousemove: function (e) {
    gsap.to("#cursor", { duration: 0.2, left: e.pageX - 4, top: e.pageY - 4 });
  },
});

//cursor animation
$(".slogan_en").hover(
  function () {
    $("#cursor").addClass("blend");
    $(".cursor_dot").addClass("style1");
    $(".cursor_dot_outline").addClass("style1");
  },
  function () {
    $("#cursor").removeClass("blend");
    $(".cursor_dot").removeClass("style1");
    $(".cursor_dot_outline").removeClass("style1");
  }
);

$("#intro .right > div").hover(
  function () {
    $(".cursor_dot").addClass("style2");
    $(".cursor_dot_outline").addClass("style2");
  },
  function () {
    $(".cursor_dot").removeClass("style2");
    $(".cursor_dot_outline").removeClass("style2");
  }
);

const clickable = $(".clickable");
clickable.hover(
  function () {
    $("#cursor").addClass("blend2");
    $(".cursor_dot").addClass("click");
    $(".cursor_dot_outline").addClass("click");
  },
  function () {
    $("#cursor").removeClass("blend2");
    $(".cursor_dot").removeClass("click");
    $(".cursor_dot_outline").removeClass("click");
  }
);

/* ***SCROLL Events*** */
//sticky header
function stickyFn() {
  const nav = $("nav");
  $(window).scroll(function () {
    if ($(window).scrollTop() >= 10) {
      nav.addClass("sticky");
    } else {
      nav.removeClass("sticky");
    }
  });
}
stickyFn();

$(window).on("scroll", function () {
  //scroll activate gnb
  let scrollTop = $(window).scrollTop();
  sections.each(function (i, o) {
    if (scrollTop >= sections.eq(i).offset().top - speed) {
      $("nav ul.gnb li")
        .eq(i)
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  });

  //project section slide-ins
  prjSections.each(function (i, o) {
    if (scrollTop >= prjSections.eq(i).offset().top - speed) {
      prjSections.eq(i).find(".left").addClass("in");
      prjSections.eq(i).find(".right").addClass("in");
    }
  });
});

/* ** ABOUT Page ** */
//tab

let aboutPg = $("#section1"),
  tabList = aboutPg.find(".tab li"),
  tabPanel = aboutPg.find(".tab_content>div");

$(tabList).on({
  click: function (e) {
    let tab = $(this);
    let link = tab.find("a").attr("href");
    let panel = link.substr(1);
    e.preventDefault();
    tabList.removeClass("active");
    tab.addClass("active");
    tabPanel.hide();
    $("#" + panel).show();

    //Active tab triggers progressanimation
    if (tabList.eq(1).hasClass("active")) {
      progressAnimation();
    }
  },
});
tabPanel.eq(0).show();
tabList.eq(0).addClass("active");

//skills progress bar activate on scroll
let animationOst = $("#skills").offset().top - 600;
const progressWrap = $(".bar");
let isAni = false;

/* $(window).scroll(function () {
  if ($(window).scrollTop() >= animationOst && !isAni) {
    //start the animation after specified time
    setTimeout(function(){
      progressAnimation();
    },30000)
  }
}); */

//progress animation function
function progressAnimation(params) {
  progressWrap.each(function () {
    let $this = $(this),
      progressBar = $this.find(".progress"),
      progressText = $this.find(".rate"),
      progressRate = progressText.attr("data-rate");
    //console.log(progressRate);

    progressBar
      .stop()
      .delay(300)
      .animate({ width: progressRate + "%" }, 2500);

    let text = function () {
      $({ rate: 0 }).animate(
        { rate: progressRate },
        {
          duration: 2500,
          progress: function () {
            let now = this.rate;
            //console.log(now);
            progressText.text(Math.ceil(now) + "%");
          },
          complete: function () {
            isAni = true;
          },
        }
      );
    };
    text();
  });
}

/* project mockup hover action */
$(".hidden").hover(
  function () {
    let ah = $(this).innerHeight();
    let img = $(this).find("img");
    let imgh = img.innerHeight();
    //console.log(`a height:${ah} img height:${imgh}`);
    img.stop().animate({ top: ah - imgh }, 4000);
  },
  function () {
    let img = $(this).find("img");
    img.stop().animate({ top: 0 }, 4000);
  }
);

/*  gallery hover project detail show/hide */
const cards = $(".work"),
  prevBtn = $(".prev"),
  nextBtn = $(".next");
cards.each(function (i) {
  cards.eq(i).hover(
    function () {
      cards.removeClass("open");
      cards.eq(i).addClass("open");
    },
    function () {
      cards.eq(i).removeClass("open");
    }
  );
});

/* prevBtn.click(function (e) {
  e.preventDefault();
  let prevSlide = slide.eq(current);
  slide.removeClass("open");
  prevSlide.addClass("open");
  --current;
  if (current == -slide.length) {
    current = 0;
  }
});
nextBtn.click(function (e) {
  e.preventDefault();
  let nextSlide = slide.eq(current);
  slide.removeClass("open");
  nextSlide.addClass("open");
  current++;
  if (cureent == slide.length) {
    current = 0;
  }
}); */
/* 
(function () {
  const wrap = $(".gallery_wrap"),
    slide = wrap.find(".work"),
    prevBtn = wrap.find(".prev"),
    nextBtn = wrap.find(".next");
  let current = 0;

  prevBtn.click(function (e) {
    e.preventDefault();
    let prevSlide = slide.eq(current);
    slide.removeClass("open");
    prevSlide.addClass("open");
    --current;
    if (current == -slide.length) {
      current = 0;
    }
  });
  nextBtn.click(function (e) {
    e.preventDefault();
    let nextSlide = slide.eq(current);
    slide.removeClass("open");
    nextSlide.addClass("open");
    current++;
    if (cureent == slide.length) {
      current = 0;
    }
  });
}); */

const topMenu = $("nav ul.gnb>li");
const sections = $(".section")
const prjLeftSections = $("#section2 div:nth-child(odd)")
const speed = 500
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

$(window).on("scroll", function () {
  let scrollTop = $(window).scrollTop()
  sections.each(function (i,o) {
    if (scrollTop >= sections.eq(i).offset().top - speed) {
      $("nav ul.gnb li")
      .eq(i)
      .addClass("active")
      .siblings()
      .removeClass("active");
    }
  })
  prjLeftSections.each(function (i,o){
    if (scrollTop >= prjLeftSections.eq(i).offset().top - speed) {
      prjLeftSections.eq(i).find('.left').addClass('in');
			//prjSection.eq(i).find('.right span').addClass('show');
    }
  })
});

/* $(window).scroll(function () {
  let scrollTop = $(window).scrollTop();
  if (scrollTop >= $("#section1").offset().top - 500) {
    $("nav ul.gnb li")
      .eq(0)
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
  if (scrollTop >= $("#section2").offset().top - 500) {
    $("nav ul.gnb li")
      .eq(1)
      .addClass("active")
      .siblings()
      .removeClass("active");
    $("#section2").find(".left").addClass("in");
    //$("#section2").find(".left").css("left", "-200%").stop().animate({"left":0},2000);
  }
  if (scrollTop >= $("#section3").offset().top - 500) {
    $("nav ul.gnb li")
      .eq(2)
      .addClass("active")
      .siblings()
      .removeClass("active");
  }
}); */

/* SCROLL Events */
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



/* ABOUT Page Tab */
let aboutPg = $("#section1"),
  tabList = aboutPg.find(".tab li"),
  tabPanel = aboutPg.find(".tab_content>div");

tabList.each(function (i, e) {
  //console.log(i,e); //(index no, 값)
  let tab = $(this); //this = 순환하고 있는 요소중 현재 번째
  let link = tab.find("a").attr("href");
  let panel = link.substr(1);
  tab.click(function (e) {
    e.preventDefault();
    tabList.removeClass("active");
    tab.addClass("active");
    tabPanel.hide();
    $("#"+panel).show(); 
  });
});
tabPanel.eq(0).show();
tabList.eq(0).addClass("active");



/* skills progress bar */
let animationOst = $("#skills").offset().top - 600;
const progressWrap = $(".bar");
let isAni = false;

$(window).scroll(function () {
  if ($(window).scrollTop() >= animationOst && !isAni) {
    progressAnimation();
  }
});

function progressAnimation(params) {
  progressWrap.each(function () {
    let $this = $(this),
      progressBar = $this.find(".progress"),
      progressText = $this.find(".rate"),
      progressRate = progressText.attr("data-rate");
    //console.log(progressRate);

    progressBar.stop().animate({ width: progressRate + "%" }, 2500); //2.5s

    let text = function () {
      $({ rate: 0 }).animate(
        { rate: progressRate },
        {
          duration: 2000,
          progress: function () {
            let now = this.rate;
            console.log(now);
			progressText.text(Math.ceil(now) + "%");
          },
		  complete: function(){isAni=true}
        })
    }
    text()
  })
}




/* project mockup hover action */
$(".hidden").hover(
  function () {
    let ah = $(this).innerHeight();
    let img = $(this).find("img");
    let imgh = img.innerHeight();
    console.log(`a height:${ah} img height:${imgh}`);
    img.stop().animate({ top: ah - imgh }, 4000);
  },
  function () {
    let img = $(this).find("img");
    img.stop().animate({ top: 0 }, 4000);
  }
);

const topMenu = $("nav ul.gnb>li");
const sections = $(".section")
const prjSections = $("#section2 .portfolio")
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
 


  //project section slide-ins 
  prjSections.each(function (i,o){
    if (scrollTop >= prjSections.eq(i).offset().top - speed) {
      prjSections.eq(i).find('.left').addClass('in');
		  prjSections.eq(i).find('.right').addClass('in');
    }
  })
});




/* ** ABOUT Page ** */
//tab
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
  
  //Active tab triggers progressanimation
  /* if (tabList.eq(1).hasClass("active")){
    progressAnimation();
  } */
});
tabPanel.eq(0).show();
tabList.eq(0).addClass("active");

/* let skillsTab = tabList.find(".skills");
if (skillsTab.hasClass("active")){
  if(!progressWrap.is(":animated")){
      progressAnimation();
  }
} */
  /* skillsTab.on("click", function(e){
    e.preventDefault();
    if(!progressWrap.is(":animated")){
      
      progressAnimation();
    }
  }) */

//skills progress bar activate on scroll
let animationOst = $("#skills").offset().top - 600;
const progressWrap = $(".bar");
let isAni = false;

$(window).scroll(function () {
  if ($(window).scrollTop() >= animationOst && !isAni) {
    //start the animation after specified time
    setTimeout(function(){
      progressAnimation();
    },30000)
  }
});

//progress animation function
function progressAnimation(params) {
  progressWrap.each(function () {
    let $this = $(this),
      progressBar = $this.find(".progress"),
      progressText = $this.find(".rate"),
      progressRate = progressText.attr("data-rate");
    //console.log(progressRate);

    progressBar.stop().delay(300).animate({ width: progressRate + "%" }, 4500); //2.5s

    let text = function () {
      $({ rate: 0 }).animate(
        { rate: progressRate },
        {
          duration: 4500,
          progress: function () {
            let now = this.rate;
            //console.log(now);
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
    //console.log(`a height:${ah} img height:${imgh}`);
    img.stop().animate({ top: ah - imgh }, 4000);
  },
  function () {
    let img = $(this).find("img");
    img.stop().animate({ top: 0 }, 4000);
  }
);



/* gallery open toggle*/
const cards = $('.work');
  cards.on({
    click: function (e) {
      e.preventDefault();
      $(this).toggleClass("open");
      
    }
  })


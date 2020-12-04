var welNum = 0;
var welInterval;
var welMax, iswelStop, iswelMove = false;
var welDuration = 5000;

var mainNum = 0;
var mainInterval;
var mainlMax, ismainStop, ismainMove = false;
var mainDuration = 12000;

var mainNum2 = 0;
var mainInterval2;
var mainlMax2, ismainStop2, ismainMove2 = false;
var mainDuration2 = 8000;

var curIntroR = 0;
var maxIntroR;
var isPlay3, ismainStop3, ismainMove3 = false;
var mainDuration3 = 4000;

jQuery(window).load(function(){
	var isTablet = false;
	var state = "web";
	var url = location.href.split("/");
	var urlGb =url[3];

	if(urlGb == "index.nhd"){
		jQuery(".goBody").attr("href","#cBody");
	}else{
		jQuery(".goBody").attr("href","#subCon");
	}

	jQuery(".goBody").css("top","-100px");
	jQuery(".goBody").focusin(function(){
		jQuery(this).css("top", "0");
	}).focusout(function(){
		jQuery(this).css("top","-100px");
	});


	//gnb
	jQuery("#gnb .twoD").fadeOut(0);
	jQuery("#gnbTwo").slideUp(0);

	//2015-10-06 수정시작
	var curGnbone = -1
	jQuery("#gnb .oneD").each(function(q){
		jQuery(this).hover(function(){
			jQuery(this).addClass("on");
			jQuery(this).find("img").attr("src", jQuery(this).find("img").attr("src").replace(".png", "_on.png"));
			jQuery("#header.main").css('background', '#fff');
			jQuery("#gnbTwo .twoBg .twoImg img").eq(q).stop().animate({opacity:1, right:20}, 200);
		}, function(){
			jQuery(this).removeClass("on");
			jQuery(this).find("img").attr("src", jQuery(this).find("img").attr("src").replace("_on.png", ".png"));
			jQuery("#gnbTwo .twoBg .twoImg img").eq(q).stop().animate({opacity:0, right:0}, 200);
		});

		jQuery(this).focusin(function(){
			jQuery(this).addClass("on");
			jQuery("#header.main").css('background', '#fff');
			jQuery("#gnb .twoD").stop().fadeIn(150);
			jQuery("#gnbTwo").stop().slideDown(150);
			jQuery("#gnbTwo .twoBg .twoImg img").eq(q).stop().animate({opacity:1, right:20}, 500);
		});
		jQuery(this).focusout(function(){
			jQuery(this).removeClass("on");
			jQuery("#gnb .twoD").stop().fadeOut(150);
			jQuery("#gnbTwo").stop().slideUp(150);
			jQuery("#gnbTwo .twoBg .twoImg img").eq(q).stop().animate({opacity:0, right:0}, 500);
		});
	});

	jQuery("#gnb").hover(function(){
		jQuery("#gnb .twoD").stop().fadeIn(150);
		jQuery("#gnbTwo").stop().slideDown(150);
		jQuery("#header.main").css('background', '#fff');
	}, function(){
		jQuery("#gnb .twoD").stop().fadeOut(150);
		jQuery("#gnbTwo").stop().slideUp(150);
		jQuery("#header.main").css('background', 'none');
	});

	jQuery("#gnbTwo .twoBg .twoImg").hover(function(){
		jQuery("#gnb .twoD").stop().fadeIn(150);
		jQuery("#gnbTwo").stop().slideDown(150);
		jQuery("#header.main").css('background', '#fff');
	}, function(){
		jQuery("#gnb .twoD").stop().fadeOut(150);
		jQuery("#gnbTwo").stop().slideUp(150);
		jQuery("#header.main").css('background', 'none');
	});

	jQuery("#gnb .twoD").each(function(q){
		jQuery(this).hover(function(){
			jQuery(this).prev("#gnb .oneD").addClass("on");
			jQuery(this).prev("#gnb .oneD").find("img").attr("src", jQuery(this).prev("#gnb .oneD").find("img").attr("src").replace(".png", "_on.png"));
			jQuery("#gnbTwo .twoBg .twoImg img").eq(q).stop().animate({opacity:1, right:20}, 500);
		}, function(){
			jQuery(this).prev("#gnb .oneD").removeClass("on");
			jQuery(this).prev("#gnb .oneD").find("img").attr("src", jQuery(this).prev("#gnb .oneD").find("img").attr("src").replace("_on.png", ".png"));
			jQuery("#gnbTwo .twoBg .twoImg img").eq(q).stop().animate({opacity:0, right:0}, 500);
		});
	});

	jQuery("#gnb .twoD a").hover(function(){
		jQuery(this).addClass("on");
	}, function(){
		jQuery(this).removeClass("on");
	});

	jQuery("#gnb .twoD a").focusin(function(){
		jQuery(this).addClass("on");
		jQuery("#gnb .twoD").stop().fadeIn(150);
		jQuery("#gnbTwo").stop().slideDown(150);
		jQuery("#header.main").css('background', '#fff');
	});
	jQuery("#gnb .twoD a").focusout(function(){
		jQuery(this).removeClass("on");
		jQuery("#gnb .twoD").stop().fadeOut(150);
		jQuery("#gnbTwo").stop().slideUp(150);
	});
	//2015-10-06 수정끝


	//메인
	jQuery("#cBody.main .mainCon .unit").hover(function(){
		jQuery(this).find(".txt").find("img").attr("src", jQuery(this).find(".txt").find("img").attr("src").replace(".png", "_on2.png"));
	}, function(){
		jQuery(this).find(".txt").find("img").attr("src", jQuery(this).find(".txt").find("img").attr("src").replace("_on2.png", ".png"));
	});

	//메인비주얼 2015-10-12수정
	ismainStop = false;
	mainMax = jQuery(".mainVisual .rollDiv").size()-1;
	mainInterval = setInterval("mainRoll()", mainDuration);
	//jQuery(".mainVisual .rollDiv").css('opacity', 0);
	//jQuery(".mainVisual .rollDiv").eq(0).css('opacity', 1);
	jQuery(".mainVisual .rollDiv").fadeOut(0)
	jQuery(".mainVisual .rollDiv").eq(0).fadeIn(0)

	var isPlay = false;
	jQuery(".mainRollBt .stop").click(function(){
		jQuery(this).css('display', 'none');
		jQuery(".mainRollBt .play").css('display', 'inline');
		clearInterval(mainInterval);
		isPlay = true;
	});

	jQuery(".mainRollBt .play").click(function(){
		jQuery(this).css('display', 'none');
		jQuery(".mainRollBt .stop").css('display', 'inline');
		clearInterval(mainInterval);
		mainInterval = setInterval("mainRoll()", mainDuration);
		isPlay = false;
	});

	jQuery(".mainRollBt a").each(function(q){  //좌우버튼
		jQuery(this).click(function(){
			if(!ismainMove) {
				if(q == 0){
					ismainMove = true;
					jQuery(".mainVisual .rollDiv").eq(mainNum).stop().fadeOut(400);
					mainNum--;
					if(mainNum < 0) mainNum = mainMax;
					jQuery(".mainVisual .rollDiv").eq(mainNum).stop().fadeIn(400, function(){
						ismainMove = false;
					});
				}else if(q == 1){
					ismainMove = true;
					jQuery(".mainVisual .rollDiv").eq(mainNum).stop().fadeOut(400);
					mainNum++;
					if(mainNum > mainMax) mainNum = 0;
					jQuery(".mainVisual .rollDiv").eq(mainNum).stop().fadeIn(400, function(){
						ismainMove = false;
					});
				}
			}
		}).hover(function(){
			if(isPlay == false){
				clearInterval(mainInterval);
			}
		}, function(){
			if(isPlay == false){
				clearInterval(mainInterval);
				mainInterval = setInterval("mainRoll()", mainDuration);
			}
		})
	});
	//2015-10-12 수정

	jQuery(".mainVisual .rollDiv .unit a").hover(function(){
		jQuery(this).find("img").attr("src", jQuery(this).find("img").attr("src").replace(".png", "_on.png"));
		clearInterval(mainInterval);
	}, function(){
		jQuery(this).find("img").attr("src", jQuery(this).find("img").attr("src").replace("_on.png", ".png"));
		clearInterval(mainInterval);
		mainInterval = setInterval("mainRoll()", mainDuration);
	});


	//메인 공지사항
	ismainStop2 = false;
	mainMax2 = jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").size()-1;
	//mainInterval2 = setInterval("mainRoll2()", mainDuration2);
	jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").css('top', -59);
	jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").eq(0).css('top', 0);

	jQuery(".maincon2 .bottom .mNoti .btDiv a").each(function(q){
		jQuery(this).click(function(){
			if(!ismainMove2) {
				ismainMove2 = true;
				if(q == 1){
					jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").eq(mainNum2).stop().animate({top:-59}, 500, 'easeOutQuart');
					mainNum2--;
					if(mainNum2 < 0) mainNum2 = mainMax2;
					jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").eq(mainNum2).stop().animate({top:59}, 0);
					jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").eq(mainNum2).stop().animate({top:0}, 500, 'easeOutQuart', function(){
						ismainMove2 = false;
					});
				}else if(q == 0){
					jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").eq(mainNum2).stop().animate({top:59}, 500, 'easeOutQuart');
					mainNum2++;
					if(mainNum2 > mainMax2) mainNum2 = 0;
					jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").eq(mainNum2).stop().animate({top:-59}, 0);
					jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").eq(mainNum2).stop().animate({top:0}, 500, 'easeOutQuart', function(){
						ismainMove2 = false;
					});
				}
			}
		}).hover(function(){
			//clearInterval(mainInterval2);
		}, function(){
			//clearInterval(mainInterval2);
			//mainInterval2 = setInterval("mainRoll2()", mainDuration2);
		})
	});
	jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").hover(function(){
		//clearInterval(mainInterval2);
	}, function(){
		//clearInterval(mainInterval2);
		//mainInterval2 = setInterval("mainRoll2()", mainDuration2);
	});

	//메인유틸
	//jQuery("#header.main").find("span:first").css('display', 'none');

	//메인팝업배너
	var curMpop = 0;
	var maxMpop = jQuery(".mPopBan .mPopCon").size()-1;
	jQuery(".mPopBan .mPopCon").each(function(q){
		jQuery(".mPopBan .mPopCon").eq(q).css('top', 130*q);
	});

	jQuery(".mPopBan .mPopBt a").each(function(q){
		jQuery(this).click(function(){
			if(q == 1){
				jQuery(".mPopBan .mPopCon").eq(curMpop).stop().animate({top:-130}, 300, 'easeOutQuart');
				curMpop++;
				if(curMpop > maxMpop) curMpop = 0;
				jQuery(".mPopBan .mPopCon").eq(curMpop).stop().animate({top:130}, 0, 'easeOutQuart');
				jQuery(".mPopBan .mPopCon").eq(curMpop).stop().animate({top:0}, 300, 'easeOutQuart');
			}else if(q == 0){
				jQuery(".mPopBan .mPopCon").eq(curMpop).stop().animate({top:130}, 300, 'easeOutQuart');
				curMpop--;
				if(curMpop < 0) curMpop = maxMpop;
				jQuery(".mPopBan .mPopCon").eq(curMpop).stop().animate({top:-130}, 0, 'easeOutQuart');
				jQuery(".mPopBan .mPopCon").eq(curMpop).stop().animate({top:0}, 300, 'easeOutQuart');
			}else if(q == 2){
				jQuery(".mPopBan").slideUp(300);
			}
		})
	})

	// 적응형 관련
	jQuery(window).resize(function(){
		if(jQuery(window).width() <= 1262 && jQuery(window).width() > 1006){ //1280

			//리스트
			jQuery(".boardType1 a.listUnit").each(function(q){
				jQuery(".boardType1 a.listUnit").eq(q*3+2).css('marginRight', 0);
				jQuery(".boardType1 a.listUnit:even").css('float', 'left');
				jQuery(".boardType1 a.listUnit:odd").css('float', 'left');
			});

			jQuery(".dbList li").each(function(q){
				jQuery(".dbList li").eq(q*3+2).css('marginRight', 0);
			});

			//팝업
			jQuery("#appliLaypop").css('left' , (jQuery(window).width())/2 - (jQuery("#appliLaypop").width())/2);
			jQuery(".dimBg").css('height', jQuery(document).height());

			//회사소개bg
			jQuery(".introBg").css('height', jQuery(".introInfoDiv").height() + 345);

			//회사소개 gate
			jQuery(".introGateList > a").each(function(q){ // 2015-11-02 introGateList 의 "li" 를 "> a" 로 전체 수정
				jQuery(".introGateList > a").eq(q*4+3).css('marginRight', 22);
			});

			//qna 미로그인
			jQuery(".qnaNmem li").each(function(q){
				jQuery(".qnaNmem li").eq(q*3+2).css('width', 318);
				jQuery(".qnaNmem li").eq(q*3+2).find("div").css('borderRight', 0);
			});

		}else if(jQuery(window).width() <= 1006){ //768
			//리스트
			jQuery(".boardType1 a.listUnit").each(function(q){
				jQuery(".boardType1 a.listUnit").eq(q*3+2).css('marginRight', 0);
				jQuery(".boardType1 a.listUnit:even").css('float', 'left');
				jQuery(".boardType1 a.listUnit:odd").css('float', 'right');
			});

			jQuery(".dbList li").each(function(q){
				jQuery(".dbList li").eq(q*3+2).css('marginRight', 27);
			});

			//팝업
			jQuery("#appliLaypop").css('left' , (jQuery(window).width())/2 - (jQuery("#appliLaypop").width())/2);
			jQuery(".dimBg").css('height', jQuery(document).height());

			//회사소개bg
			jQuery(".introBg").css('height', jQuery(".introInfoDiv").height() + 345);

			//회사소개 gate
			jQuery(".introGateList > a").each(function(q){

			});

			//qna 미로그인
			jQuery(".qnaNmem li").each(function(q){
				jQuery(".qnaNmem li").eq(q*3+2).css('width', 234);
				jQuery(".qnaNmem li").eq(q*3+2).find("div").css('borderRight', 0);
			});

		}else{ //1920
			//gnb

			//리스트
			jQuery(".boardType1 a.listUnit").each(function(q){
				jQuery(".boardType1 a.listUnit").eq(q*3+2).css('marginRight', 0);
				jQuery(".boardType1 a.listUnit:even").css('float', 'left');
				jQuery(".boardType1 a.listUnit:odd").css('float', 'left');
			});

			jQuery(".dbList li").each(function(q){
				jQuery(".dbList li").eq(q*3+2).css('marginRight', 0);
			});

			//팝업
			jQuery("#appliLaypop").css('left' , (jQuery(window).width())/2 - (jQuery("#appliLaypop").width())/2);
			jQuery(".dimBg").css('height', jQuery(document).height());

			//회사소개bg
			jQuery(".introBg").css('height', jQuery(".introInfoDiv").height() + 345);

			//회사소개 gate
			jQuery(".introGateList > a").each(function(q){
				jQuery(".introGateList > a").eq(q*4+3).css('marginRight', 0);
			});

			//qna 미로그인
			jQuery(".qnaNmem li").each(function(q){
				jQuery(".qnaNmem li").eq(q*3+2).css('width', 318);
				jQuery(".qnaNmem li").eq(q*3+2).find("div").css('borderRight', 0);
			});
		}


		//직무소개 2015-09-25 시작
		jQuery(".tab4Div").css('height', jQuery(".roleTab").height() + jQuery(".roleTab .roleDiv").eq(0).height() + 100);

		jQuery(".roleTab .roleDiv").css('top', jQuery(".roleTab").height() + 85);
		//직무소개 2015-09-25 끝

	});jQuery(window).resize();




	/*
	//팝업닫기
	//지원서 작성페이지인 RNAApplPsrn.js 로 이동 (안진용)
	jQuery(".lyPop .lyHead a").click(function(){
		jQuery(this).parent().parent(".lyPop").stop().fadeOut(100);
		jQuery(".dimBg").stop().fadeOut(100);
	})
	*/

	//해더검색
	/*
	var curSrch = false;
	jQuery("#util .srchArea").fadeOut(0);
	jQuery("#util .srchBt").click(function(){
		jQuery("#util .srchArea").stop().fadeIn(150);
	});
	*/

	//사이트맵
	jQuery("#sitemapBody .sitemapDiv dl").eq(0).addClass("fir");
	jQuery("#sitemapBody .sitemapDiv dl").eq(4).addClass("fiv");
	jQuery("#sitemapBody .sitemapDiv dl").eq(5).addClass("six");
	jQuery("#sitemapBody .sitemapDiv dl").eq(6).addClass("sev");
	var curSite = false;
	jQuery("#sitemapBody").slideUp(0);
	jQuery("#header .siteMapOn").fadeOut(0);
	jQuery("#header .siteMap").click(function(){
		jQuery(this).stop().fadeOut(150);
		jQuery("#header .siteMapOn").stop().fadeIn(150);
		jQuery("#sitemapBody").stop().slideDown(150);
		//2016.10.31 김종근 추가 - 웹 접근성 품질인증 -> 초점 이동 설정
		jQuery("#sitemapBody").attr('tabindex', '0').focus();
	});

	//2016.11.03 - 웹 접근성 품질인증 -> 메뉴 레이어 탭에서 벗어날시 자동으로 레이어 닫기
	jQuery("#header .siteMapOn").focusout(function(){
		jQuery(this).stop().fadeOut(150);
		jQuery("#header .siteMap").stop().fadeIn(150);
		jQuery("#sitemapBody").stop().slideUp(150);
		//2019.10.15 오유진 추가 - 웹 접근성 품질인증 -> 상단 사이트맵 닫기 시 사이트맵 열기 버튼으로 포커싱
		jQuery("#header .siteMap").focus();
	});

	jQuery("#header .siteMapOn").click(function(){
		jQuery(this).stop().fadeOut(150);
		jQuery("#header .siteMap").stop().fadeIn(150);
		jQuery("#sitemapBody").stop().slideUp(150);
	});

	//input
	jQuery("input").focusin(function(){
		jQuery(this).removeClass("type2");
		jQuery(this).addClass("type1");
	});
	jQuery("input").focusout(function(){
		jQuery(this).removeClass("type1");
		if(jQuery(this).attr("value") != undefined){
			jQuery(this).addClass("type2");
		}
	});

	// select
	jQuery("select").focusin(function(){
		jQuery(this).removeClass("type2");
		jQuery(this).addClass("type1");
	});
	jQuery("select").focusout(function(){
		jQuery(this).removeClass("type1");
	});

	jQuery("textarea").focusin(function(){
		jQuery(this).removeClass("type2");
		jQuery(this).addClass("type1");
	});
	jQuery("textarea").focusout(function(){
		jQuery(this).removeClass("type1");
		if(jQuery(this).attr("value") != undefined){
			jQuery(this).addClass("type2");
		}
	});



	var tabOpen = false;
	jQuery(".tab6Div .tab6 .tabSub").slideUp(0);
	jQuery(".tab6Div .tab6 .titBt").click(function(){
		if(tabOpen == false){
			jQuery(".tab6Div .tab6 .tabSub").stop().slideDown(200);
			tabOpen = true;
		}else if(tabOpen == true){
			jQuery(".tab6Div .tab6 .tabSub").stop().slideUp(200);
			tabOpen = false;
		}
	});



		//2015-11-02 추가
	jQuery(".introGateList > a").focusin(function(){
		jQuery(this).find(".overDiv2").css('display', 'block');
		jQuery(this).find(".overDiv2").stop().animate({bottom:0}, 350,  'easeOutQuart');
		jQuery(this).find(".overDiv").stop().animate({opacity:0}, 0,  'easeOutQuart');
	}).focusout(function(){
		jQuery(this).find(".overDiv2").css('display', 'none');
		jQuery(this).find(".overDiv2").stop().animate({bottom:-239}, 350,  'easeOutQuart');
		jQuery(this).find(".overDiv").stop().animate({opacity:1}, 0,  'easeOutQuart');
	});


	//회사소개 롤링 2015-10-14수정
	curIntroR = 0;
	maxIntroR = jQuery(".introRoll .rollDiv p").size()-1;
	mainInterval3 = setInterval("mainRoll3()", mainDuration3);
	isPlay3 = false;

	jQuery(".introRoll .rollDiv p").css('left', '100%');
	jQuery(".introRoll .rollDiv p").eq(curIntroR).css('left', 0);

	jQuery(".introRoll .rollDiv .bts .stop").click(function(){
		jQuery(this).css('display', 'none');
		jQuery(".introRoll .rollDiv .bts .play").css('display', 'inline');
		clearInterval(mainInterval3);
		isPlay3 = true;
	});

	jQuery(".introRoll .rollDiv .bts .play").click(function(){
		jQuery(this).css('display', 'none');
		jQuery(".introRoll .rollDiv .bts .stop").css('display', 'inline');
		clearInterval(mainInterval3);
		mainInterval3 = setInterval("mainRoll3()", mainDuration3);
		isPlay3 = false;
	});


	

	jQuery(".welfareDiv .welRbt").each(function(q){ //썸네일
		jQuery(this).click(function(){
			if(!iswelMove) {
				iswelMove = true;
				if(welNum !=q) {
					if(welNum<q) {
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"-100%"}, 500);
						jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src", jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src").replace("_on.png", ".png"));
						welNum = q;
						jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src", jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src").replace(".png", "_on.png"));
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"100%"}, 0);
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"0"}, 500, function(){
							iswelMove = false;
						});
					} else if(welNum>q) {
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"100%"}, 500);
						jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src", jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src").replace("_on.png", ".png"));
						welNum = q;
						jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src", jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src").replace(".png", "_on.png"));
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"-100%"}, 0);
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"0"}, 500, function(){
							iswelMove = false;
						});
					}
				}else if(welNum == q){
					iswelMove = false;
				}
			}
		}).hover(function(){
				if(iswelStop == false){
					clearInterval(welInterval);
				}
			}, function(){
				if(iswelStop == false){
					clearInterval(welInterval);
					welInterval = setInterval("welRoll()", welDuration);
				}
		})
	});

	jQuery(".welfareDiv .btPack .controll a").each(function(q){  //좌우버튼
		jQuery(this).click(function(){
			if(q != 2){
				if(!iswelMove) {
					iswelMove = true;
					if(q == 0){
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"100%"}, 500);
						jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src", jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src").replace("_on.png", ".png"));
						welNum--;
						if(welNum < 0) welNum = welMax;
						jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src", jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src").replace(".png", "_on.png"));
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"-100%"}, 0);
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"0"}, 500, function(){
							iswelMove = false;
						});
					}else if(q == 1){
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"-100%"}, 500);
						jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src", jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src").replace("_on.png", ".png"));
						welNum++;
						if(welNum > welMax) welNum = 0;
						jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src", jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src").replace(".png", "_on.png"));
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"100%"}, 0);
						jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"0"}, 500, function(){
							iswelMove = false;
						});
					}
				}
			}
		}).hover(function(){
				if(iswelStop == false){
					clearInterval(welInterval);
				}
			}, function(){
				if(iswelStop == false){
					clearInterval(welInterval);
					welInterval = setInterval("welRoll()", welDuration);
				}
		})
	});

	//리스트
	jQuery(".boardType1 a.listUnit .onbg").fadeOut(0);
	jQuery(".boardType1 a.listUnit").hover(function(){
		jQuery(this).find(".onbg").stop().fadeIn(100);
	}, function(){
		jQuery(this).find(".onbg").stop().fadeOut(100);
	});

	//뷰 첨부파일
	var curAddFile = false;
	jQuery(".boardType1 dd .addFileDiv").css('opacity', 0);
	jQuery(".boardType1 dd .addFile").click(function(){
		if(curAddFile == false){
			jQuery(".boardType1 dd .addFileDiv").stop().animate({opacity : 1, top : 48}, 200);
			curAddFile = true;
		}
	});

	jQuery(".boardType1 dd .addFileDiv a.xbt").click(function(){
		if(curAddFile == true){
			jQuery(".boardType1 dd .addFileDiv").stop().animate({opacity : 0, top : 38}, 200);
			curAddFile = false;
		}
	});

	//현대백화점그룹 채용 이야기 리스트
	jQuery(".hgStory li").each(function(q){
		jQuery(this).hover(function(){
			jQuery(this).find(".onbg").height(jQuery(this).height()- 6);
			jQuery(this).find(".onbg").stop().fadeIn(150);
		}, function(){
			jQuery(this).find(".onbg").stop().fadeOut(150);
		})
	});

	//이력관리 사진등록확인
	jQuery(".checkTxt.type1").animate({top : 300, opacity : 0}, 0);
	jQuery(".checkTxt.type2").animate({top : 0, opacity : 0}, 0);
	jQuery(".checkTxt.type3").animate({top : -4, opacity : 0}, 0);
	jQuery(".checkTxt.type1").fadeOut(0);
	jQuery(".checkTxt.type2").fadeOut(0);
	jQuery(".checkTxt.type3").fadeOut(0);
	jQuery(".profileDiv .check").hover(function(){
		jQuery(".profileDiv .checkTxt.type1").stop().fadeIn(0, function(){
			jQuery(".profileDiv .checkTxt.type1").stop().animate({top : 310, opacity : 1}, 150);
		});
	}, function(){
		jQuery(".profileDiv .checkTxt.type1").stop().fadeOut(0, function(){
			jQuery(".profileDiv .checkTxt.type1").stop().animate({top : 300, opacity : 0}, 150);
		});
	});

	//2017.10.18 김종근 추가 - 웹 접근성 <사진등록> 도움말 툴팁 기능 추가(마우스 이벤트뿐만 아니라 키보드 이벤트에서도 가능하게끔)
	jQuery(".profileDiv .check").attr('tabindex', '0').focus(function(){
		jQuery(".profileDiv .checkTxt.type1").stop().fadeIn(0, function(){
			jQuery(".profileDiv .checkTxt.type1").stop().animate({top : 310, opacity : 1}, 150);
		});
	});

	//2017.10.18 김종근 추가 - 웹 접근성 <사진등록> 도움말 툴팁 기능 추가(마우스 이벤트뿐만 아니라 키보드 이벤트에서도 가능하게끔)
	jQuery(".profileDiv .check").attr('tabindex', '0').focusout(function(){
		jQuery(".profileDiv .checkTxt.type1").stop().fadeOut(0, function(){
			jQuery(".profileDiv .checkTxt.type1").stop().animate({top : 300, opacity : 0}, 150);
		});
	});

	jQuery(".profileDiv .check2").hover(function(){
		jQuery(".profileDiv .checkTxt.type2").stop().fadeIn(0, function(){
			jQuery(".profileDiv .checkTxt.type2").stop().animate({top : 4, opacity : 1}, 150);
		});
	}, function(){
		jQuery(".profileDiv .checkTxt.type2").stop().fadeOut(0, function(){
			jQuery(".profileDiv .checkTxt.type2").stop().animate({top : 0, opacity : 0}, 150);
		});
	});

	//2017.10.18 김종근 추가 - 웹 접근성 <이름변경> 도움말 툴팁 기능 추가(마우스 이벤트뿐만 아니라 키보드 이벤트에서도 가능하게끔)
	jQuery(".profileDiv .check2").attr('tabindex', '0').focus(function(){
		jQuery(".profileDiv .checkTxt.type2").stop().fadeIn(0, function(){
			jQuery(".profileDiv .checkTxt.type2").stop().animate({top : 4, opacity : 1}, 150);
		});
	});

	//2017.10.18 김종근 추가 - 웹 접근성 <이름변경> 도움말 툴팁 기능 추가(마우스 이벤트뿐만 아니라 키보드 이벤트에서도 가능하게끔)
	jQuery(".profileDiv .check2").attr('tabindex', '0').focusout(function(){
		jQuery(".profileDiv .checkTxt.type2").stop().fadeOut(0, function(){
			jQuery(".profileDiv .checkTxt.type2").stop().animate({top : 0, opacity : 0}, 150);
		});
	});


	//boardtype
	jQuery(".boardType2 th").last().css('borderRight', 'none');
	jQuery(".boardType3 th").last().css('borderRight', 'none');
	jQuery(".tab2 a").last().css('backgroundImage', 'none');
	jQuery(".tab3 a").last().css('marginRight', 0);
	jQuery(".boardType2 tr").each(function(q){
		jQuery(this).find("td").last().css('borderRight', 'none');
	});
	jQuery(".boardType3 tr").each(function(q){
		jQuery(this).find("td").last().css('backgroundImage', 'none');
	});

	//캠리 마이크로 lnb
	jQuery(".crType3 .crSubDiv .crMenu").css('height', jQuery(".crType3 .crSubDiv .crSub").height() + 205);

	//에디터 이미지 리사이징
	if(jQuery(".easyEditViewStyle").length > 0)
	{
		jQuery(".easyEditViewStyle").find("img").each(function(i){
			var imgWidth = this.naturalWidth;
			if(imgWidth > 900)
			{
				jQuery(this).css("width", "100%");
				jQuery(this).css("height", "auto");
			}
		});

		jQuery(".easyEditViewStyle").find("a").each(function(i){
			var tmpAttr = jQuery(this).attr("target");

			if(typeof tmpAttr != "undefined" && tmpAttr == "_blank")
			{
				jQuery(this).attr("title", "새창열림");
			}
		});
	}

	//파일 다운로드 url re_setting
	var tmpHost = location.host;

	if(tmpHost.indexOf("recruit.ehyundai.com") > -1)
	{
		jQuery("a").each(function(){
			var tmpHref = jQuery(this).attr("href");

			if(tmpHref.indexOf("/co/fileDownload.nhd") == 0)
			{
				jQuery(this).attr("href", "http://recruit.ehyundai.com"+tmpHref);
			}
		});
	}

	//메인 채용정보 2017-09-11 추가
	$("#cBody.main .mainCon .unitDiv").each(function(index){
		$(this).css("top", index * 101);
	});

	var unitRollMax = $("#cBody.main .mainCon .unitDiv").size()-1;
	var unitRollMove = false, unitRollInterval, unitRollTime = 3000;
	var unitDetachFirst;
	if($("#cBody.main .mainCon .unitDiv").size()-1 <= 4) unitRollMove = true;
	unitRollInterval = setInterval(function(){
		if(!unitRollMove) {
			unitRollMove = true;
			$("#cBody.main .mainCon .unitDiv").each(function(q){
				TweenMax.to($("#cBody.main .mainCon .unitDiv").eq(q), 0.7, {top:parseInt($("#cBody.main .mainCon .unitDiv").eq(q).css("top").split("p")[0]) - 101, ease:Power3.easeOut, onComplete:function(){
					unitRollMove = false;
					if(q == 0) unitDetachFirst = $("#cBody.main .mainCon .unitDiv").eq(0).detach();
					$("#cBody.main .mainCon").append(unitDetachFirst);
					$("#cBody.main .mainCon .unitDiv:last").css("top", 101 * unitRollMax);
				}});
			});
		}
	}, unitRollTime);

	/* 2017-10-16 수정 */
	$("#cBody.main .mainConBtn .stopBtn").click(function(){
		clearInterval(unitRollInterval);
	});

	$("#cBody.main .mainConBtn .playBtn").click(function(){
		clearInterval(unitRollInterval);
		unitRollInterval = setInterval(function(){
			if(!unitRollMove) {
				unitRollMove = true;
				$("#cBody.main .mainCon .unitDiv").each(function(q){
					TweenMax.to($("#cBody.main .mainCon .unitDiv").eq(q), 0.7, {top:parseInt($("#cBody.main .mainCon .unitDiv").eq(q).css("top").split("p")[0]) - 101, ease:Power3.easeOut, onComplete:function(){
						unitRollMove = false;
						if(q == 0) unitDetachFirst = $("#cBody.main .mainCon .unitDiv").eq(0).detach();
						$("#cBody.main .mainCon").append(unitDetachFirst);
						$("#cBody.main .mainCon .unitDiv:last").css("top", 101 * unitRollMax);
					}});
				});
			}
		}, unitRollTime);
	});
	/* //2017-10-16 수정 */


});

//2015-10-12 수정
function mainRoll() {
	jQuery(".mainVisual .rollDiv").eq(mainNum).stop().fadeOut(400);
	mainNum++;
	if(mainNum > mainMax) mainNum = 0;
	jQuery(".mainVisual .rollDiv").eq(mainNum).stop().fadeIn(400);
}
//2015-10-12 수정

function mainRoll2() {
	jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").eq(mainNum2).stop().animate({top:-59}, 500, 'easeOutQuart');
	mainNum2++;
	if(mainNum2 > mainMax2) mainNum2 = 0;
	jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").eq(mainNum2).stop().animate({top:59}, 0, 'easeOutQuart');
	jQuery(".maincon2 .bottom .mNoti .mNotiDiv a").eq(mainNum2).stop().animate({top:0}, 500, 'easeOutQuart');
}

//2015-10-14 수정
function mainRoll3() {
	jQuery(".introRoll .rollDiv p").eq(curIntroR).stop().animate({left : '-100%'}, 350, 'easeOutQuart');
	curIntroR --;
	if(curIntroR < 0){
		curIntroR = maxIntroR;
	};
	jQuery(".introRoll .rollDiv p").eq(curIntroR).stop().animate({left : '100%'}, 0);
	jQuery(".introRoll .rollDiv p").eq(curIntroR).stop().animate({left : 0}, 350, 'easeOutQuart');
}
//2015-10-14 수정



function welRoll() {
	if(welMax > 0){
		jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"-100%"}, 500);
		if(jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src") != undefined) jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src", jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src").replace("_on.png", ".png"));
		welNum++;
		if(welNum > welMax) welNum = 0;
		if(jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src") != undefined) jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src", jQuery(".welfareDiv .welRbt").eq(welNum).find("img").attr("src").replace(".png", "_on.png"));
		jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"100%"}, 0);
		jQuery(".welfareDiv .welRoll").eq(welNum).stop().animate({left:"0"}, 500);
	}
}







/**
 *
 * 계열사 홈페이지 이동
 *
 * @date 2015. 08. 07.
 * @author Park, Ju Seok
 * @example
 * getSelectBoxCodeList(code, select, val);
 */
function moveFooterAflt()
{
	if(jQuery("#selectAflt").val() != "")
	{
		window.open(jQuery("#selectAflt").val());
	}else{
		alert("계열사를 선택하여 주십시오.");
		jQuery("#selectAflt").focus();
		return;
	}
}

/**
 *
 * LNB 초기화
 *
 * @date 2015. 08. 07.
 * @author Park, Ju Seok
 * @example *
 */
jQuery(window).load(function(){
	//LNB 타이틀에 따른 메뉴 on 클래스 추가
	var title = jQuery("#lnb").attr("title");
	jQuery("#lnb").find(".nav").find("a").each(function(q){
		if(jQuery(this).find("span").text() == title)
		{
			jQuery(this).addClass("on");
		}
	})

	if(jQuery("#lnb").find(".nav").find(".twoD").size() > 0)
	{
		var title = jQuery("#lnb").find(".nav").find(".twoD").attr("title");
		jQuery("#lnb").find(".nav").find(".twoD").find("a").each(function(q){
			if(jQuery(this).text() == title)
			{
				jQuery(this).addClass("on");
			}
		})
	}
})

/**
 *
 * 로그 찍기
 *
 * @date 2015. 08. 07.
 * @author Park, Ju Seok
 * @example *
 */
function trace(str)
{
	if(console)
	{
		console.log(str);
	}
}



/**
 * 비밀번호를 체크한다.
 *
 * @date 2014. 12. 10.
 * @memberOf valLib
 * @param <String> str 비밀번호
 * @return <Boolean> 정상이면 true 반환, 그외는 false
 * @example valLib.checkPassword("asdfasdsd2df")
 */
function checkPassword(str)
{
	if (typeof str != "undefined" && str != "")
	{
    	var lowCharCnt = 0;
    	var uppCharCnt = 0;
    	var numCharCnt = 0;
    	var spcCharCnt = 0;
    	var kindCnt = 0;

        var lowCharFormat 	= /["a-z"]/;
		var uppCharFormat 	= /["A-Z"]/;
		var numFormat 		= /["0-9"]/;
		var spcCharFormat = /["_+-=|<>?'!@#^&*()"]/; //2017.10.19 김종근 추가 스크립트 단에서 특수문자 체크

		for(var i=0; i<str.length; i++){
			var strUnt = str.charAt(i);

			if(isKorean(strUnt)){
	    		return false;
	    	}

			if(lowCharFormat.test(strUnt)) {
	            lowCharCnt += 1;
	        }else if(uppCharFormat.test(strUnt)){
	            uppCharCnt += 1;
	        }else if(numFormat.test(strUnt)){
	            numCharCnt += 1;
	        }else if (spcCharFormat.test(strUnt)){	//2017.10.19 김종근 추가 스크립트 단에서 특수문자 체크
	        	spcCharCnt += 1;
	        }else{
	            spcCharCnt += 1;
	        }
		}

		if(lowCharCnt > 0){
			kindCnt += 1;
		}
		if(uppCharCnt > 0){
			kindCnt += 1;
		}
		if(numCharCnt > 0){
			kindCnt += 1;
		}
		if(spcCharCnt > 0){
			kindCnt += 1;
		}

		//2017.10.19 김종근 수정 - 대문자, 소문자, 특수문자, 숫자 종류가 모두 포함되어야 OK
		if(kindCnt < 4){
			return false;
		}else if(kindCnt == 4 && str.length < 10){
			return false;
		}else if(kindCnt > 4 && str.length < 8){
			return false;
		}else{
			return true;
		}
    }
	return false;
}

/**
 * 입력받은 문자열이 한글이면 true, 아니면 false를 리턴한다.
 *
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param str : 문자열
 * @return 한글이 포함되어 있으면 true, 아니면 false
 * @example strLib.isKorean("무궁화꽃이");
 */
function isKorean(str) {

    if (str != null && str.length > 0) {
        var locale = 0;
        for ( var i = 0; i < str.length; i++) {
            locale = getLocale(str.charAt(i));
        }
        if ((locale & ~0x3) == 0) {
            return true;
        }
    }
    return false;
};

/**
 * 문자(char)의 유형을 리턴한다.
 *
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> str 문자(char)
 * @return <Number> 한글음절(1), 한글자모(2), 숫자(4), 특수문자(8), 영문대(16), 영문소(32), 기타(48)
 * @example strLib.getLocale(str);
 */
function getLocale(str) {
    var locale = 0;
    if (str.length > 0) {
        var charCode = str.charCodeAt(0);

        if (charCode >= 0XAC00 && charCode <= 0XD7A3) { // 한글음절.[ 44032 ~ 55203 ]
            locale = 0X1; // 1
        } else if ((charCode >= 0X1100 && charCode <= 0X11F9) || (charCode >= 0X3131 && charCode <= 0X318E)) { // 한글자모.[ 4352 ~ 4601 ]
            locale = 0X2; // 2
        } else if (charCode >= 0X30 && charCode <= 0X39) { // 숫자.[ 48 ~ 57 ]
            locale = 0X4; // 4
        } else if ((charCode >= 0X20 && charCode <= 0X2F) || (charCode >= 0X3A && charCode <= 0X40) || (charCode >= 0X5B && charCode <= 0X60)
                || (charCode >= 0X7B && charCode <= 0X7E)) { // 특수문자
            locale = 0X8; // 8
        } else if (charCode >= 0X41 && charCode <= 0X5A) { // 영문 대.[ 65 ~ 90 ]
            locale = 0X10; // 16
        } else if (charCode >= 0X61 && charCode <= 0X7A) { // 영문 소.[ 97 ~ 122 ]
            locale = 0X20; // 32
        } else { // 기타
            locale = 0X30; // 48
        }
    }
    return locale;
};


/**
 * 팝업 띄우기
 *
 * @date 2014. 12. 10.
 * @memberOf strLib
 * @param <String> url
 * @param <String> id
 * @param <String> 속성
 * @return <Number>
 * @example openPop(url, id, style);
 */
function openPop(url, id, style) {
	var id = window.open(url,id, style);
};


/**
 *
 * 문자열 자르기
 *
 * @date 2015. 06. 30.
 * @param {String} 문자열
 * @example
 * setPageList(ds_list, pageList1);
 */
function getLengthString(textarea, num) {
    var len = 0;
    var rtnStr = "";
    var isNum;
    var str = textarea.value;
    if(str.length >= num)
    {
	    for (var i = 0; i < num; i++)
	    {
	    	rtnStr = rtnStr + str.charAt(i);
	    }
	    textarea.value = rtnStr;
	    jQuery(textarea).parent().find(".minInsrCharCnt").text(rtnStr.length);
	    alert("최대 글자수를 넘겼습니다.");
	    return false;
    }
    rtnStr = str;
    jQuery(textarea).parent().find(".minInsrCharCnt").text(rtnStr.length);
    return true;
}

/**
 *
 * 숫자만 나오기
 *
 * @date 2015. 08. 18.
 * @param
 * @example
 * setPageList(ds_list, pageList1);
 */
function onKeyDownNumber() {
	var keyCode = event.keyCode;
	if ( ((keyCode < 33) || (keyCode > 40)) && ((keyCode < 48) || (keyCode > 57)) && ((keyCode < 96) || (keyCode > 105)) && (keyCode !== 8) && (keyCode !== 9) && (keyCode != 13) && (keyCode != 46) && (keyCode != 144) && (keyCode != 110)  && (keyCode != 190))
	{
		event.returnValue=false;
		return;
	}
}

/**
 *
 * 0자 붙이기
 *
 * @date 2015. 08. 18.
 * @param
 * @example
 * setPageList(ds_list, pageList1);
 */
function getZero(num)
{
	var str = "";
	if(num < 10)
	{
		str = "0" + num;
	}
	else
	{
		str = num;
	}
	return str;
}


/**
 *
 * 쿠키 값을 셋팅한다.
 *
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <String> name 쿠키 명
 * @param <String> value 쿠키 값
 * @param <Number> 저장할 기간 (일)
 * @author Park, Sang Kyu
 * @example
 * comLib.setCookie("userid", "done", 7)
 */
function setCookie(name, value, expiredays)
{
//    var today = new Date();
//    today.setDate(today.getDate() + expiredays);
//    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString() + "; httpOnly;";
  jQuery.ajax({
		type : "POST",
		url : "/co/setCookie.nhd",
		data:"name=" + name + "&value=" + value + "&expiredays=" + expiredays,
		success:function(data){
		},
		error:function(event)
		{
			//alert("잠시후 다시 시도 바랍니다.");
		}
	});
};

/**
 *
 * 셋팅한 쿠키 값을 가져온다.
 *
 * @date 2014. 12. 10.
 * @memberOf comLib
 * @param <String> name 쿠키 명
 * @param <String> value 쿠키 값
 * @return <String> 쿠키 명에 해당하는 쿠키 값 가져온다.
 * @author Park, Sang Kyu
 * @example
 * var ret = comLib.getCookie("userid");
 */
function getCookie(name)
{
    var cook = document.cookie + "; secure;";
    var idx = cook.indexOf(name, 0);
    var val = "";
    if (idx != -1) {
        cook = cook.substring(idx, cook.length);
        begin = cook.indexOf("=", 0) + 1;
        end = cook.indexOf(";", begin);
        val = unescape(cook.substring(begin, end));
    }
    return val;
};

/**
 *
 * 주민번호 인증
 *
 * @date 2015. 09. 06.
 * @param <String> name 주민번호 *
 * @author Park, Sang Kyu
 * @example
 */
function check_jumin(jumin) {
	 //주민등록 번호 13자리를 검사한다.
	  var fmt = /^\d{6}[1234]\d{6}$/;  //포멧 설정
	  if (!fmt.test(jumin)) {
	   return false;
	  }

	  // 생년월일 검사
	  var birthYear = (jumin.charAt(6) <= "2") ? "19" : "20";
	  birthYear += jumin.substr(0, 2);
	  var birthMonth = jumin.substr(2, 2) - 1;
	  var birthDate = jumin.substr(4, 2);
	  var birth = new Date(birthYear, birthMonth, birthDate);

	  if ( birth.getYear() % 100 != jumin.substr(0, 2) ||
	       birth.getMonth() != birthMonth ||
	       birth.getDate() != birthDate) {
	     return false;
	  }

	  // Check Sum 코드의 유효성 검사
	  var buf = new Array(13);
	  for (var i = 0; i < 13; i++) buf[i] = parseInt(jumin.charAt(i));

	  multipliers = [2,3,4,5,6,7,8,9,2,3,4,5];
	  for (var sum = 0, i = 0; i < 12; i++) sum += (buf[i] *= multipliers[i]);

	  if ((11 - (sum % 11)) % 10 != buf[12]) {
	     return false;
	  }
	  return true;
}

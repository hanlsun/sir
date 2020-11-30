		/*
			Version
			0.2.0 - ExceptionRequiredClass 클래스 변수 추가
			        필수값의 메시지를 기본 기능(알럿창)을 사용하지 않고 커스텀화면이 필요시에 사용함.

			0.1.9 - 비동기로 폼 전송 가능, comma 기능 추가

			0.1.8 -  name 값으로 경고메시지 작성
					 자동 하이픈 기능 추가(mobileChk, phoneChk 두개이 클래스가 적용된 input에 적용)
					 placeholder 기능 추가

			0.1.7 -  서브밋 전에 확인창을 띄워준다.

			0.1.6 -  비필수값이고 특정문자만 입력받는 칸일 경우 값이 입력되어 있으면 정규식 검사를 실행한다.

			0.1.5 - customFunc 추가
						- 추가한 이유 : 아이디 중복 검삭, 이메일 중복 검사 등 중간에 어떤 확인이 필요한 작업이 있을때

			0.1.4 - 현재 비밀번호, 새로운 비밀번호를 입력할때 subClassName 추가

			0.1.3 -  동일한 페이지에  폼이 1개 이상일때 비밀번호 클래스 중복 수정
						$('.' + passChkClass).val()  -> $this.find('.' + passChkClass).val()

			0.1.2 - 각 벨류데이션 검사 시점에 사용자 정의 함수를 실행 기능 추가
			          - input[type=hidden], input[type=file] 검사 추가

			0.1.1 - 이메일 정규식 수정(특수문자 \ 문자열로 처리시 \\ 로 처리해야됨)
			          - 라디오버튼 notRequiredClass 클래스 검사 조건 추가
					  - 라디오버튼, 체크박스 경고문자는 name별로 별도 지정할 수 있도록 수정
		*/
		
		/*
		### 전체 속성 및 기본값 ###
		$('.validation').validation({
			notRequiredClass : "notRequired",
			validateType : {
				idChk : {
					className : "idChk",
					regExr : "^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{4,12}$"
				},
				passChk : {
					className : "passChk",
					subClassName : "passChkSub",
					regExr : "^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{4,12}$",
					equalClass : "passEqual"
				},
				emailChk : {
					className : "emailChk",
					regExr : "^[_a-zA-Z0-9-\\.\\_]+@[\\.a-zA-Z0-9-]+\\.[a-zA-Z]+$"
				},
				numberChk : {
					className : "numberChk",
					regExr : "^[0-9]+$"
				},
				lengthLimitChk : {
					className : "lengthChk",
					min : 2,
					max : 4
				},
				mobileNumChk : {
					className : "mobileChk",
					regExr : "^([0]{1}[0-9]{2})-([1-9]{1}[0-9]{2,3})-([0-9]{4})$"
				},
				phoneNumChk : {
					className : "phoneChk",
					regExr : "^([0]{1}[0-9]{1,2})-([1-9]{1}[0-9]{2,3})-([0-9]{4})$"
				},
				englishChk : {
					className : "englishChk",
					regExr : "^[a-zA-Z]+$"
				},
				koreanChk : {
					className : "koreanChk",
					regExr : "^[가-힣]+$"
				}
			},
			msg : {
				type : "alert"
			    empty : {
					text : "값을 입력해주세요.",
					password : "비밀번호를 입력해주세요.",
					passwordChk : "비밀번호 확인란을 입력해주세요.",
					radio : "라디오 버튼 값을 선택해주세요.",
					checkbox : "체크박스 값을 한개 이상 선택해주세요.",
					select : "값을 선택해주세요."
			    },
			    idChk : "아이디 입력값이 올바르지 않습니다.\n(알파벳 소문자 + 숫자, 4 ~ 12자로 입력합니다.",
			    passChk : "패스워드 입력값이 올바르지 않습니다.\n(알파벳 소문자 + 숫자 , 4~12자로 입력합니다.)",

			    passEqualChk : "입력한 패스워드와 일치하여야 합니다.",
			    emailChk : "이메일 입력값이 올바르지 않습니다.",
			    numberChk : "숫자만 입력가능합니다.",
			    lengthLimitChk : "길이가 조건에 맞지 않습니다.",
			    mobileNumChk : "핸드폰번호는 010-1234-5678 형식으로 입력되어야 합니다.",
			    phoneNumChk : "전화번호는 02-1234-5678 형식으로 입력되어야 합니다.",
			    englishChk : "영문만 입력하실 수 있습니다.",
			    koreanChk : "한글만 입력하실 수 있습니다."
			}
		});

		#################### 속성 설명 ####################
		* 해당 플러그인은 기본으로 빈값 검사가 이루어집니다.
		* 빈값에 대한 메시지는 기본값(or 정의값)에 해당 태그의 타이틀(title)값을 붙여서 설정됩니다.  타이틀(title) + 기본값(or 정의값)
		    만약 타이틀(title)값의 위치를 원하는 위치에 나타나도록 하고 싶다면 정의값에 {title}을 원하는 위치에 추가해주시면 됩니다.

		notRequiredClass		// 빈값인 경우에 검사를 하지 않아도 될 경우 해당 속성의 값(클래스명)을 추가한다.
		validateType : {			// 벨리데이션 종류를 모아놓은 속성입니다.
			idChk : {					// 아이디 형식을 검사할 때 사용하는 속성입니다.
				className			// className의 값(클래스명)에 해당되는 태그를 검사합니다. 기본값은 "idChk" 입니다.
				regExr					// 검사할때 쓰이는 정규식 속성입니다. 기본값은 영문 + 숫자 혼합 4~12자 입니다.
			},
			passChk : {				// 패스워드 형식을 검사할 때 사용하는 속성입니다.
				className :		// className의 값(클래스명)에 해당되는 태그를 검사합니다. 기본값은 "passChk" 입니다.
				subClassName :		// className의 값(클래스명)에 해당되는 태그를 검사합니다. 기본값은 "passChkSub" 입니다.
				regExr :				// 검사할때 쓰이는 정규식 속성입니다. 기본값은 영문 + 숫자 혼합 4~12자 입니다.
				equalClass :		// 입력한 패스워드를 다시 확인하는 태그에 사용되는 속성입니다. 기본값은 "passEqual" 입니다.
			},
			emailChk : {			// 이메일 형식을 검사할 때 사용하는 속성입니다.
				className :		// className의 값(클래스명)에 해당되는 태그를 검사합니다. 기본값은 "emailChk" 입니다.
				regExr :				// 검사할때 쓰이는 정규식 속성입니다.
			},
			numberChk : {		// 숫자만 입력 받을 때 사용하는 속성입니다.
				className :		// className의 값(클래스명)에 해당되는 태그를 검사합니다. 기본값은 "numberChk" 입니다.
				regExr :				// 검사할때 쓰이는 정규식 속성입니다.
			},
			lengthLimitChk : {	// 길이를 검사할 때 사용하는 속성입니다.
				className :		// className의 값(클래스명)에 해당되는 태그를 검사합니다. 기본값은 "lengthChk" 입니다.
				min :					// 최소 길이 값 속성입니다. 기본값은 2 입니다.
				max :					// 최대 길이 값 속성입니다. 기본값은 4 입니다.
			},
			mobileNumChk : {	// 핸드폰 형식을 검사할 때 사용하는 속성입니다.
				className :		// className의 값(클래스명)에 해당되는 태그를 검사합니다. 기본값은 "mobileChk" 입니다.
				regExr :				// 검사할때 쓰이는 정규식 속성입니다.
			},
			phoneNumChk : {	// 유선전화 형식을 검사할 때 사용하는 속성입니다.
				className :		// className의 값(클래스명)에 해당되는 태그를 검사합니다. 기본값은 "phoneChk" 입니다.
				regExr :				// 검사할때 쓰이는 정규식 속성입니다.
			},
			englishChk : {			// 영문만 입력 받을 때 사용하는 속성입니다.
				className :		// className의 값(클래스명)에 해당되는 태그를 검사합니다. 기본값은 "englishChk" 입니다.
				regExr :				// 검사할때 쓰이는 정규식 속성입니다.
			},
			koreanChk : {			// 한글만 입력 받을 때 사용하는 속성입니다.
				className :		// className의 값(클래스명)에 해당되는 태그를 검사합니다. 기본값은 "koreanChk" 입니다.
				regExr :				// 검사할때 쓰이는 정규식 속성입니다.
			}
		},
		msg : {							// 경고문구 종류를 모아놓은 속성입니다.
			type : "alert"			// 경고문구를 보여줄때 알럿창 or 레이어창을 선택
			empty : {					// 빈값을 경우에 보여주는 문구입니다.
				text :					// input type=text 인 경우에 보여주는 문구입니다. 기본값은 "값을 입력해주세요." 입니다.
				password :			// input type=password 인 경우에 보여주는 문구입니다. 기본값은 "비밀번호를 입력해주세요." 입니다.
				passwordChk :	// input type=password 인 경우이면서 equalClass에 해당되는 클래스를 가지고있을때 보여주는 문구입니다. 기본값은 "비밀번호 확인란을 입력해주세요." 입니다. 
				radio :				// input type=radio 인 경우에 보여주는 문구입니다. 기본값은 "라디오 버튼 값을 선택해주세요." 입니다.
				checkbox : 				// input type=checkbox 인 경우에 보여주는 문구입니다. 기본값은 "체크박스 값을 한개 이상 선택해주세요." 입니다.
				select :				// select 인 경우에 보여주는 문구입니다. 기본값은 "값을 선택해주세요."  입니다.
			},
			idChk :						// 아이디 검사시 보여주는 문구입니다. 기본값은 "아이디 입력값이 올바르지 않습니다.\n(알파벳 소문자 + 숫자, 4 ~ 12자로 입력합니다." 입니다.
			passChk :				// 비밀번호 검사시 보여주는 문구입니다. 기본값은 "패스워드 입력값이 올바르지 않습니다.\n(알파벳 소문자 + 숫자 , 4~12자로 입력합니다.)" 입니다.
			passEqualChk :		// 비밀번호 확인 검사시 보여주는 문구입니다. 기본값은 "입력한 패스워드와 일치하여야 합니다." 입니다.
			emailChk :				// 이메일 검사시 보여주는 문구입니다. 기본값은 "이메일 입력값이 올바르지 않습니다." 입니다.
			numberChk :			// 숫자 검사시 보여주는 문구입니다. 기본값은 "숫자만 입력가능합니다." 입니다.
			lengthLimitChk :	// 길이 검사시 보여주는 문구입니다. 기본값은 "길이가 조건에 맞지 않습니다." 입니다.
			mobileNumChk :	// 핸드폰번호 검사시 보여주는 문구입니다. 기본값은 "핸드폰번호는 010-1234-5678 형식으로 입력되어야 합니다." 입니다.
			phoneNumChk :		// 유선전화번호 검사시 보여주는 문구입니다. 기본값은 "전화번호는 02-1234-5678 형식으로 입력되어야 합니다." 입니다.
			englishChk :			// 영문 검사시 보여주는 문구입니다. 기본값은 "영문만 입력하실 수 있습니다." 입니다.
			koreanChk :			// 한글 검사시 보여주는 문구입니다. 기본값은 "한글만 입력하실 수 있습니다." 입니다.
		}
		##################################################
		*/

	

(function($){	

	$.fn.validation = function(options){
		var $this = this;
		var notRequired, notRequiredFlag;
		var isOk = true, tagType, tagTypeValue, tagNameValue, tagName, tagTitle, tagID;
		var message = "", patten, regResult;
		var regExrs = {
			idExr : "",
			passExr : "",
			emailExr : "",
			numberExr : "",
			mobileExr : "",
			phoneExr : "",
			englishExr : "",
			koreanExr : ""
		};
		var rtnFunc;
		var version = $.browser.version;

		var msg = {
			empty : {
				text : "",
				password : "",
				passwordChk : "",
				select : "",
				radio : "",
				checkbox : "",
				textarea : ""
			},
			idChk : "",
			passChk : "",
			passEqualChk : "",
			emailChk : "",
			numberChk : "",
			lengthLimitChk : "",
			mobileNumChk : "",
			phoneNumChk : "",
			englishChk : "",
			koreanChk : "",
			confirm : ""
		};

		var func = {
			customFunc : "",
		};

		var settings = jQuery.extend(true, {
			notRequiredClass : "notRequired",
			ExceptionRequiredClass : "exceRequired",
			validateType : {
				idChk : {
					className : "idChk",
					regExr : "^(?=.*[a-z])[a-z0-9]{4,12}$"	// 영문만 검사
					//regExr : "^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{4,12}$" // 영문 + 숫자 검사
				},
				passChk : {
					className : "passChk",
					subClassName : "passChkSub",
					//regExr : "^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{6,16}$",
					regExr : "^[!@#$%^&+=a-zA-Z0-9_]{10,15}$",				
					//regExr : "^.*(?=^.{6,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$",
					equalClass : "passEqual"
				},
				emailChk : {
					className : "emailChk",
					regExr : "^[_a-zA-Z0-9-\\.\\_]+@[\\.a-zA-Z0-9-]+\\.[a-zA-Z]+$"
				},
				numberChk : {
					className : "numberChk",
					regExr : "^[0-9]+$"
				},
				lengthLimitChk : {
					className : "lengthChk",
					min : 2,
					max : 4
				},
				mobileNumChk : {
					className : "mobileChk",
					regExr : "^([0]{1}[0-9]{2})-([1-9]{1}[0-9]{2,3})-([0-9]{4})$"
				},
				phoneNumChk : {
					className : "phoneChk",
					regExr : "^([0]{1}[0-9]{1,2})-([1-9]{1}[0-9]{2,3})-([0-9]{4})$"
				},
				englishChk : {
					className : "englishChk",
					regExr : "^[a-zA-Z]+$"
				},
				koreanChk : {
					className : "koreanChk",
					regExr : "^[가-힣]+$"
				}
			},
			msg : {
				type : "alert",
				empty : {
					text : "을(를) 입력해주세요.",
					password : "을(를) 입력해주세요.",
					passwordChk : "을(를) 입력해주세요.",
					radio : "라디오 버튼 값을 선택해주세요.",
					checkbox : "체크박스 값을 한개 이상 선택해주세요.",
					select : "을(를) 선택해주세요.",
					textarea : "을(를) 입력해주세요.",
					names : {
					}
				},
				idChk : "아이디 입력값이 올바르지 않습니다.\n(알파벳 소문자, 4 ~ 12자로 입력합니다.",
				passChk : "패스워드 입력값이 올바르지 않습니다.\n비밀번호는 6~16자 영문 대소문자, 숫자, 특수문자(!@#$%^&*+=)를 사용할 수 있습니다.",
				passEqualChk : "입력한 패스워드와 일치하여야 합니다.",
				emailChk : "이메일 입력값이 올바르지 않습니다.",
				numberChk : "숫자만 입력가능합니다.",
				lengthLimitChk : "길이가 조건에 맞지 않습니다.",
				mobileNumChk : "핸드폰번호는 010-1234-5678 형식으로 입력되어야 합니다.",
				phoneNumChk : "전화번호는 02-1234-5678 형식으로 입력되어야 합니다.",
				englishChk : "영문만 입력하실 수 있습니다.",
				koreanChk : "한글만 입력하실 수 있습니다.",
				confirm : "진행하시겠습니까?"
			},
			placeholder : true,
			comma : {
				use : true,
				className : "comma"
			},
			async : {
				use : false,
				func : ""
			}			
		}, options);

		notRequired = settings.notRequiredClass;

		regExrs.idExr = settings.validateType.idChk.regExr;
		regExrs.passExr = settings.validateType.passChk.regExr;
		regExrs.emailExr = settings.validateType.emailChk.regExr;
		regExrs.numberExr = settings.validateType.numberChk.regExr;
		regExrs.mobileExr = settings.validateType.mobileNumChk.regExr;
		regExrs.phoneExr = settings.validateType.phoneNumChk.regExr;
		regExrs.englishExr = settings.validateType.englishChk.regExr;
		regExrs.koreanExr = settings.validateType.koreanChk.regExr;

		func.customFunc = settings.customfunc;

		msg.empty.text = settings.msg.empty.text;
		msg.empty.password = settings.msg.empty.password;
		msg.empty.passwordChk = settings.msg.empty.passwordChk;
		msg.empty.checkbox = settings.msg.empty.checkbox;
		msg.empty.radio = settings.msg.empty.radio;
		msg.empty.textarea = settings.msg.empty.textarea;
		msg.empty.select = settings.msg.empty.select;

		msg.idChk = settings.msg.idChk;
		msg.passChk = settings.msg.passChk;
		msg.passEqualChk = settings.msg.passEqualChk;
		msg.emailChk = settings.msg.emailChk;
		msg.numberChk = settings.msg.numberChk;
		msg.lengthLimitChk = settings.msg.lengthLimitChk + "(" + settings.validateType.lengthLimitChk.min + "자리 ~ " + settings.validateType.lengthLimitChk.max + "자리)";
		msg.mobileNumChk = settings.msg.mobileNumChk;
		msg.phoneNumChk = settings.msg.phoneNumChk;
		msg.englishChk = settings.msg.englishChk;
		msg.koreanChk = settings.msg.koreanChk;
		msg.confirm = settings.msg.confirm;


		// 경고 메시지를 설정한다.
		var SetMsg = function(obj, className){
			tagType = obj[0].nodeName;
			tagTypeValue = obj.attr('type');
			tagNameValue = obj.attr('name');

			switch (tagType)
			{
				case "INPUT" : 
					if (tagTypeValue == "text" || tagTypeValue == "hidden" || tagTypeValue == "file") message = msg.empty.text; 

					if (tagTypeValue == "password"){
						if (obj.hasClass(settings.validateType.passChk.className)) message = msg.empty.password; 
						if (obj.hasClass(settings.validateType.passChk.subClassName)) message = msg.empty.password; 
						if (obj.hasClass(settings.validateType.passChk.equalClass)) message = msg.empty.passwordChk; 
					}
					if (tagTypeValue == "radio") message = msg.empty.radio; 
					if (tagTypeValue == "checkbox") message = msg.empty.checkbox; 

					break;
				case "SELECT" : message = msg.empty.select; break;
				case "TEXTAREA" : message = msg.empty.textarea; break;
			}

			if (message.indexOf("{title}") == -1){
				if (settings.msg.empty.names.hasOwnProperty(tagNameValue)){
					message = settings.msg.empty.names[tagNameValue];
				}
				else
				{
					if (message.indexOf(tagTitle) == -1){
						message = tagTitle + message;
					}
				}
			}
			else
				message = message.replace("{title}", tagTitle);
		};

		// 설정된 메시지를 발생시키고 해당 객체로 포커스를 이동시킨다.
		var GenerateMsg = function(obj, msg){
			message = msg;

			if(!obj.hasClass(settings.ExceptionRequiredClass)){
				alert(message);	
			}
			obj.focus();
			isOk = false;			
		};

		// 필수 입력이 아닌 경우 체크
		var NotRequiredCheck = function(obj, single, name){
			var rtnFlag = true;

			if (single){
				rtnFlag = !obj.hasClass(notRequired)

				if (!rtnFlag && obj.val() != "") rtnFlag = true
			}
			else
			{
				$this.find('input[name='+name+']').each(function(){
					if ($(this).hasClass(notRequired)) rtnFlag = false
				});
			}

			return rtnFlag;
		};

		// 정규식으로 검사
		var RegExrCheck = function(obj, regexr, msg){
			patten = eval("/" + regexr + "/g");
			regResult = patten.test(obj.val());

			if (!regResult) GenerateMsg(obj, msg);
		};

		// 사용자 정의 함수 실행
		var UserDefineFunc = function(func, obj, tagid, okval, msg){
			if (typeof func == "function"){ 
				//isOk = func(obj, tagid);
				return func(obj, tagid, okval, msg);
			}
			else
			{
			}
		};

		// 길이 조사
		var LengthCheck = function(obj, lengthInfo, msg){
			if (obj.val().length >= lengthInfo.min && obj.val().length <= lengthInfo.max)
				regResult = true
			else
				regResult = false

			if (!regResult) GenerateMsg(obj, msg);
		};

		// 패스워드 일치 검사
		var PasswordEqualCheck = function(obj, passChkClass, msg){
			if (obj.val() !=  $this.find('.' + passChkClass).val()){ regResult = false; GenerateMsg(obj, msg); }
		};

		// 자동 하이픈 넣기
		var AutoHypenPhone = function(str){
			var tmp = ""
			  , lens1 = 4, lens2 = 7, lens3 = 11
			  , cutlen1 = 3, cutlen2 = 3;

			str = str.replace(/[^0-9]/g, '');

			if (str.substr(0, 2) == "02")
			{
				lens1 = 3; lens2 = 6; lens3 = 10; cutlen1 = 2;
			}
			
			if( str.length < lens1){
				return str;
			}else if(str.length < lens2){
				tmp += str.substr(0, cutlen1);
				tmp += '-';
				tmp += str.substr(cutlen1);
				return tmp;
			}else if(str.length < lens3){
				tmp += str.substr(0, cutlen1);
				tmp += '-';
				tmp += str.substr(cutlen1, cutlen2);
				tmp += '-';
				tmp += str.substr(cutlen1+cutlen2);
				return tmp;
			}else{
				tmp += str.substr(0, cutlen1);
				tmp += '-';
				tmp += str.substr(cutlen1, cutlen2+1);
				tmp += '-';
				tmp += str.substr(cutlen1+(cutlen2+1));
				return tmp;
			}

			return str;	
		};

		var ConvertPhone = function(){
			$('input').each(function(){
				if ($(this).hasClass(settings.validateType.mobileNumChk.className) || $(this).hasClass(settings.validateType.phoneNumChk.className))
				{
					$(this).keyup(function(event){
						event = event || window.event;
						//var _val = this.value.trim();
						var _val = $.trim(this.value);

						this.value = AutoHypenPhone(_val);

					});
				}
			});
		}();

		// placeholder
		if (version == 7.0 || version == 8.0 || version == 9.0){
			var Placeholder = function(){
				if (settings.placeholder == true)
				{
					$('input').each(function(){
						var phval = $(this).attr('placeholder');
						
						if (typeof phval != "undefined")
						{
							$(this).val(phval).css('color', '#999')
									.focus(function(){
										if ($(this).val() == phval){
											$(this).val('').css('color', '#666');
										}
									})
									.focusout(function(){
										if ($(this).val() == ''){
											$(this).val(phval).css('color', '#999');
										}
									});
						}
					});
				}
			}();
		}
				
		// 콤마 기능
		if (settings.comma.use)
		{
			var commaval = "";		
			$('.' + settings.comma.className).keyup(function(){
				commaval = $(this).val().replace(/[^0-9]/g, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
				$(this).val(commaval);		
			});
		}


		

		// 값 또는 태그의 상태에 대한 확인 모음
		var validationType = {
			Empty : function(obj, msg){
				if (NotRequiredCheck(obj, true))
					if ($.trim(obj.val()).length == 0) GenerateMsg(obj, msg);
			},
			Radio : function(obj, msg){					 
				var radio_ok = false;
				tagName = obj.attr('name');
	
				if (NotRequiredCheck(obj, false, tagName)){
					if ($('input[name='+tagName+']:checked').length > 0) radio_ok = true;
					if (!radio_ok) GenerateMsg(obj, msg);
				}
			},
			CheckBox : function(obj, msg){
				var check_ok = false;
				tagName = obj.attr('name');

				if (NotRequiredCheck(obj, false, tagName)){
					if ($('input[name='+tagName+']:checked').length > 0) check_ok = true;
					if (!check_ok) GenerateMsg(obj, msg);
				}
			},
			IdChk : function(obj, regexr, msg){
				RegExrCheck(obj, regexr, msg)
			},
			PassChk : function(obj, regexr, msg){
				if (NotRequiredCheck(obj, true))
					RegExrCheck(obj, regexr, msg);
			},
			PassEqualChk : function(obj, passChkClass, msg){
				if (NotRequiredCheck(obj, true))
					PasswordEqualCheck(obj, passChkClass, msg);
			},
			EmailChk : function(obj, regexr, msg){
				if (NotRequiredCheck(obj, true))
					RegExrCheck(obj, regexr, msg);
			},
			NumberChk : function(obj, regexr, msg){
				if (NotRequiredCheck(obj, true))
					RegExrCheck(obj, regexr, msg);
			},
			LengthLimitChk : function(obj, lengthInfo, msg){
				LengthCheck(obj, lengthInfo, msg);
			},
			MobileNumChk : function(obj, regexr, msg){
				if (NotRequiredCheck(obj, true))
					RegExrCheck(obj, regexr, msg);
			},
			PhoneNumChk : function(obj, regexr, msg){
				if (NotRequiredCheck(obj, true))
					RegExrCheck(obj, regexr, msg);
			},
			EnglishChk : function(obj, regexr, msg){
				RegExrCheck(obj, regexr, msg);
			},
			KoreanChk : function(obj, regexr, msg){
				if (NotRequiredCheck(obj, true))
					RegExrCheck(obj, regexr, msg);
			}
		}

		$this.submit(function(e){
			window.onbeforeunload = null;
			var documentHeight = $(document).height();
			//var imgleft = ($(document).width() / 2 - 150) + 'px';

			isOk = true;
			//isOk = false;

			$this.find('input:text, input:hidden, input:password, input:radio, input:checkbox, input:file, select, textarea').each(function(){
				tagType = $(this)[0].nodeName;
				tagTypeValue = "";
				tagTitle = $(this).attr('title');
				tagID = $(this).attr('id');

				if (typeof tagTitle == "undefined") tagTitle = "";

				SetMsg($(this));

				switch (tagType)
				{					
					case "INPUT" : 
						tagTypeValue = $(this).attr('type');

						if (tagTypeValue == "text" || tagTypeValue == "hidden" || tagTypeValue == "password" || tagTypeValue == "file")
						{
							if (tagTypeValue == "text" && $(this).val() == $(this).attr('placeholder')){
								$(this).val('');
								validationType.Empty($(this), message);
							}
							else{
								validationType.Empty($(this), message);
							}


							if (isOk && $(this).hasClass(settings.validateType.idChk.className)) validationType.IdChk($(this), regExrs.idExr, msg.idChk );
							if (tagTypeValue == "password")
							{
								if (isOk && $(this).hasClass(settings.validateType.passChk.className)) validationType.PassChk($(this), regExrs.passExr, msg.passChk );
								if (isOk && $(this).hasClass(settings.validateType.passChk.subClassName)) validationType.PassChk($(this), regExrs.passExr, msg.passChk );
								if (isOk && $(this).hasClass(settings.validateType.passChk.equalClass)) validationType.PassEqualChk($(this), settings.validateType.passChk.className , msg.passEqualChk );
							}
							if (isOk && $(this).hasClass(settings.validateType.emailChk.className)) validationType.EmailChk($(this), regExrs.emailExr, msg.emailChk);
							if (isOk && $(this).hasClass(settings.validateType.numberChk.className)) validationType.NumberChk($(this), regExrs.numberExr, msg.numberChk );
							if (isOk && $(this).hasClass(settings.validateType.mobileNumChk.className)) validationType.MobileNumChk($(this), regExrs.mobileExr, msg.mobileNumChk );
							if (isOk && $(this).hasClass(settings.validateType.phoneNumChk.className)) validationType.PhoneNumChk($(this), regExrs.phoneExr, msg.phoneNumChk );
							if (isOk && $(this).hasClass(settings.validateType.englishChk.className)) validationType.EnglishChk($(this), regExrs.englishExr, msg.englishChk );
							if (isOk && $(this).hasClass(settings.validateType.koreanChk.className)) validationType.KoreanChk($(this), regExrs.koreanExr, msg.koreanChk );
							if (isOk && $(this).hasClass(settings.validateType.lengthLimitChk.className)) validationType.LengthLimitChk($(this), settings.validateType.lengthLimitChk, msg.lengthLimitChk );
						}
						else if (tagTypeValue == "radio")
						{
							validationType.Radio($(this), message);							
						}
						else if (tagTypeValue == "checkbox")
						{
							validationType.CheckBox($(this), message);
						}

						break;
					case "SELECT" : 
						tagTypeValue = "select"
						validationType.Empty($(this), message);
						break;
					case "TEXTAREA" : 
						tagTypeValue = "textarea"
						validationType.Empty($(this), message);
						break;					
				}

				if(!$(this).hasClass(settings.ExceptionRequiredClass)){
					if (!isOk) return false;
				}

				rtnFunc = UserDefineFunc(func.customFunc, $(this), tagID, isOk, message);
				if (typeof rtnFunc != "undefined")
				{
					isOk = rtnFunc;
					if (!isOk) return false;
				}
			});

			if (!isOk) e.preventDefault();

			if (isOk)
			{
				if (msg.confirm != "")
				{
					if (confirm(msg.confirm))
					{
						//$('#wrapper').after('<div id="indi"></div><div class="loaderDiv"><p class="taC"><img src="/common/images/loader.gif" alt=" "></p><p class="taC mt25">화면을 불러오는 중 입니다</p></div>');
						$('#wrapper').after('<div id="indi"></div>');

						$('#indi').css('position', 'absolute').css('top', '0px').css('left', '0px').css('background-color','#000').css('z-index',1001).css('opacity',0.7)
									.width('100%').height(documentHeight);
						
						//$('.loaderDiv').css('position','fixed').css('top', '400px').css('left', imgleft).css('z-index', 1002);

						
						//e.preventDefault()
					}
					else
					{
						e.preventDefault()
					}
				}
				else
				{
					//$('#wrapper').after('<div id="indi"></div><div class="loaderDiv"><p class="taC"><img src="/common/images/loader.gif" alt=" "></p><p class="taC mt25">화면을 불러오는 중 입니다</p></div>');
					$('#wrapper').after('<div id="indi"></div>');

					$('#indi').css('position', 'absolute').css('top', '0px').css('left', '0px').css('background-color','#000').css('z-index',1001).css('opacity',0.7)
								.width('100%').height(documentHeight);
					
					//$('.loaderDiv').css('position','fixed').css('top', '400px').css('left', imgleft).css('z-index', 1002);				
				}

				if (settings.async.use)
				{
					e.preventDefault();
					if (typeof settings.async.func === "function")
					{
						settings.async.func()
					}
				}				
			}

			//e.preventDefault()
		});
	};
})(jQuery);
/**
 * 
 * 초기화
 * 
 * @date 2015. 08. 12.
 * @author Heo, Jin young
 * @example 
 */
jQuery(document).ready(function(){
	//faq
	var curAcc = -1;
	jQuery(".accordion li .answer").slideUp(0);
	jQuery(".accordion li").eq(0).addClass("on");
	jQuery(".accordion li").eq(0).find("a img").attr("src", jQuery(".accordion li").eq(0).find("a img").attr("src").replace(".gif", "_on.gif"));
	jQuery(".accordion li").eq(0).find(".answer").stop().slideDown(250);
	jQuery(".faqType li").each(function(q){
		jQuery(this).find("a").click(function(){
			if(jQuery(this).parent().hasClass("on"))
			{
				//접기
				jQuery(this).parent().removeClass("on");
				jQuery(this).find("img").attr("src", jQuery(this).find("img").attr("src").replace("_on.gif", ".gif"));
				jQuery(this).parent().find(".answer").stop().slideUp(250);
			}
			else 
			{
				//접기
				jQuery(this).parent().addClass("on");
				var str = jQuery(this).find("img").attr("src").replace(".gif", "_on.gif");
				jQuery(this).find("img").attr("src", str);	
				jQuery(this).parent().find(".answer").stop().slideDown(250);
			}
		});
	});
	
	jQuery("#searchStr").on("keydown", function(e){
		if(e.keyCode == 13){
			getPageList();
		}
	});
});
	
/**
 * 
 * 검색조건 클릭
 * 
 * @date 2015. 08. 12.
 * @author Heo, Jin young
 * @example 
 */
function getPageList()
{
	var f = document.frm;
	
	if(arguments.length == 0)
	{
		f.pageNo.value = 1;
	} 
	else 
	{
		f.pageNo.value = arguments[0];
	}
	
	f.action = "/inquiry/faq/list.nhd";
	f.submit();
}

/**
 * 
 * 새로고침
 * 
 * @date 2015. 08. 28.
 * @author Heo, Jin young
 * @example 
 */
function initPageList()
{
	location.href = "/inquiry/faq/list.nhd";
}
var $j = jQuery.noConflict();

var tablet = 768;
var body = $j("html, body");
var vert_p = body.scrollTop();

function search_swap(){
	$j("#showSearch").on('click', function(){
		$j(this).hide();
		$j("input.search-button").show();
		$j(".search-block .slogan").hide();
		$j("header .search-field").fadeIn(300);

	});
	$j(".search-field input").on('click', function(){
		$j(this).addClass("active").val("");
	});
}
function footer_subscription(){

	$j("footer form input[type=text]").on('click', function(e){
		$j(this).val("").removeClass("empty-field");
	});

	$j("footer form").on('submit', function(e){
		$j("footer form input[type=text]").each(function(){
			var val = $j(this).val();

			if(val == '' || val == "Name" || val == "Email" || val == "cannot be epmty"){

				$j(this).addClass("empty-field").val("cannot be epmty");
                console.log("Empty: " + val);
				e.preventDefault();
				return false;

            }else{
				console.log("Not Empty: " + val);
            }

			var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
			if($j("footer .mail-address").val().search(pattern) == 0 || $j("footer .mail-address").val() == "Email"){
				var input = $j(this).find("input[type=text]").val()
				console.log("Not changed: " + input);
			}else{
				console.log("Changed");
				$j("footer .mail-address").addClass("empty-field").val("wrong email address");
				e.preventDefault();
				return false();
			}

		});

		//e.preventDefault();
		//console.log(input);

	});
}

function mobile_menu(){

	$j("#menuButton").on('click', function(){
		$j("#mobileNav").slideToggle(100);
	});

}

function trim_home_desc(){

	var p = $j("li.extentions p");
	var p_str = p.text();
	var p_length = p_str.length;
	var p_limit = 120;
	var p_tmp = p_str.substr(0, p_limit);
	var p_tmp = p_tmp + " ... ";
	//$j("li.extentions p").text(p_tmp);

	//console.log(p_tmp + ": " + p_length);



	var i = 0;
	$j("li.extentions p, li.designs p").each(function(){
		var p_str = $j(this).text();
		var p_str = p_str.replace (/[ ]{2,}/gi, " ");
		var p_length = p_str.length;
		var p_limit = 120;

		function shorten(p_str,p_limit) {
		  return (p_str.match(RegExp(".{" + p_limit + "}\\S*"))||[p_str])[0];
		}

		if(p_length > p_limit){

        }else{

        }
		var p_str = shorten(p_str, p_limit);

		$j(this).text(p_str + " ...");
		console.log(p_str + " : " + p_length);
	});

}
/*########################################*/
// XXX doc ready

$j(document).ready(function(){

    window_w = $j(window).width();
    window_h = $j(window).height();
    doc_w = $j(document).width();
    doc_h = $j(document).height();
    header_h = $j("header").height();

	search_swap();
	footer_subscription();
	mobile_menu();
	trim_home_desc();
    //my_toTop();

});

/*########################################*/

$j(window).resize(function(){

    window_w = $j(window).width();
    window_h = $j(window).height();
    doc_w = $j(document).width();
    doc_h = $j(document).height();
    header_h = $j("header").height();
    //console.warn("On load doc_w: " + doc_w + ", window_w: " + window_w + ", window_h: " + window_h);


});

$j(window).scroll(function(event){



});

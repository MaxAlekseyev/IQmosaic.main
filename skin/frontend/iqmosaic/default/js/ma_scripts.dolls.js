var $j = jQuery.noConflict();

var tablet = 768;
var body = $j("html, body");
var vert_p = body.scrollTop();

function show_popup(block_name){

    var kult_popup_w = $j(block_name).outerWidth();
    var kult_popup_h = $j(block_name).outerHeight();
    var kult_window_h = window_h - 200;

    $j(block_name).css({
        'marginLeft': -kult_popup_w / 2,
        'marginTop': -kult_popup_h / 2
    });
    $j(block_name).fadeIn(0);
    $j(".dimmer").fadeIn(0);

}

function hide_popup(block_name){
    $j(block_name).parent(".kult-popup-box").fadeOut(0);
    $j(".dimmer").fadeOut(0);
}

function header_popup(){

    var sc_h = $j("#header-cart").outerHeight();
    var cart = $j(".header-cart");
    var mini_wl = $j("#mini-wishlist");
    var hcart = $j(".header-cart");
    var cart_is_empty = $j(".header-cart p.empty").length;
    var h = $j("#header");

    if(doc_w >= tablet){
        $j(".minicart-list-box, #header-cart").hover(
            function(){
                cart.show();
            },
            function(){
                cart.hide();
            }
        );
    }

    var vert_page = $j("#nav").scrollTop();

    function cart_scroll(){
        $j("body, html").animate({
            scrollTop: 0
        }, 100);
    }

    //$j("#header_cart_button").on('touchstart', function(e){
    //    console.warn("Cart button clicked");
    //});
    //
    //$j("#header_cart_button").on('touchstart', function(e){
    //
    //    if(doc_w < tablet){
    //        cart_scroll();
    //        if(cart_is_empty == 0){
    //            $j("#header").toggleClass("absolute");
    //        }
    //
    //        $j("#header-cart").toggleClass("showMe");
    //
    //        e.preventDefault();
    //    }
    //});

    $j(".main-container, .nav-primary.mobile, footer").on('touchstart', function(){
        if($j("#header-cart").is(":visible")){
            $j("#header-cart").removeClass("showMe");
        }
    });

    $j(".close-cart-mobile").on('click touchstart', function(){
        h.removeClass("absolute");
        cart.removeClass("showMe").removeAttr('style');
        cart_scroll();
    });

    $j("#mini-wishlist, .wishlist-box").hover(
        function(){
            if(doc_w > tablet){
                mini_wl.show();
            }
        },
        function(){
            mini_wl.hide();
        }
    );

    var check_cart_products = cart.find(".product-details").length;

    if(check_cart_products == 1){
        cart.addClass("oneProduct");
        console.log("One product");
    }

}

function dl_menu(){
    var mp = $j("#mobile_popup");
    var dl_menu = $j("#mobile_popup .parent > ul");
    var parent = $j("#mobile_popup .parent");
    var children = $j("#mobile_popup .parent > a.has-children");
    var anim_duration = 200;
    var clr_popup = $j(".nav-primary.mobile .nav-6 > ul.level0");
    var clr_button = clr_popup.parent();

    mp.css({
        'top': header_h
    });

    setTimeout(function(){
        mp.css({
            'top': header_h
        });

    }, 1000);

    $j("#shop_button").find("a").prepend('<div class="mobile-nav-arrow"></div>');

    $j("#shop_button").on('click', function(){
        $j(".nav-primary.mobile .red-item a").removeClass("tapped-nav")
        $j("#shop_button a .mobile-nav-arrow").toggle();
        $j("#shop_button a").toggleClass("tapped-nav");
    });


    $j("#shop_button").on('click', function(){
        //console.log("Header_h after pause: " + header_h);
        var header_h = $j("#header").height();
        //console.log("Header_h after pause: " + header_h);

        mp.css({
            'top': header_h
        });

        if($j("#clearance_mobile ul").css('display') == 'block'){
            $j("#clearance_mobile ul").hide();
            $j("#mobile_popup .dl-menu").toggle();
            $j(clr_button).find(".mobile-nav-arrow").hide();
        } else{
            $j("#mobile_popup .dl-menu").toggle();
        }

    });

    $j("li.dl_back_cell + li").remove();

    children.on('click', function(e){

        var current_p = $j("html, body").scrollTop();
        //console.warn(current_p);

        if($j(this).parent().hasClass("menuOpened")){
            mp.find("li").removeClass("menuOpened");
            $j(this).next().hide();

        } else{
            mp.find("li").removeClass("menuOpened").children("ul").hide();
            $j(this).next().show().parent().addClass("menuOpened");
        }

        e.preventDefault();
    });

}

function clearance_menu(){
    //console.log(header_h);
    var clr_popup = $j(".nav-primary.mobile .nav-6 > ul.level0");
    var clr_button = clr_popup.parent();

    clr_popup.insertAfter("#mobile_popup").wrap('<div id="clearance_mobile" class="clearance-mobile"></div>');

    $j("#clearance_mobile").css({
        'top': header_h
    });

    clr_button.find("a").css({
        'text-decoration': 'none'
    })

    $j(clr_button).find("a").prepend('<div class="mobile-nav-arrow"></div>');

    clr_button.on('click', function(e){

        console.warn(this);
        $j(this).find("a").toggleClass("tapped-nav")

        var header_h = $j("#header").height();

        $j("#clearance_mobile").css({
            'top': header_h
        });
        $j("#shop_button a").removeClass("tapped-nav");

        if($j("#dl_menu").css('display') == 'block'){
            $j("#dl_menu").hide();
            $j("#clearance_mobile ul").toggle();
            $j(clr_button).find(".mobile-nav-arrow").toggle();
            $j("#shop_button a .mobile-nav-arrow").hide();
        } else{
            console.warn("Hide clr");
            $j(clr_button).find(".mobile-nav-arrow").toggle();
            $j("#clearance_mobile ul").toggle();
        }

        e.preventDefault();

    });
}

function currencies_show(){
    $j("footer .currency").on('click', function(e){
        $j("footer .footer-currency-list").slideToggle(500);
        $j("html, body").animate({
            scrollTop: doc_h
        }, 500);
        e.preventDefault();
    });

    $j("#header .dolls_currencies").on('click', function(){
        $j(this).find(".currency-list").toggleClass("showMe");
        $j(this).find("i.arrow-bottom").css({
            'top': '3px',
            '-webkit-transform': 'rotate(-135deg)',
            '-moz-transform': 'rotate(-135deg)',
            '-ms-transform': 'rotate(-135deg)',
            '-o-transform': 'rotate(-135deg)'
        });

        $j(window).scroll(function(event){
            if($j(window).scrollTop() > 50){
                $j("#header i.arrow-bottom").css({
                    'top': '3px',
                    '-webkit-transform': 'rotate(45deg)',
                    '-moz-transform': 'rotate(45deg)',
                    '-ms-transform': 'rotate(45deg)',
                    '-o-transform': 'rotate(45deg)'
                });
                $j(".dolls_currencies .currency-list").removeClass("showMe");
            }
        });

        setTimeout(function(){
            $j(".dolls_currencies .currency-list").removeClass("showMe");
        }, 20000);

        if($j("#header .currency-list").hasClass("showMe")){
            $j(this).find("i.arrow-bottom").css({
                'top': '3px',
                '-webkit-transform': 'rotate(-135deg)',
                '-moz-transform': 'rotate(-135deg)',
                '-ms-transform': 'rotate(-135deg)',
                '-o-transform': 'rotate(-135deg)'
            });
        }
        else{
            $j(this).find("i.arrow-bottom").css({
                'top': 0,
                '-webkit-transform': 'rotate(45deg)',
                '-moz-transform': 'rotate(45deg)',
                '-ms-transform': 'rotate(45deg)',
                '-o-transform': 'rotate(45deg)'
            });
        }
    });

}

function display_size_guide(){
    $j(".size-guide-close, .dimmer").on('click', function(){
        $j(".size-guide-box, .dimmer").fadeOut(0);
    })
    $j("#side_guide_show1, #side_guide_show2").on('click', function(){
        $j("html, body").animate({
            scrollTop: 0
        }, 400);
        $j(".size-guide-box, .dimmer").fadeIn(0);
        setTimeout(function(){
            $j(".accordio-box .heading").removeClass("active");
        }, 100);
    });
}

/* For Shipping popup - start */

var shippingFade = 0;

function shipping_popup_us_intl(){
    $j(".shipping-popup-close, .dimmer").on('click', function(){
        $j(".shipping-popup-us-intl, .dimmer").fadeOut(shippingFade);
    })
    $j("#shipping_message1").on('click', function(){
        $j("html, body").animate({
            scrollTop: 0
        }, 400);
        $j(".shipping-popup-us-intl, .dimmer").fadeIn(shippingFade);
    });
}

function shipping_popup_ca(){
    $j(".shipping-popup-close, .dimmer").on('click', function(){
        $j(".shipping-popup-ca, .dimmer").fadeOut(shippingFade);
    })
    $j("#canadian_shipping_message1").on('click', function(){
        $j("html, body").animate({
            scrollTop: 0
        }, 400);
        $j(".shipping-popup-ca, .dimmer").fadeIn(shippingFade);
    });
}

function shipping_popup_uk(){
    $j(".shipping-popup-close, .dimmer").on('click', function(){
        $j(".shipping-popup-uk, .dimmer").fadeOut(shippingFade);
    })
    $j("#uk_shipping_message1").on('click', function(){
        $j("html, body").animate({
            scrollTop: 0
        }, 400);
        $j(".shipping-popup-uk, .dimmer").fadeIn(shippingFade);
    });
}

function shipping_popup_au(){
    $j(".shipping-popup-close, .dimmer").on('click', function(){
        $j(".shipping-popup-au, .dimmer").fadeOut(shippingFade);
    })
    $j("#australia_shipping_message1").on('click', function(){
        $j("html, body").animate({
            scrollTop: 0
        }, 400);
        $j(".shipping-popup-au, .dimmer").fadeIn(shippingFade);
    });
}

function shipping_popup_nz(){
    $j(".shipping-popup-close, .dimmer").on('click', function(){
        $j(".shipping-popup-nz, .dimmer").fadeOut(shippingFade);
    })
    $j("#nz_shipping_message1").on('click', function(){
        $j("html, body").animate({
            scrollTop: 0
        }, 400);
        $j(".shipping-popup-nz, .dimmer").fadeIn(shippingFade);
    });
}
/* For Shipping popup- end */

/* For Affirm popup - start */
function affirm_popup(){
    $j(".affirm-popup-close, .dimmer").on('click', function(){
        $j(".affirm-popup, .dimmer").fadeOut(0);
    })
    $j("#affirm_popup").on('click', function(){
        $j("html, body").animate({
            scrollTop: 0
        }, 400);
        $j(".affirm-popup, .dimmer").fadeIn(0);
    });
}
/* For Affirm popup - end */

function show_product_description(){
    $j("#product_desc_show, h3.deets_title").click(function(){
        if($j("#desk-text").hasClass("opened")){

            $j("#desk-text").css({
                height: 50,
            });
            console.log("opened");

        } else{
            $j("#desk-text").css({
                height: "auto"
            });
            console.log("closed")
        }
        $j("h3.deets_title, #desk-text, #product_desc_show").toggleClass("opened");
    });
}

function product_accordio_box(){
    $j(".accordio-box .heading").click(function(){
        $j(this).toggleClass("active");
        $j(".accordio-box .std-out").slideUp(400);
        if($j(this).next(".std-out").css('display') == 'block'){
            $j(this).next(".std-out").slideUp(400);
        } else{
            $j(this).next(".std-out").slideDown(400);
        }
    });

    var stdOutText = $j(".our-doll-is-wearing-mobile");
    if(stdOutText.height() < 10){
        stdOutText.hide().prev().hide();
    }
}

function account_create(){
    $j(".account-create h2").on('click', function(){
        $j("form.create-form").slideToggle(400);
    });
}

function subscribe_validation(){
    $j("footer #newsletter-validate-detail button").on('click', function(e){
        var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
        var mail = $j("footer #newsletter-validate-detail #newsletter");

        if(mail.val() != '' && mail.attr('placeholder') != 'Sign up with Email'){
            if(mail.val().search(pattern) == 0){

            } else{
                mail.val('Incorrect email address!');
                mail.addClass("wrong-mail");
                return false;
            }
        } else{
            mail.attr({
                'placeholder': 'Cannot be empty'
            });
            mail.addClass("wrong-mail");
            return false;
        }

    });
    $j("footer #newsletter-validate-detail input").on('click focusin', function(){
        $j(this).css({
            'color': '#000 !important'
        }).val("");
    });
}

function show_mobile_menu(){
    $j("#cms-mobile-menu").on('click', function(){
        $j(this).next("ul").toggle();
    })
};

function category_desk_show(){
    var cat_desc = $j(".category-listing .category-description.std");
    var cat_title = $j(".category-listing .title h1");
    if($j(cat_desc).length > 0){
        $j(cat_title).find(".arrow").css({
            'display': 'inline-block'
        });
        $j(cat_title).on('click', function(){
            $j(this).toggleClass("active");
            $j(cat_desc).slideToggle(0);
        });
    }
}

function slimscroll_init(){
    $j("#cart-sidebar").slimscroll({
        alwaysVisible: true,
        allowPageScroll: true,
        disableFadeOut: true,
        height: 309,
        position: 'right',
        size: '8px',
    });
    $j("#shop_button .dl-trigger").on('click', function(e){
        e.preventDefault();
    });

    var li_num = $j("#cart-sidebar > li").length;
    var slim = $j("#header-cart .slimScrollDiv, #cart-sidebar");
    var slim_bar = $j("#header-cart .slimScrollBar");

    if(li_num < 3){
        slim.css({
            'height': 'auto'
        });
        slim_bar.hide();
    } else{
        slim_bar.show();
    }
}

function touchscreen_hovers(){
    var main_li = $j(".nav-primary > li");
    $j(main_li).on('touchstart', function(){
        main_li.removeClass("touched");
        $j(this).addClass("touched");
    });
}

function wishlist_sizes(){
    var wl_modal = $j("#wishlist_modal");
    var wl_modal_w = wl_modal.outerWidth();
    wl_modal.css({
        'height': window_h * 0.8,
        'margin-left': -wl_modal_w / 2
    });

    var wl_list = wl_modal.height();
    var wl_header = wl_modal.find("header").outerHeight();
    $j(".my-wishlist").css({
        'height': wl_list - wl_header
    });

    var wl_is_empty = $j("#mini-wishlist .wl-empty").length;
    if(wl_is_empty > 0){
        $j("#mini-wishlist").addClass("isEmpty");
    }
    $j(".minimal-price-link").prev(".regular-price").find("span").addClass("discount");

}

function wl_icon_span_position(){
    var wl_icon = "#wishlist_button";
    var wl_num = wl_icon + " > span";
    var wl_shift = ($j(wl_num).height() / 2);

    $j(wl_num).css({
        'margin-top': -wl_shift
    });
}

function wl_socials(){

    $j(".social-my-trigger").on('click touchstart', function(e){
        console.log("Social click");
        $j(this).parent().find("li").toggleClass("Visible Hidden");
        e.preventDefault();
    });

    $j(".social-my-icon").on('click touchstart', function(e){
        $j(this).parent().find("li").toggleClass("Visible Hidden");
        e.preventDefault();
    });

}

function desktop_nav_calcs(){
    setTimeout(function(){
        var nav_p_w = $j(".nav-primary.not-mobile").width();
        var search_add_w = 23;

        //console.log("Window: " + window_w + ", Doc: " + doc_w);
        if(window_w > tablet - 20){
            $j("#top_search").css({
                'width': nav_p_w + search_add_w,
                'opacity': 1
            });
        }
    }, 50);

}

function checkout_address(){

    $j("#gcheckout-shipping-address input, #gcheckout-shipping-address select").on('keyup change select', function(){

        if($j("#gcheckout-shipping-address #show-billing").is(":checked")){

            $j("#gcheckout-shipping-address input[type=text]").each(function(){

                var inputVal = $j(this).val();
                var inputName = $j(this).attr("id")
                var billingName = inputName.replace('shipping', 'billing');
                $j("#gcheckout-billing-address #" + billingName).val(inputVal);

            });

            var selectCountryVal = $j("#gcheckout-shipping-address select#shipping_country_id").val();
            $j("#gcheckout-billing-address select#billing_country_id option").removeAttr("selected");
            $j("#gcheckout-billing-address select#billing_country_id option[value='" + selectCountryVal + "']").prop('selected', true).css({
                'color': '#000'
            });

            var selectRegionSelectVal = $j("#gcheckout-shipping-address select#shipping_country_id").val();
            var selectRegionSelectValText = $j("#gcheckout-shipping-address select#shipping_region_id option:selected").text();
            console.warn("Region select option value: " + selectRegionSelectVal);
            console.warn("Region select option text: " + selectRegionSelectValText);
            $j("#gcheckout-billing-address select#billing_region_id option").removeAttr("selected");
            $j("#gcheckout-billing-address select#billing_region_id option[value='" + selectRegionSelectVal + "']").prop('selected', true).css({
                'color': '#000'
            });
            $j("#gcheckout-billing-address select#billing_region_id").removeClass("empty");
            $j("#gcheckout-billing-address #billing_region").val(selectRegionSelectValText);

            var textRegionVal = $j("#gcheckout-shipping-address #shipping_region").val();
            console.warn("Region input text value: " + textRegionVal);
            $j("#gcheckout-shipping-address #shipping_region").val(textRegionVal)

        } else{

            //console.warn("Billing address onClick unchecked. Checking!!!!!!!!!!!!!!");

        }

    });

    $j("#show-billing + label").on('click', function(){
        $j("#gcheckout-billing-address").slideToggle(200);
    });
}

function my_toTop(scroll){
    var to_top = $j("html, body");

    $j('<div id="my_toTop"><span id="my_toTopHover"></span></div>').insertBefore("#header");

    $j("#my_toTop").on('click', function(e){
        to_top.animate({
            scrollTop: 0
        }, '2000');
    });

}

function footer_login(){

    var loginScrollSpeed = 500;

    var k = 5; // 1 = 1000px/s
    var calcScrollSpeed = doc_h / k;
    var loginScrollSpeed = calcScrollSpeed;

    var heart_link = ".product-wishlist-icon";
    var loginLinks = $j(heart_link + ", .footer-login-popup, #wishlist_button.not-logged, .checkout-page-login a, .header-links a.not-logged, #gcheckout-login-link");

    var touchmoved;
    $j(heart_link).on('touchend', function(e){

        if(touchmoved != true){
            callLogin();
        }else{
            console.log("Ha ha");
        }

    }).on('touchmove', function(e){
        touchmoved = true;
    }).on('touchstart', function(){
        touchmoved = false;
    });

    loginLinks.on('click', function(e){
        callLogin();
        e.preventDefault();
    });

    function callLogin(e) {

        if(MAGE_IS_LOGGED == 0){
            $j("html, body").animate({
                scrollTop: 0
            }, 500);
            showLoginPopup();
            return false;
        }

        //e.preventDefault();
    }

}

function show_spinner(spinnerAction){

    var spin = $j("#login_spinner");
    var spinFade = 500;

    if(spinnerAction === 'show' || spinnerAction === true){
        spin.addClass("std").fadeIn(spinFade);
        $j(".dimmer").addClass("transparent-div").show().on('click', function(e){
            e.preventDefault();
        });
    } else{
        spin.fadeOut(spinFade);
        setTimeout(function(){
            spin.removeClass("std")
            $j(".dimmer").hide().removeClass("transparent-div");
        }, 1000);
    }

}

function std_loader(){

    // Usage:
    //$j(document).ready(function(){
    //    std_loader();
    //});

    show_spinner(true);
    $j(window).load(function(){
        console.log("Window load");
        setTimeout(function(){
            show_spinner();
        }, 500);
    });

}

function debug_bar(){
    $j('<div class="debug-bar"></div>').insertBefore("#header");
    $j(".debug-bar").html("<div>On load doc_w: " + doc_w + "px, doc_h: " + doc_h + "px, window_w: " + window_w + "px, window_h: " + window_h + "px, header_h: " + header_h + "px</div> \
                          <div class='resize-info'>Not resized</div>").on('click',
        function(){
            $j(this).toggleClass("hideDebug");
        });
    $j(window).resize(function(){
        $j(".debug-bar .resize-info").html("On resize doc_w: " + doc_w + "px, doc_h: " + doc_h + "px, window_w: " + window_w + "px, window_h: " + window_h + "px, header_h: " + header_h + "px");
    });
}

function correct_footer(){

    var wrap_h = $j(".wrapper").outerHeight(true);
    var footer_h = $j("footer").outerHeight(true);
    var total_content_h = $j(".wrapper").outerHeight(true) + $j("footer").outerHeight(true);
    set_wrapper();

    $j(window).resize(function(){

        var wrap_h = $j(".wrapper").outerHeight(true);
        var footer_h = $j("footer").outerHeight(true);
        var total_content_h = $j(".wrapper").height() + $j("footer").height();
        set_wrapper();

    });

    function set_wrapper(){
        if(total_content_h < window_h && doc_w >= tablet){
            $j(".wrapper").css({
                'min-height': window_h - footer_h
            });
        }
    }
}

function switch_swatched(){

    var sw_cell = $j(".swatches-list li");
    sw_cell.on('click touchstart', function(){
        sw_cell.removeClass("active-swatch");
        $j(this).addClass("active-swatch");

    });
}

/*########################################*/
// XXX doc ready

$j(document).ready(function(){

    window_w = $j(window).width();
    window_h = $j(window).height();
    doc_w = $j(document).width();
    doc_h = $j(document).height();
    header_h = $j("#header").height();

    $j(".kult-select select").on('focus', function(){
        $j(this).parent().addClass("selected");
    });
    $j(".kult-select select").on('blur', function(){
        $j(this).parent().removeClass("selected");
    });

    $j("#kult_close").on('click', function(){
        hide_popup("#kult_close");
    });

    $j(".dollskill-kult-onepage-index #q_mark").on('click', function(e){
        show_popup(".dollskill-kult-onepage-index #cvv_popup");
        e.preventDefault();
    });

    $j("#show_header_search").on('click', function(){
        $j(this).hide().css({
            'opacity': 0
        });
        $j("#nav .nav-primary").hide().css({
            'opacity': 0,
            'z-index': -1
        });
        $j(".top-search button, .top-search input, .top-search i.header-close-form, .side_lens_icon").css({
            'display': 'block',
            'opacity': 1
        });
        $j("#search").focus();
    });
    $j(".search-button-aloglia").on('click touchstart', function(e){
        if($j("#algolia-autocomplete-tt #search").val() == ''){
            e.preventDefault();
        }
    });
    $j("#close_header_search").on('click', function(){
        $j(this).hide();
        $j(".top-search button, .top-search input, .top-search i.header-close-form, .side_lens_icon").css({
            'display': 'none',
            'opacity': 0
        });
        $j(".top-search i.header-close-form").hide();
        $j("#nav .nav-primary, #show_header_search").css({
            'display': 'table',
            'z-index': 55,
            'opacity': 1
        });
    });

    if($j("#refine_ul").css('display') == 'block'){
        $j("#refine_button").addClass("selected");
    }

    $j(".cat-prod-image").on('touchstart', function(){
        $j(this).css({
            'opacity': 0.6
        });
    });

    $j(".dropdown.product-sorting.sort-by").on('touchstart', function(e){
        $j(this).toggleClass("hover no_hover").find("ul").toggleClass("hover no_hover");
        e.preventDefault();
    });
    $j(".dropdown.product-sorting.sort-by").hover(
        function(e){
            $j(this).toggleClass("hover no_hover").find("ul").toggleClass("hover no_hover");
            e.preventDefault();
        },
        function(e){
            $j(this).toggleClass("no_hover hover").find("ul").toggleClass("no_hover hover");
            e.preventDefault();
        }
    );

    $j("#login-popup button").on('mousedown', function(){
        $j(this).css({
            opacity: 0.7
        });
    });
    $j("#login-popup button").on('mouseup', function(){
        $j(this).css({
            opacity: 1
        });
    });


    var prod_image = $j(".amlabel-div > a img");

    prod_image.on('touchstart', function(e){
        $j(this).addClass("touched");
    });
    prod_image.on('touchend', function(e){
        $j(this).removeClass("touched");
    });

    $j("a").on('touchstart', function(e){
        $j(this).addClass("tapped");
    });
    $j("a").on('touchend', function(e){
        $j(this).removeClass("tapped");
    });

    // Brands menu last ites (show all)

    $j("#nav .brands .view-all a, #dl_menu .brands .view-all a").text("See all brands");

    //setTimeout(function(){
    //var algolia_out = $j(".autocomplete-wrapper").html();
    //var ch = $j("body").css('margin');
    //var ch = $j("#algolia-autocomplete-container").html();
    //console.log(ch);
    //},15000);

    // Call functions

    //debug_bar();
    correct_footer();
    footer_login();
    currencies_show();
    touchscreen_hovers();
    dl_menu();
    clearance_menu();
    header_popup();
    display_size_guide();
    show_product_description();
    product_accordio_box();
    account_create();
    subscribe_validation();
    show_mobile_menu();
    category_desk_show();
    slimscroll_init();
    wishlist_sizes();
    wl_icon_span_position();
    shipping_popup_us_intl();
    shipping_popup_ca();
    shipping_popup_uk();
    shipping_popup_au();
    shipping_popup_nz();
    affirm_popup();
    desktop_nav_calcs();
    wl_socials();
    switch_swatched();
    //my_toTop();

});

/*########################################*/

$j(window).resize(function(){

    window_w = $j(window).width();
    window_h = $j(window).height();
    doc_w = $j(document).width();
    doc_h = $j(document).height();
    header_h = $j("#header").height();
    //console.warn("On load doc_w: " + doc_w + ", window_w: " + window_w + ", window_h: " + window_h);

    $j("#header_cart_button").removeAttr('style');

    // Change mobilemenu top position after resize
    setTimeout(function(){
        var header_h = $j("#header").height();
        //console.log("Header_h afret resize: " + header_h);
        //$j("#mobile_popup").css({'top':header_h});
        $j("#mobile_popup, #clearance_mobile").animate({
            'top': header_h
        }, 100);
    }, 300);

    // Call functions

    wishlist_sizes();
    wl_icon_span_position();
    desktop_nav_calcs();

});

$j(window).scroll(function(event){

    window_w = $j(window).width();

    var scroll_arr, scroll_point = $j(window).scrollTop();

    if(scroll_arr > 450){
        $j("#my_toTop").fadeIn(500);
    } else{
        $j("#my_toTop").fadeOut(500);
    }

    if(window_w < tablet){
        $j("#header-cart").removeClass("showMe");
    }

});

"use strict";
var scrollDirection, $ = jQuery;

// for scrolling to targeted sections

(function($){
	$.fn.scrollingTo = function( opts ) {
		var defaults = {
			animationTime : 1000,
			easing : '',
			topSpace : 0,
			callbackBeforeTransition : function(){},
			callbackAfterTransition : function(){}
		};

		var config = $.extend( {}, defaults, opts );

	    $(this).on('click', function(e){
	    	var eventVal = e;
	    	e.preventDefault();

	    	var $section = $(document).find( $(this).data('section') );
	    	if ( $section.length < 1 ) {
	    		return false;
	    	}

	        if ( $('html, body').is(':animated') ) {
	            $('html, body').stop( true, true );
	        }

	        var scrollPos = $section.offset().top;

	        if ( $(window).scrollTop() == ( scrollPos + config.topSpace ) ) {
	        	return false;
	        }

	        config.callbackBeforeTransition(eventVal, $section);

	        var newScrollPos = (scrollPos - config.topSpace);

	        $('html, body').animate({
	            'scrollTop' : ( newScrollPos+'px' )
	        }, config.animationTime, config.easing, function(){
	        	config.callbackAfterTransition(eventVal, $section);
	        });

	        return $(this);
	    });

	    $(this).data('scrollOps', config);
	    return $(this);
	};
}(jQuery));

$(document).ready(function($){

	$('.dynaP').text('909-979-1204').attr({href:'tel:909-979-1204'});
	$('.dynaM').text('jon.sal.morales@gmail.com').attr({href:'mailto:jon.sal.morales@gmail.com'});

	var sklSlider = $(".owl-carousel");

	sklSlider.owlCarousel({
	    rtl: true,
	    loop: true,
	    margin: 10,
	    nav: true,
	    items: 6
	})

	$("#skillSlider > .owl-wrapper-outer > .owl-wrapper > .owl-item > .item").addClass("c-skill");
	$("#skillSlider > .owl-wrapper-outer").addClass("owl-wrapper-buff");

	var sklData = sklSlider.data('owlCarousel');


	var sklTgt = $('.skl-ctrl').find('.go');
	sklTgt.on('click', function(e){
		e.preventDefault();
		if( $(this).hasClass('go-left') ) {
			sklData.prev();
		} else {
			sklData.next();
		}
	});

	var tesMoSlider = $("#testimonialSlider");
		tesMoSlider.owlCarousel({
		slideSpeed : 600,
		items : 2,
		itemsDesktop : [1000,2],
		itemsDesktopSmall : [900,2],
		itemsTablet: [600,1],
		itemsMobile : false,
		pagination : false
	});

	var tmoData = tesMoSlider.data('owlCarousel');


	var tmoTgt = $('.tmo-ctrl').find('.go');


	tmoTgt.on('click', function(e){
		e.preventDefault();

		if($(this).hasClass('go-left')){
			tmoData.prev();
		} else {
			tmoData.next();
		}
	});

	$('.menu-smooth-scroll').scrollingTo({
		easing : 'easeOutQuart',
		animationTime : 1800,
		callbackBeforeTransition : function(e){
			if (e.currentTarget.hash !== "") {
				if ( e.currentTarget.hash !== '#home' ) {
					$(e.currentTarget).parent().addClass('current').siblings().removeClass('current');
				}
			}

			$('.button-collapse').sideNav('hide');
		},
		callbackAfterTransition : function(e){
			if (e.currentTarget.hash !== "") {
				if ( e.currentTarget.hash === '#home' ) {
					window.location.hash = '';
				} else {
					window.location.hash = e.currentTarget.hash;
				}

			}
		}
	});

	$('.section-call-to-btn').scrollingTo({
		easing : 'easeOutQuart',
		animationTime : 1800,
		callbackBeforeTransition : function(e){

		},
		callbackAfterTransition : function(e){
		}
	});

	// Animate scrolling on hire me button
    $('.hire-me-btn').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: $("#contact").offset().top}, 2000);
    });
    $('.resume-btn').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: $("#about").offset().top}, 1000);
    });




	// Menu animations plugin
	(function(){
		function Menu($element, options){

			var handler,
			defaults = {
				domObj : $element,
				className : 'small-menu',
				position : '100px',
				onIntellingenceMenu : function(){},
				onNormalMenu : function(){}
			},
			config = $.extend({}, defaults, options),
			coreFuns = {
				displayMenu : function(){
					if ( config.domObj.hasClass(config.className) ) {
						config.domObj.removeClass(config.className);
					}
				},
				hideMenu : function(){
					if ( !config.domObj.hasClass(config.className) ) {
						config.domObj.addClass(config.className);
					}
				}
			},
			publicFuns = {
				intelligent_menu : function(){

					var lastScrollTop = 0, direction;

					if ( handler != undefined ) {
						$(window).unbind('scroll', handler);
					}

					handler = function(e){
						if (e.currentTarget.scrollY > lastScrollTop){
							direction = 'down';
						} else {
							direction = 'up';
						}
						lastScrollTop = e.currentTarget.scrollY;

						// check is user scrolling to up or down?
						if ( direction == 'up' ) {
						// so you are scrolling to up...

							// lets display menu
							coreFuns.displayMenu();

						} else {
						// so you are scrolling to down...

							// se we have to hide only the small menu because the normal menu isn't sticky!
							coreFuns.hideMenu();
						}
					};
					$(window).bind('scroll', handler);

					config.onNormalMenu();
				},
				fixed_menu : function(){
					if ( handler != undefined ) {
						$(window).unbind('scroll', handler);
					}

					handler = function(e){
						// check have we display small menu or normal menu ?
						coreFuns.displayMenu();
					};

					$(window).bind('scroll', handler);

					config.onNormalMenu();
				},
				mobile_intelligent_menu : function(){

					if ( jQuery.browser.mobile === true ) {
						this.intelligent_menu();
					} else {
						this.fixed_menu();
					}
				}
			};

			return publicFuns;
		}

	    $.fn.menu = function( options ){
	        var $element = this.first();
	        var menuFuns = new Menu( $element, options );
	        return menuFuns;
	    };

	})();


	// call to Menu plugin
	var menuFun = $('header').menu({
		className : 'hide-menu',
		position : '100px'
	});

	window.menuFun = menuFun;


	/* Choose your navigation style */

	menuFun.intelligent_menu(); // Hide intelligently
	// menuFun.fixed_menu(); // Always fixed
	// menuFun.mobile_intelligent_menu(); // Hide on Mobile Devices




	// window scroll Sections scrolling

	(function(){
		var sections = $(".scroll-section");

		function getActiveSectionLength(section, sections) {
			return sections.index(section);
		}
		
		if ( sections.length > 0 ) {


			sections.waypoint({
				handler: function(event, direction) {
					var active_section, active_section_index, prev_section_index;
					active_section = $(this);
					active_section_index = getActiveSectionLength($(this), sections);
					prev_section_index = ( active_section_index - 1 );

					if (direction === "up") {
						scrollDirection = "up";
						if ( prev_section_index < 0 ) {
							active_section = active_section;
						} else {
							active_section = sections.eq(prev_section_index);
						}
					} else {
						scrollDirection = "Down";
					}


					if ( active_section.attr('id') != 'home' ) {
						var active_link = $('.menu-smooth-scroll[href="#' + active_section.attr("id") + '"]');
						active_link.parent('li').addClass("current").siblings().removeClass("current");
					} else {
						$('.menu-smooth-scroll').parent('li').removeClass('current');
					}
				},
				offset: '35%'
			});
		}

	}());

	// Map
	var mapStyle = [
	    {
	        "featureType": "landscape",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 50
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "poi",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 40
	            },
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "road.arterial",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 20
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 30
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.province",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "lightness": -0
	            },
	            {
	                "saturation": -0
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "hue": "#00baff"
	            },
	            {
	                "lightness": -10
	            },
	            {
	                "saturation": -95
	            }
	        ]
	    }
	];

	var $mapWrapper = $('#map'), draggableOp;


	if ( jQuery.browser.mobile === true ) {
		draggableOp = false;
	} else {
		draggableOp = true;
	}

	if ( $mapWrapper.length > 0 ) {
		var map = new GMaps({
			div: '#map',
			lat : 33.981405,
			lng : -117.830676,
			scrollwheel: false,
			draggable: draggableOp,
			zoom: 13,
			disableDefaultUI: true,
			styles : mapStyle
		});

		map.addMarker({
			lat : 33.981405,
			lng : -117.830676,
			icon: 'images/marker-icon.png',
			infoWindow: {
				content: '<p>Jonathan Morales Home Town</p>'
			}
		});
	}

}(jQuery));



$(window).load(function(){
	
	// section calling
	$('.section-call-to-btn.call-to-home').waypoint({
		handler: function(event, direction) {
			var $this = $(this);
			$this.fadeIn(0).removeClass('btn-hidden');
			var showHandler = setTimeout(function(){
				$this.addClass('btn-show').removeClass('btn-up');
				clearTimeout(showHandler);
			}, 1500);
		},
		offset: '90%'
	});

	
	$('.section-call-to-btn.call-to-about').delay(1000).fadeIn(0, function(){
		var $this = $(this);
		$this.removeClass('btn-hidden');
		var showHandler = setTimeout(function(){
			$this.addClass('btn-show').removeClass('btn-up');
			clearTimeout(showHandler);
		}, 1600);
	});



	// portfolio Mesonary
	if ( $('#protfolio-msnry').length > 0 ) {
		// init Isotope
		var loading = 0;
		var portfolioMsnry = $('#protfolio-msnry').isotope({
			itemSelector: '.single-port-item',
			layoutMode: 'fitRows'
		});


		$('#portfolio-msnry-sort a').on( 'click', function(e) {

			e.preventDefault();

			if ( $(this).parent('li').hasClass('active') ) {
				return false;
			} else {
				$(this).parent('li').addClass('active').siblings('li').removeClass('active');
			}

			var $this = $(this);
			var filterValue = $this.data('target');

			// set filter for Isotope
			portfolioMsnry.isotope({ filter: filterValue });

			return $(this);
		});

		$('#portfolio-item-loader').on( 'click', function(e) {
			e.preventDefault();
			var $this = $(this);

			for (var i = 0; i < 3; i++) {
				$.get("portfolioitems.html", function(data, status){
					var lists, numb, target = $('#portfolio-msnry-sort li.active a').data('target');

					lists = ( target != '*' ) ? $(data).find('li'+target) : $(data).find('li');

					if (lists.length > 0) {
						numb = Math.floor(Math.random() * lists.length);
						portfolioMsnry.isotope( 'insert', lists.eq(numb) );

						loading++;
						( loading == 9 ) ? $this.remove() : "";
					}

				});
			}

		});

		var portfolioModal = $('#portfolioModal'),
			portImgArea = portfolioModal.find('.model-img'),
			portTitle = portfolioModal.find('.modal-content .title'),
			portContent = portfolioModal.find('.modal-content .m-content'),
			portLink = portfolioModal.find('.modal-footer .modal-action'),
			portGit = portfolioModal.find('.modal-footer .github');
		
		$('#protfolio-msnry').delegate('a.modal-trigger', 'click', function(e){
			e.preventDefault();
			var $this = $(this);
			portfolioModal.openModal({
				dismissible: true,
				opacity: '.4',
				// in_duration: 400,
				// out_duration: 400,
				ready: function() {
					var imgSrc = $this.data('image-source'),
					title = $this.data('title'),
					content = $this.data('content'),
					demoLink = $this.data('demo-link'),
					gitLink = $this.data('github');

					if ( imgSrc ) {
						portImgArea.html('<img src="'+imgSrc+'" alt="Portfolio Image" />');
					}


					portTitle.text(title);
					portContent.text(content);
					portLink.attr('href', demoLink);
					portGit.attr('href', gitLink);

					var omit = ['TreeAdvisor', 'Boom Industrial', 'Wanderjoy Vacations', 'Newwell Banker Realestate', 'American Service to India', 'GyroPad'];
					var show = ['Dance Mentors', 'FilmFunnel','Memory Match', 'Calculator'];
					for(var i = 0; i <= omit.length-1; i++){
						if(omit[i] === title){
							$('a.github').addClass('hideGit');
						}
					}
					for(var i = 0; i <= show.length-1; i++){
						if(show[i] === title){
							$('a.github').removeClass('hideGit');
						}
					}
					if(title === 'Dance Mentors'){
						$('a.live').addClass('hideLive');
					} else {
                        $('a.live').removeClass('hideLive');
					}
				}
			});
		});
	}

	// skills animation
	$('#skillSlider').waypoint({
		handler: function(event, direction) {
			$(this).find('.singel-hr-inner').each(function(){
				var height = $(this).data('height');
				$(this).css('height', height);
			});
		},
		offset: '60%'
	});


	// Wow init
	new WOW({
		offset: 200,
		mobile: false
	}).init();
});





/*=========== count up statistic ==========*/

var $countNumb = $('.countNumb');

if ( $countNumb.length > 0 ) {
	$countNumb.counterUp({
		delay: 15,
		time: 1700
	});
}



$('#contactForm').on('submit', function(e){
	e.preventDefault();
	var $this = $(this),
		data = $(this).serialize(),
		name = $this.find('#contact_name'),
		email = $this.find('#email'),
		message = $this.find('#textarea1'),
		loader = $this.find('.form-loader-area'),
		submitBtn = $this.find('button, input[type="submit"]');

	loader.show();
	submitBtn.attr('disabled', 'disabled');

	function success(response) {
		swal("Thanks!", "Your message has been sent successfully!", "success");
		$this.find("input, textarea").val("");
	}

	function error(response) {
		$this.find('input.invalid, textarea.invalid').removeClass('invalid');
		if ( response.name ) {
			name.removeClass('valid').addClass('invalid');
		}

		if ( response.email ) {
			email.removeClass('valid').addClass('invalid');
		}

		if ( response.message ) {
			message.removeClass('valid').addClass('invalid');
		}
	}

	$.ajax({
		type: "POST",
		url: "inc/sendEmail.php",
		data: data
	}).done(function(res){

		var response = JSON.parse(res);

		if ( response.OK ) {
			success(response);
		} else {
			error(response);
		}


		var hand = setTimeout(function(){
			loader.hide();
			submitBtn.removeAttr('disabled');
			clearTimeout(hand);
		}, 1000);

	}).fail(function(){
		sweetAlert("Oops...", "Something went wrong, Try again later!", "error");
		var hand = setTimeout(function(){
			loader.hide();
			submitBtn.removeAttr('disabled');
			clearTimeout(hand);
		}, 1000);
	});
});
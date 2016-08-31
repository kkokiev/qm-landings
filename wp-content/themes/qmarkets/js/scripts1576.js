jQuery( function($){

	/* Define Global AjaxUrl */
	ajaxUrl = localize_array.ajaxurl;
	isRtl = localize_array.is_rtl;
	
	$(document).ready( function(){
		
		if( ! $('html').hasClass('ie8') ){
		
			/* $('html').niceScroll({
				scrollspeed: 35,
				autohidemode: false,
				zindex: 9999,
				background: '#ddd',
				cursorcolor: '#F80',
				cursorborder: 'none',
				cursorwidth: '8px',
				cursorborderradius: '0'
			}); */
		
		}
		
		$(document).setFirstHeight();
		
		$(document).locateFeaturesSliderNav();
		
		$(document).initSubMenus();
		
		$('.main-menu-wrap').mobileMenuClass();
		
		/* First Section Arrow - Scroll To Selected Section */
		
		$('body').on( 'click', '#first-section-arrow-down', function(e){
			
			e.preventDefault();
			
			var $this = $(this);
			
			var sectionIndex = $this.attr('data-section-index');
			
			$('.section-wrap').each( function(i){
				
				if( ( i + 1 ) == sectionIndex ){
					
					var sectionSelector = '#' + $(this).attr('id');
					var headerHeight = $('.header.fixed').height();
					
					$(window).scrollTo( sectionSelector, {
						duration: 1000,
						offset: { top: -headerHeight }
					});
					
				}
				
			});
			
		});
		
		/* Responsive Menu */
		
		$('body').on( 'click', '.mobile-menu-trigger', function(e){
		
			e.preventDefault();
			
			var $this = $(this);
			var $header = $this.closest('.header');
			var $menu = $header.find('.main-menu');
			
			if( $this.hasClass('opened') ){
				
				$menu.slideUp('fast');
				$this.removeClass('opened');
				
			}else{
				
				$menu.slideDown('fast');
				$this.addClass('opened');
				
			}
		
		});
		
		/* 
		 * Open search box.
		 */
		$('body').on( 'mouseenter', 'ul.main-menu > li.search > a', function(e){
		
			e.preventDefault();
			
			var header = $(this).closest('.header');
			var searchform = header.find('.search-form');
			
			searchform.fadeIn(300).find('input[type="text"]').focusInput();
		
		});
		
		$('body').on( 'click mousedown', '.mobile-search > a, ul.main-menu > li.search > a', function(e){
		
			e.preventDefault();
			e.stopPropagation();
			return false;
		
		});
		
		/* Open search box on mobile */
		$('body').on( 'click', '.mobile-search > a', function(e){
		
			e.preventDefault();
			e.stopPropagation();
			
			var header = $(this).closest('.header');
			var searchform = header.find('.search-form');
			
			searchform.fadeIn(300).find('input[type="text"]').focusInput();
		
		});
		
		/* 
		 * Close search box.
		 */
		$('body').on( 'focusout', '.search-form', function(e){
			
			$(this).fadeOut(300);
			
		});
		
		$(window).scroll( function(){
			
			$('.search-form').fadeOut(300);
			
		});
		
		$('body').on( 'click', 'ul.main-menu > li.sub-menu-title > a', function(e){
		
			e.preventDefault();
			
			return false;
		
		});
		
		$('body').on( 'click', '.mobile-menu ul.main-menu > li.menu-item-has-children > a', function(e){
		
			e.preventDefault();
			
			var $thisItem = $(this);
			var $menuItem = $thisItem.closest('li');
			var $subMenu = $menuItem.children('ul');
			
			if( !$menuItem.hasClass( 'sub-menu-title' ) ){
				
				if( $menuItem.hasClass('opened') ){
					
					$subMenu.slideUp('fast');
					$menuItem.removeClass('opened');
					
				}else{
					
					$subMenu.slideDown('fast');
					$menuItem.addClass('opened');
					
				}
			
			}
		
		})
		
	});

	$(window).resize( function(){
	
		$(document).setFirstHeight();
		
		$(document).locateFeaturesSliderNav();
		
		$('.main-menu-wrap').mobileMenuClass();
	
	});
	
	/* Focus on input element and place caret in the end of it's value */
	$.fn.focusInput = function(){
	
		var elem = $(this);
		elem = $(elem).get(0);
		
		var elemLen = elem.value.length;
		
		/* For IE Only */
		if( document.selection ){
			
			/* Set focus */
			elem.focus();
			
			/* Use IE Ranges */
			var oSel = document.selection.createRange();
			
			/* Reset position to 0 & then set at end */
			oSel.moveStart('character', -elemLen);
			oSel.moveStart('character', elemLen);
			oSel.moveEnd('character', 0);
			oSel.select();
			
		}else if( elem.selectionStart || elem.selectionStart == '0' ){
			
			/* Firefox/Chrome */
			elem.selectionStart = elemLen;
			elem.selectionEnd = elemLen;
			elem.focus();
			
		}
	
	}
	
	$.fn.locateFeaturesSliderNav = function(){
	
		var navSelector = $('.features-gallery-nav');
		var winWidth = $(window).width();
		
		navSelector.each( function(){
			
			var nav = $(this);
			var navWrapDesktop = nav.closest('.features-block').find('.features-gallery-nav-wrap.desktop-only:not(:has(.features-gallery-nav))');
			var navWrapMobile = nav.closest('.features-block').find('.features-gallery-nav-wrap.mobile-only:not(:has(.features-gallery-nav))');
			
			var nav = $(this);
			
			if( winWidth > 768 ){
				
				nav.appendTo(navWrapDesktop);
				
			}else{
				
				nav.appendTo(navWrapMobile);
				
			}
		
		});
	
	}
	
	$.fn.initSubMenus = function(){
	
		var sub_menus = $('ul.sub-menu');
		
		sub_menus.each( function(){
			
			var sub_menu = $(this);
			var sub_menu_parent = sub_menu.closest('li.menu-item');
			var sub_menu_items = sub_menu.find('li.menu-item');
			
			if( !sub_menu_items.length ){
				
				sub_menu_parent.removeClass('menu-item-has-children')
				sub_menu.remove()
				
			}
			
		});
	
	}
	
	$.fn.mobileMenuClass = function(){
	
		var menu = $(this);
		
		if( $('.mobile-menu-trigger').is(':visible') ){
			
			menu.addClass('mobile-menu');
			
		}else{
			
			menu.removeClass('mobile-menu');
			
		}
	
	}
	
	$.fn.setFirstHeight = function(){
	
		/* First Section - Set height on mobile devices */
			
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		var firstSection = $('.section-wrap > .section').first();
		
		/* if( winWidth < 769 ){ */
			
		firstSection.css({
			'height': winHeight,
			'padding-bottom': 0
		});
		
		/* }else{
		
			firstSection.first().removeAttr('style');
		
		} */
		
	}
	
	$.fn.parallaxBg = function( speed ){

		var section = $(this);
		
		section.css({
			
			'background-position': ( ( window.pageXOffset - section.offset().left ) / speed ) + "px " + ( ( window.pageYOffset - section.offset().top ) / speed ) + "px"
			
		});

	}

	$('.report-input:has(select)').addClass('report-select');
	$('.main-form-elements li:has(select)').addClass('report-select');
	
});

addeventatc.settings({
	license    : "awklRHZLCzUPBIOJdmnE19746",
	css        : false
});

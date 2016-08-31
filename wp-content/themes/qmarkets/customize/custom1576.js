jQuery( function($){

	/* Define Global AjaxUrl */
	ajaxUrl = localize_array.ajaxurl;
	pagingItemTitleBase = localize_array.paging_item_title_base;
	
	header = $('.header');
	fixedHeader = header.clone( true, true ).insertAfter( header );
	fixedHeader.addClass('fixed');
	
	var fixedLogoImg = fixedHeader.find('.site-logo img');
	var fixedLogoImgSrc = fixedLogoImg.attr('data-fixed-src');
	fixedLogoImg.attr('src', fixedLogoImgSrc)
	
	$(document).ready( function(){
		
		$('body').on( 'hover', 'ul.menu-level-2 > li', function(e){
		
			$(this).toggleClass('hovered');;
			
		});
		
		$('body').on( 'mouseover', 'ul.menu-level-2 > li > a', function(e){
		
			var menuItem = $(this);
			var menuItemLi = $(this).closest('li.menu-item');
			var isCurrent = menuItemLi.hasClass('current-menu-item');
			var menuItemLiSiblings = menuItemLi.siblings();
			var menuItemRel = menuItem.attr('rel');
			
			var header = menuItem.closest('.header');

			var subMenuMenus = header.find('.menu-level-3 > li');
			var subMenuRelMenu = header.find('.menu-level-3 > li.' + menuItemRel);
			
			setTimeout( function(){
					
				if( menuItemLi.is('.hovered') ){
					
					menuItemLiSiblings.removeClass('hovered-menu-item').addClass('unhovered-menu-item');
					menuItemLi.removeClass('unhovered-menu-item').addClass('hovered-menu-item');

					/* if( subMenuRelMenu.find('.sub-menu').length || isCurrent ){ */
						
						subMenuMenus.hide();
						subMenuRelMenu.show();
					
					/* } */
				
				}
			
			}, 500 );
			
		});
		
		$('body').on( 'mouseleave', '.menu-level-2-row', function(e){
			
			var menuRow = $(this);
			var subMenuMenus = $('.menu-level-3 > li');
			var currentMenuRel = $('.menu-level-2 > li.current-menu-ancestor > a').attr('rel');
			var currentSubMenu = $('.menu-level-3 > li.' + currentMenuRel);
			
			setTimeout( function(){
				
				menuRow.find('li.hovered-menu-item').removeClass('hovered-menu-item');
				menuRow.find('li.unhovered-menu-item').removeClass('unhovered-menu-item');
				
				subMenuMenus.hide();
				currentSubMenu.show();
			
			}, 500 );
		
		});
		
		$('body').on( 'hover', '.header.fixed .menu-level-2-row', function(e){
			
			e.stopPropagation();
			
			setTimeout( function(){
				
				if( $('.header.fixed .menu-level-3 li li').length > 0 ){
					
					$('.header.fixed .row.menu-level-3-row').slideToggle(100);
				
				}
			
			}, 500 );
			
		});
		
		/* $('body').on( 'mouseleave', '.header.fixed .menu-level-2-row', function(e){
			
			e.stopPropagation();
			
			$('.row.menu-level-3-row').slideUp(100);
		
		}); */
		
		$('body').on( 'click', 'li.anchor-item > a', function(e){
			
			e.preventDefault();
			
			var menuItem = $(this);
			var anchor = menuItem.attr('href');
			
			if( $( anchor ).length > 0 ){
			
				var headerPosition = $('.header').css('position');
				var scrollOffset = 0;
				
				if( headerPosition == 'fixed' ){
					
					var fixedHeader = $('.header');
					var headerHeight = fixedHeader.outerHeight();
					
					scrollOffset = headerHeight;
					
				}
				
				$('html, body').animate({
					
					scrollTop: $( anchor ).offset().top - scrollOffset
					
				}, 700);
			
			}
			
		});
		
		$('body').on( 'click', '.blog-post.expand-content.closed h3 a, .blog-post.expand-content a.read-more', function(e){
		
			e.preventDefault();
			
			var listItem = $(this).closest('.blog-post');
			var moreLink = listItem.find('.blog-post-read-more > a');
			var lessTitle = moreLink.attr('data-less');
			var excerpt = listItem.find('.blog-post-excerpt');
			var fullContent = listItem.find('.blog-post-content');
			
			excerpt.fadeOut(400, function(){
				
				fullContent.fadeIn(400);
				
				listItem.addClass('expanded').removeClass('closed');
				
				moreLink.addClass('read-less').removeClass('read-more').html( lessTitle );
				
			});
		
		});
		
		$('body').on( 'click', '.blog-post.expand-content.expanded h3 a, .blog-post.expand-content a.read-less', function(e){
		
			e.preventDefault();
			
			var listItem = $(this).closest('.blog-post');
			var moreLink = listItem.find('.blog-post-read-more > a');
			var moreTitle = moreLink.attr('data-more');
			var excerpt = listItem.find('.blog-post-excerpt');
			var fullContent = listItem.find('.blog-post-content');
			
			fullContent.fadeOut(400, function(){
				
				excerpt.fadeIn(400);
				
				listItem.addClass('closed').removeClass('expanded');
				
				moreLink.addClass('read-more').removeClass('read-less').html( moreTitle );
				
			});
		
		});
		
		/* Add title attribute to blog pagination links */
		
		$('.blog-pagination .pagination ul li .page-numbers').each( function(){
			
			var item = $(this);
			var itemTitle = item.html();
			
			item.attr('title', pagingItemTitleBase + itemTitle);
			
		});
	
		var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
	
		setTimeout( function(){
		
			$('.site-preloader').fadeOut(600);
			
			/* Counters */
			
			$('.counter-number').each( function(){
				
				var counter = $(this);
				var delay = counter.attr('data-delay');
				
				delay = ( delay == '' || delay == 'undefined' ) ? 0 : delay;
				
				setTimeout( function(){
			
					counter.animateNumber({
						number: counter.attr('data-count'),
						numberStep: comma_separator_number_step
					}, 4500);
				
				}, delay);
			
			});
			
		}, 2500 );
		
		$('.contacts-accordion').accordion({
			header: '.accordion-item-title',
			heightStyle: 'content',
			animate: 150,
			collapsible: true,
			icons: { 'header': 'ui-icon-plus', 'activeHeader': 'ui-icon-minus' }
		});
		
		$('.wpcf7').find('select').each( function(){
			
			var select = $(this);
			var selectName = select.attr('name');
			var selectFirstOption = select.find('option').first();
			var selectFirstOptionHtml = selectFirstOption.html();
			
			var selectSecondOption = selectFirstOption.next();
			
			if( selectFirstOptionHtml == '---' ){
				
				if( selectName == 'country' ){
					
					selectFirstOption.html('Country');
					
					if( select.hasClass('wpcf7-validates-as-required') ){
					
						selectFirstOption.append(' *');
						
					}
					
				}else{
					
					selectFirstOption.remove();
					
				}
				
				selectSecondOption.attr('value', '');
				
			}
			/* select.find('option').first().html( select.attr('id') ); */
			
		});
		
		$(document).handleHeader();
		
		$(window).on( 'scroll', function(){
		
			$(document).handleHeader();
		
		});
  
	});
	
	$.fn.handleHeader = function() {
		
		var headerHeight = fixedHeader.outerHeight() + fixedHeader.find('.menu-level-2-row').outerHeight();
	
		if( $(window).scrollTop() > 250 && !fixedHeader.hasClass('fixed-now') ){
			
			/* if( !$('body').hasClass('home') ){
				
				header.before('<div class="header-placeholder" style="height: ' + headerHeight + 'px;"></div>');
				
			} */
			
			fixedHeader.addClass('fixed-now').css({
				
				'margin-top': -headerHeight
				
			}).animate({
			
				'margin-top': 0
				
			}, 200);
		
		}else if( $(window).scrollTop() < 250 && fixedHeader.hasClass('fixed-now') ){
			
			/* if( $('.header-placeholder').length > 0 ){
				
				$('.header-placeholder').remove();
			
			} */
			
			fixedHeader.removeClass('fixed-now').animate({
			
				'margin-top': -headerHeight
				
			}, 200);
		
		}
	
	}
	
	$.fn.isInView = function(){
		
		var $elem = $(this);
		var $window = $(window);

		var docViewTop = $window.scrollTop();
		var docViewBottom = docViewTop + $window.height();

		var elemTop = $elem.offset().top;
		var elemBottom = elemTop + $elem.height();

		return ( ( elemBottom <= docViewBottom ) && ( elemTop >= docViewTop ) );

	}
	
	$.fn.initSlider = function() {
	
		var slider = $(this);
		var slideImg = slider.find('.feature-image-wrap');
		var slideText = slider.find('.flex-active-slide .feature-excerpt-wrap');
		
		slider.changeStripBg();
		
		slideText.animate({
			opacity: 1
		}, 300);
	
	}
	
	$.fn.beforeSlide = function() {
	
		var slider = $(this);
		var slideImg = slider.find('.feature-image-wrap');
		var slideText = slider.find('.feature-excerpt-wrap');
		
		slider.changeStripBg();
		
		slideImg.animate({
			left: '-80%',
			opacity: 0
		}, 400, function(){
		
			slideImg.css({
				left: 'auto',
				right: '-100%',
			});
			
		});
		
		slideText.animate({
			left: '-80%',
			opacity: 0
		}, 400, function(){
		
			slideText.css({
				left: 'auto',
				right: '-100%',
			});
			
		});
		
		/* setTimeout( function(){
		
			slideText.animate({
				opacity: 0
			}, 400);
			
		}, 400); */
	
	}
	
	$.fn.afterSlide = function() {
	
		var slider = $(this);

		
		var slideImg = slider.find('.feature-image-wrap');
		var slideText = slider.find('.flex-active-slide .feature-excerpt-wrap');

		/* var section = slider.closest('.section-wrap');
		var bgStrip = section.find('.feature-bg-strip');
		var slideColor = section.find('.slides li.flex-active-slide').attr('data-color');
		
		bgStrip.css({
			'background-color': slideColor
		}); */
		
		slideImg.animate({
			right: 0,
			opacity: 1
		}, 400);
		
		slideText.animate({
			right: 0,
			opacity: 1
		}, 400);
		
		/* setTimeout( function(){
			
			slideText.animate({
				opacity: 1
			}, 400, function(){
				
			});
			
		}, 450); */
	
	}
	
	$.fn.logoRotator = function( startDelay, pause ) {
	
		startDelay = startDelay || 100;
		pause = pause || 1500;
	
		var rotator = $(this);
		
		var moreLogosList = $('.more-logos-holder');
		var moreLogosListItems = moreLogosList.children('li');
		
		if( moreLogosListItems.length > 0 ){
		
			setTimeout( function(){
			
				setInterval( function(){
					
					var randomLogoLi = rotator.children('li').not('.animated').random();
					
					if( randomLogoLi.length == 0 ){
					
						rotator.children('li').removeClass('animated');
						
						randomLogoLi = rotator.children('li').not('.animated').random();
					
					}
					
					var randomLogoWrap = randomLogoLi.find('.logo-wrap');
					var randomLogoImg = randomLogoWrap.find('img');
					
					randomLogoWrap.animate( { opacity: 0 }, 700, function(){
					
						var moreLogosFirstItem = moreLogosList.find('li').first();
						var oldSrc = randomLogoImg.attr('src');
						var newSrc = moreLogosFirstItem.attr('data-src');
						
						
						moreLogosFirstItem.attr('data-src', oldSrc).appendTo(moreLogosList);
						
						randomLogoImg.attr('src', newSrc);
						randomLogoWrap.animate( { opacity: 1 }, 700);
						randomLogoLi.addClass('animated');
					
					});
					
				}, pause );
				
			}, startDelay );
		
		}
	  
	}
	
	$.fn.random = function() {
	
		return this.eq(Math.floor(Math.random() * this.length));
	  
	} 
	
	$.fn.changeStripBg = function() {
	
		var slider = $(this);
		var section = slider.closest('.section-wrap');
		var bgStrip = section.find('.feature-bg-strip');
	
		setTimeout( function(){
			
			var slideColor = section.find('.slides li.flex-active-slide').attr('data-color');
			
			bgStrip.css({
				'background-color': slideColor
			});
			
		}, 400 );
	  
	} 
	
	$.fn.startSliderIfVisible = function( slider ){
	
		/* var slider = $(this); */
		
		var winheight = $(window).height();
		var fullheight = $(document).height();
		var counter = 1;
		
		topcoords = slider.offset().top;
		
		wintop = $(window).scrollTop();
 
		if(wintop > (topcoords - (winheight*.8))) {
			
			if( counter == 1 ){

				slider.flexslider('play');
			
			}
			
			counter++;
			
		}
	
	}
	
});
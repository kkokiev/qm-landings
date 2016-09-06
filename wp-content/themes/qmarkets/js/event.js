(function($) {
	
	$('.ev-map-item-block-btn').on('click', function(event) {
		event.preventDefault();

		if($(this).hasClass('clicked')) {
			$(this).removeClass('clicked');
		} else {
			$(this).addClass('clicked');
		}

		var $thisMapBlock = $(this).parents('.ev-map-item-block');
		if( $thisMapBlock.hasClass('open')) {
			$thisMapBlock.removeClass('open');
		} else {
			$thisMapBlock.addClass('open');
		}

	});

	/*disable google map scroll*/
	$('.ev-map-item-block-wrap')
		.on('click', function(){
				$(this).find('iframe').addClass('clicked');
			})
		.on('mouseleave', function(){
			$(this).find('iframe').removeClass('clicked');
		});

})(jQuery);
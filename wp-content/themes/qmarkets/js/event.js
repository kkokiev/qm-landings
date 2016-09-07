(function($) {

	$('.ev-map-item-block-btn').on('click', function(event) {
		event.preventDefault();

		if($(this).hasClass('clicked')) {
			$(this).removeClass('clicked');
		} else {
			$(this).addClass('clicked');
		}

		var $thisMapBlock = $(event.target).parents('.ev-map-item-block');
		if( $thisMapBlock.hasClass('open')) {
			$thisMapBlock.removeClass('open');
		} else {
			$thisMapBlock.addClass('open');
		}

	});

	/*open map function in click on any area of map*/
	$('.ev-map-item-outer-block').on('click', function() {
		var $windowWidth = $(window).width();

		if($windowWidth <= 1100) {
			var $mapWraper = $(this).parent('.ev-map-item-block');
			var $mapBtn = $(this).siblings('.ev-map-item-block-btn');

			if (!$mapWraper.hasClass('open')) {
				$mapWraper.addClass('open');
				$mapBtn.addClass('clicked');
			}
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

	/*Close map in click on any area out of map*/
	$('.ev-map-item-block').on('click', function(e) {
		e.stopPropagation();
	});

	$(document).on('click', function(e) {
		$('.ev-map-item-block').removeClass('open');
		$('.ev-map-item-block-btn').removeClass('clicked');
	});

})(jQuery);
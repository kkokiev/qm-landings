jQuery( function($){
	
	var animate_elem = $('.animate');
	var winheight = $(window).height();
	var fullheight = $(document).height();
	
	$(document).ready( function(){

		/* Animated Blocks Definition */
		
		animate_elem.each(function(){
		
			var $elem = $(this);
			var direction = $elem.attr('data-direction');
			var distance = $elem.attr('data-distance');

			direction = ( direction == '' || direction == 'undefined' ) ? 'fade' : direction;
			distance = ( distance == '' || distance == 'undefined' ) ? 0 : distance;
			
			var anim = {opacity: 0};
			if( direction != 'fade' ){
				anim[direction] = '-' + distance;
			}
			
			$elem.css(anim);
			
		});
	
		$(window).on( 'scroll load', function(){

			animate_elem.css({ 'visibility': 'visible' });
			
			/* BlockS Animation */
			
			wintop = $(window).scrollTop(); /* calculate distance from top of window */
	 
			/* loop through each item to check when it animates */
			animate_elem.each(function(){
			
				var $elem = $(this);
				var direction = $elem.attr('data-direction');
				var delay = $elem.attr('data-delay');
				var duration = $elem.attr('data-duration');
				
				direction = ( direction == '' || direction == 'undefined' ) ? 'fade' : direction;
				delay = ( delay == '' || delay == 'undefined' ) ? 0 : delay;
				duration = ( duration == '' || duration == 'undefined' ) ? 400 :duration;
				var anim = { opacity: 1 };
				if( direction != 'fade' ){
					anim[direction] = 0;
				}
				
				if($elem.hasClass('animated')) { return true; } /* if already animated skip to the next item */
		  
				topcoords = $elem.offset().top; /* element's distance from top of page in pixels */
				
				if(wintop > (topcoords - (winheight*.8))) {
					
					setTimeout( function(){
					/* animate when top of the window is 3/4 above the element */
					/* $elem.addClass('animated'); */
					$elem.animate(anim, 400);
					
					}, delay);
				}
				
			});	

		});
  
	});
	
});
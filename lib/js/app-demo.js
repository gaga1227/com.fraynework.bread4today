/* -------------------------------------------------------------------------- */
/* enable buttons */

//common
$(document).on('touchstart', '[data-role="button"]', function(e)	{ console.log('e:touchstart'); $(this).addClass('active'); });
$(document).on('touchmove', '[data-role="button"]', function(e)		{ console.log('e:touchmove'); $(this).removeClass('active'); });
$(document).on('touchend', '[data-role="button"]', function(e) 		{ console.log('e:touchend'); $(this).removeClass('active'); });
$(document).on('tap', '[data-role="button"]', function(e) 			{ console.log('e:tap'); });
$(document).on('longTap', '[data-role="button"]', function(e) 		{ console.log('e:longTap'); });
$(document).on('click', '[data-role="button"]', function(e) 		{ console.log('e:click'); });

/* -------------------------------------------------------------------------- */
/* draft View */
App = {};
App.view = {};
App.view.startupPage = 'Home';
App.view.initScroller = function(id){
	var	$container = App.view.pages[id].find('[data-role=scroller]'),
		scroller;
	App.view.destroyScroller();
	if (!$container.length) {
		return 'no scroller container found';
	}
	scroller = App.view.scroller = new FTScroller($container[0], {
		scrollingX: 			false,
		scrollbars: 			true,
		updateOnChanges: 		true,
		bouncing:				$.os.ios ? true : false
	});
};
App.view.destroyScroller = function(removeElements){
	if (App.view.scroller) App.view.scroller.destroy(removeElements);
};

$(document).ready(function(){

});

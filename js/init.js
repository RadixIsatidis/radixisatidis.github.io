/*
	Striped 2.5 by HTML5 Up!
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
skel.init({
	prefix: '/css/style',
	resetCSS: true,
	useOrientation: true,
	breakpoints: {
		'mobile': {
			range: '-640',
			lockViewport: true,
			containers: 'fluid',
			grid: {
				collapse: true
			}
		},
		'desktop': {
			range: '641-',
			containers: 1200
		},
		'wide': {
			range: '1201-'
		},
		'narrow': {
			range: '641-1200',
			containers: 960
		},
		'narrower': {
			range: '641-1000'
		}
	}
}, 
{
	panels: {
		panels: {
			sidePanel: {
				breakpoints: 'mobile',
				position: 'left',
				style: 'reveal',
				size: '250px',
				html: '<div data-action="moveElement" data-args="sidebar"></div>',
				swipeToClose: true
			},
			sidePanelNarrower: {
				breakpoints: 'narrower',
				position: 'left',
				style: 'reveal',
				size: '300px',
				html: '<div data-action="moveElement" data-args="sidebar"></div>',
				swipeToClose: true
			}
		},
		overlays: {
			titleBar: {
				breakpoints: 'mobile',
				position: 'top-left',
				width: '100%',
				height: 44,
				html: '<div class="toggle " data-action="panelToggle" data-args="sidePanel"></div>' +
					  '<div class="title" data-action="copyHTML" data-args="logo"></div>'
			},
			titleBarNarrower: {
				breakpoints: 'narrower',
				position: 'top-left',
				width: '100%',
				height: 60,
				html: '<div class="toggle " data-action="panelToggle" data-args="sidePanelNarrower"></div>' +
					  '<div class="title" data-action="copyHTML" data-args="logo"></div>'
			}
		}
	}
});
$(function(){
	var debounce = function(func, wait, immediate) {
		var timeout, result;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) result = func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) result = func.apply(context, args);
			return result;
		};
	};
	var threshold = 0;

	// true为向下滚动，false为向上滚动
	var direction = null;
	var $document = $(document);
	var lastScrollTop = $document.scrollTop();

	var titleBar = null;
	var titleBarNarrower = null;
	var actionBar = null;

	var _scroll = debounce(function () {
		if (!titleBar) {
			var _bar = $('#titleBar');
			if (_bar.length > 0) {
				titleBar = _bar;
				titleBar._childTitle = titleBar.children('.title');
			}
		}

		if (!titleBarNarrower) {
			var _bar = $('#titleBarNarrower');
			if (_bar.length > 0) {
				titleBarNarrower = _bar;
				titleBarNarrower._childTitle = titleBarNarrower.children('.title');
			}
		}

		if (!actionBar || !actionBar[0].parentElement) {
			actionBar = ((titleBar && titleBar[0].parentElement) && titleBar) || 
			((titleBarNarrower && titleBarNarrower[0].parentElement) && titleBarNarrower) ||
			null;
		}

		if (actionBar) {
			threshold = actionBar._childTitle.height() / 2;
			if (true === direction) {
				// 向下滚动
				var height = actionBar._childTitle.height();
				actionBar.animate({
					top: (0 - height)
				}, function (){
					direction = null;
				})
			} else if (false === direction) {
				// 向上滚动
				actionBar.animate({
					top: 0
				}, function (){
					direction = null;
				})
			}
		};

	}, 500);

	$document.on('scroll', function (e) {
		// console.log(e);
		var _top = $document.scrollTop();
		if (_top > lastScrollTop && (_top - lastScrollTop) > threshold) {
			direction = true;
			lastScrollTop = _top;
		} else if (_top < lastScrollTop && (lastScrollTop - _top) > threshold) {
			direction = false;
			lastScrollTop = _top;
		} else if (Math.abs(lastScrollTop - _top) > threshold) {
			lastScrollTop = _top;
		}
		
		_scroll();
	})
});



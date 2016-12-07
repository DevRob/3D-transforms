

	var layers = [],
		objects = [],

		world = document.getElementById( 'world' ),
		viewport = document.getElementById( 'viewport' ),

		depth = 0,
		perspective = 1000,
		x = 0,
		worldYAngle = 0,
		worldXAngle = 0;

	viewport.style.webkitPerspective = perspective;
	viewport.style.MozPerspective = perspective;
	viewport.style.oPerspective = perspective;

	function transX(element, x) {
		element.style.transform += 'translateX( ' + x + 'px )';
		return element;
	}

	window.addEventListener("mousedown", function() {
	  window.addEventListener("mousemove", calcAngle, false);
	});

	window.addEventListener("mouseup", function() {
	  window.removeEventListener("mousemove", calcAngle, false);
	});

	window.addEventListener( 'mousewheel', onContainerMouseWheel );
	window.addEventListener( 'DOMMouseScroll', onContainerMouseWheel );

	function updateView(depth, worldXAngle, worldYAngle) {
		var transform = 'translateZ( ' + depth + 'px ) rotateX( ' + worldXAngle + 'deg ) rotateY( ' + worldYAngle + 'deg )';
		world.style.webkitTransform = transform;
		world.style.MozTransform = transform;
		world.style.oTransform = transform;
	}

	function onContainerMouseWheel( event ) {
		event = event ? event : window.event;
		viewport.style.cursor = event.wheelDelta < 0 ? "zoom-in" : "zoom-out";
		setTimeout(function() {
			viewport.style.cursor = "auto";
		}, 300);
		depth = depth - ( event.detail ? event.detail * -5 : event.wheelDelta / 2 );
		depth = depth > 300 ? 300 : depth < -600 ? -600 : depth;
		updateView(depth, worldXAngle, worldYAngle);
	}

	function calcAngle( event ){
		worldYAngle += event.movementX * 0.2;
		worldXAngle += -event.movementY * 0.2;
		updateView(depth, worldXAngle, worldYAngle);
	}

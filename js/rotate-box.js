	var layers = [],
		objects = [],

		world = document.getElementById( 'world' ),
		viewport = document.getElementById( 'viewport' ),

		d = 0,
		p = 400;

	viewport.style.webkitPerspective = p;
	viewport.style.MozPerspective = p;
	viewport.style.oPerspective = p;

	generate();

	function createCloud() {

		var div = document.createElement( 'div'  );
		div.className = 'cloudBase';
		var x = 120;
		var y = 86;
		var z = 135;
		var t = 'translateX( ' + x + 'px ) translateY( ' + y + 'px ) translateZ( ' + z + 'px )';
		div.style.webkitTransform = t;
		div.style.MozTransform = t;
		div.style.oTransform = t;
		world.appendChild( div );

		return div;
	}

	window.addEventListener("mousedown", function() {
	  window.addEventListener("mousemove", calcAngle, false);
	});

	window.addEventListener("mouseup", function() {
	  window.removeEventListener("mousemove", calcAngle, false);
	});

	window.addEventListener( 'mousewheel', onContainerMouseWheel );
	window.addEventListener( 'DOMMouseScroll', onContainerMouseWheel );



	function generate() {
		objects = [];
		if ( world.hasChildNodes() ) {
			while ( world.childNodes.length >= 1 ) {
				world.removeChild( world.firstChild );
			}
		}
		for( var j = 0; j < 5; j++ ) {
			objects.push( createCloud() );
		}
	}

	function updateView(worldXAngle, worldYAngle) {
		var t = 'translateZ( ' + d + 'px ) rotateX( ' + worldXAngle + 'deg) rotateY( ' + worldYAngle + 'deg)';
		world.style.webkitTransform = t;
		world.style.MozTransform = t;
		world.style.oTransform = t;
	}

	function onContainerMouseWheel( event ) {
		event = event ? event : window.event;
		viewport.style.cursor = event.wheelDelta < 0 ? "zoom-in" : "zoom-out";
		setTimeout(function() {
			viewport.style.cursor = "auto";
		}, 300);
		d = d - ( event.detail ? event.detail * -5 : event.wheelDelta / 2 );
		d = d > 300 ? 300 : d < -600 ? -600 : d;
		updateView();
	}

	function calcAngle( event ){
		var transform = document.getElementById('world').style.transform;
		var worldXAngle = transform.trimBothEnd("rotateX(", "deg) rotateY");
		var worldYAngle = transform.trimBothEnd("rotateY(", "deg)");
		console.log(worldXAngle, worldYAngle);
		worldYAngle =+ event.movementX;
		worldXAngle =+ event.movementY;

		updateView(worldXAngle, worldYAngle);
		// worldYAngle = -( .6 - ( event.clientX / window.innerWidth ) ) * 180;
		// worldXAngle = ( .6 - ( event.clientY / window.innerHeight ) ) * 180;


	}

	String.prototype.trimBothEnd = function(after, before) {
		var begin = this.indexOf(after) + after.length;
		var end = this.indexOf(before);
		return this.substr(begin, end - begin);
	}

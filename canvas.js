// requestAnimationFrame Shim
(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  	window.requestAnimationFrame = requestAnimationFrame;
})();
$(document).ready(function(){
	function counterNumber($this) {
		var i = 0;
		setInterval(function(){
			if(i >= $this.data('percent')){
				return false;
			}
			i++;
			$this.find('.numberCanvas').text(i+ '%');
		}, $this.data('speed'));
	}
	$('.mainCanvasContainer').each(function(){
		$this = $(this);
		if($this.find('.numberCanvas').length > 0 ) {
			counterNumber($this);
		}
	});
	$('.mainCanvas').each(function(){
		$this = $(this).closest('.mainCanvasContainer');
		var canvas = $(this)[0];
		var context = canvas.getContext('2d');
		var x = canvas.width / 2;
		var y = canvas.height / 2;
		var radius = $this.data('radius');
		var endPercent = $this.data('percent');
		var curPerc = 0;
		var circ = Math.PI * 2;
		var quart = Math.PI / 2;
		context.lineWidth = $this.data('line_width');
		context.lineCap = 'round';
		context.strokeStyle = $(this).data('color');
		function animate(current) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.beginPath();
			context.arc(x, y, radius, -(quart), ((circ) * current) - quart, false);
			context.stroke();
			setTimeout(function(){
				curPerc++;
				if (curPerc <= endPercent) {
					requestAnimationFrame(function () {
						animate(curPerc / 100);
					});
				}
			}, $this.data('speed'));
		}
		animate(curPerc/100);
	});
	$('.backCanvas').each(function(){
		$this = $(this).closest('.mainCanvasContainer');
		var canvas = $(this)[0];
		var context = canvas.getContext('2d');
		var x = canvas.width / 2;
		var y = canvas.height / 2;
		var radius = $this.data('radius');
		var endPercent = 100;
		var curPerc = 0;
		var circ = Math.PI * 2;
		var quart = Math.PI / 2;
		context.arc(x, y, radius, 0, circ, false);
		context.lineWidth = $this.data('line_width');
		context.lineCap = 'butt';
		context.strokeStyle = $(this).data('color');
		context.stroke();
	});
	/*$('.textCanvas').each(function(){
		$this = $(this);
		counterNumber($this);
	});*/
	
});

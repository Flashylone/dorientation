var Dorientation = function(obj){
	var defaults = {
		dori:'.home',
		sensitive: 15,
		duration: 1,
		screenWidth: '100%',
	};
	obj.dori = obj.dori || defaults.dori;
	obj.sensitive = obj.sensitive || defaults.sensitive;
	obj.duration = obj.duration || defaults.duration;
	obj.screenWidth = obj.screenWidth || defaults.screenWidth;
	var home = document.querySelector(obj.dori);
	var n = document.querySelectorAll('.dori-single').length;
	var movingR = false,movingL = false;
	var dx = 20;
	var countdx = 0;
	var moving = false;

	if(typeof obj.screenWidth !== 'number'){
		obj.screenWidth = document.body.clientWidth;
	}

	function handleOrientation(event) {
		var x,y=0;
		x = event.beta;
		y += event.gamma;
		var osl = home.offsetLeft;
	  

		if(!movingR&&!movingL){
	  		if(y>obj.sensitive*2){
	  			if(osl < 0){
	  				moveR();
	  			}
	  		}else if(y<-obj.sensitive*2){
	  			if (osl > -(n-1)*obj.screenWidth) {
	  				moveL();
	  			}
	  		}
	  	}

	  function moveR(){
	  	window.removeEventListener("deviceorientation",handleOrientation);
	  	movingR = true;
	  	var timeR;
	  	var current = home.style.left;
	  	
	  	timeR = setInterval(function(){
	  		home.style.left = home.offsetLeft + dx +'px';
	  		countdx -= dx;
	  		if(countdx<-630){
	  			countdx=0;
	  			movingR = false;
	  			movingL = false;
	  			resetEvent();
	  			clearInterval(timeR);
	  		}
	  	},obj.duration);
	  }

	  function moveL(){
	  	window.removeEventListener("deviceorientation",handleOrientation);
	  	movingL = true;
	  	var timeL;
	  	timeL = setInterval(function(){
	  		home.style.left = home.offsetLeft - dx+'px';
	  		countdx += dx;
	  		if(countdx>630){
	  			countdx=0;
	  			movingR = false;
	  			movingL = false;
	  			resetEvent();			  			
	  			clearInterval(timeL);
	  		}
	  	},obj.duration);
	  }
	}

	function resetEvent(){
		setTimeout(function(){
			window.addEventListener('deviceorientation', handleOrientation);
		},800);
	}
	// window.addEventListener('devicemotion', handleOrientation,true);
	window.addEventListener('deviceorientation', handleOrientation);

	// return this;
};
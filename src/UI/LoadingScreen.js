// hide loading screen(../public/index.html)

var os_loading_screen = document.getElementById('os-loading-screen');
var opacity = 9;

var default_interval = setInterval(() => {
    var sceen_hide_interval = setInterval(() => {

		if(opacity < 0) {
        	clearInterval(sceen_hide_interval); 
        	os_loading_screen.style.display = 'none';
		} else {
        	os_loading_screen.style.opacity = "0." + opacity-- + "0";
		}
	}, 70);

	clearInterval(default_interval);
}, 500);
      
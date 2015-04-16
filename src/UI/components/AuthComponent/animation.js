export default class Animate {
	static background(sel) {
		var element = document.querySelector(sel);
		var direct = {};

		var color = {
			r: 70,
			g: 200,
			b: 70
		};

		var bright = {
			min: 70,
			max: 220
		};

		var max_random = 7;
		var slow_col = 'r';
		var deg = 90;

		var rnd = (max)=> Math.floor(Math.random()*max);

		Object.keys(color).map((key)=> direct[key] = true);

		setInterval(()=>{
			//element.style.backgroundColor = `rgb(${color.r},${color.g},${color.b})`;
			//element.style.background = ` linear-gradient(to right, rgb(${Math.abs(255-color.r)},${Math.abs(255-color.g)},${Math.abs(255-color.b)}) 0%, rgb(${color.r},${color.g},${color.b}) 100%)`;
			element.style.background = `linear-gradient(${deg}deg, rgb(${color.g},${color.b - 50},${color.r - 50}) 0%, rgb(${color.r},${color.g},${color.b}) 100%)`;
						
			deg++;
			Object.keys(color).map((key)=> {
				if(slow_col === key) {
				} else {
					color[key] = direct[key] ? color[key] +rnd(max_random): color[key] -rnd(max_random);
				}

				if(color[key] > bright.max) direct[key] = false;
				if(color[key] < bright.min) direct[key] = true;
			});

		}, 100);

		setInterval(()=> slow_col = Object.keys(color)[Math.floor(Math.random()*3)], 3000);
	}
}
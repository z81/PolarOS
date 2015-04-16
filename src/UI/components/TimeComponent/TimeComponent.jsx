require("./time.less");

export default class TimeComponent {
	constructor() {
		this.setTime();

		// Ждем пока наступит следующая минута и вешаем таймер на 60сек
		var syncDealay = 1000 * (60 - (new Date()).getSeconds());
		var syncTimer = setInterval(() => {
			clearInterval(syncTimer);
			this.setTime();
			setInterval(() => this.setTime(), 60000);
		}, syncDealay);
		
	}
	controller() {

	}
	view(ctrl) {
		return <span id="time">{this.time}</span>;
	}
	setTime() {
		this.time = (new Date()).toString().split(' ')[4].substr(0, 5);
		m.redraw()
	}
}

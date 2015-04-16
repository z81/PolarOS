var _config = null;
var _ready = false;


export default class Config {

	/**
	 * [init description]
	 */
	static init() {
		// bind events
		Helper.on("auth.success", ()=> {

			Server.get('', function(data){
				_config = data.data;
				_ready = true;

				Helper.fire('config.ready', data.data);
				Helper.on("beforeunload", Config.save, window);
			})
		});

		global.Config = Config;
	}

	/**
	 * [get value from config]
	 * @param  {String}
	 */
	static get(path) {
		if(typeof path === 'string') {
			return Helper.getPath(path, _config);
		} else {
			return _config;
		}
	}

	/**
	 * [set value to config]
	 * @param {String} path
	 * @param {[type]} value
	 */
	static set(path, value) {
		if(typeof path === 'string') {
			Helper.setPath(path, _config, value);
			Helper.fire(path, value);
		} else {
			_config = path;
		}
		m.redraw();
	}

	/**
	 * [save configuration]
	 */
	static save() {
		Server.set('', _config, function(data){
			console.log('save', data)
		})
	}

	/**
	 * [isReady description]
	 * @return {Boolean}
	 */
	static isReady() {
		return _ready;
	}
}

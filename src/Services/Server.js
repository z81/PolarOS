var ws = null;
var isConnected = false;
var callbackList = {};

export default class Server {
	/**
	 * [init connect to server]
	 * @return {[type]}
	 */
	static init() {
		ws = new WebSocket("ws://" + document.location.hostname + ":8181");


		ws.onopen = function(e) {
			isConnected = true;

			Helper.fire('server.ready');
		};
		ws.onerror = function(e) {
			console.log('error', e)
			isConnected = false;

		};
		ws.onclose = function(e) {
			console.log('close', e)
			isConnected = false;
		};
		ws.onmessage = function(e) {
			var data = JSON.parse(e.data);
			if(data.callback && callbackList[data.callback]) {
				callbackList[data.callback](data);

			} 
		};

		global.Server = Server;
	}

	/**
	 * [send]
	 * @param  {[type]} send to server
	 */
	static send(data) {
		ws.send(data);
	}

	/**
	 * [query data to server]
	 * @param  {String} query type get/set/run
	 * @param  {[type]} data
	 * @param  {Function} callback
	 * @param  {String} function name for type=run
	 */
	static query(type, data, callback, func) {
		var callbackId = new Date().getTime();
		callbackList[callbackId] = callback;

		var replacer = (key, value) => {
		    if (key === 'UI') {
		        return undefined;
		    }
		    return value;
		}
		
		ws.send(JSON.stringify({
			type: type,
			data: data,
			func: func,
			callback: callbackId
		}, replacer));
	}

	/**
	 * [get query to server]
	 * @param  {String} property name
	 * @param  {Function} callback
	 */
	static get(prop, callback) {
		Server.query('get', prop, callback)
	}

	/**
	 * [set query to server]
	 * @param {String} property name
	 * @param {[type]} value
	 * @param {Function} callback
	 */
	static set(prop, value, callback) {
		Server.query('set', {property: prop, value: value}, callback)
	}

	/**
	 * [run query to server]
	 * @param  {String} function name
	 * @param  {[type]} data
	 * @param  {Function} callback
	 */
	static run(func, data, callback) {
		Server.query('run', data, callback, func);
	}

	/**
	 * [isReady description]
	 * @return {Boolean}
	 */
	static isReady() {
		return isConnected;
	}
}
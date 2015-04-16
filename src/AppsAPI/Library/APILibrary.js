require('./XHRProxy');

var callbackList = {};

class AppsAPI {

    static addEventListener() {
        window.addEventListener('message', (e) => {
            var data = JSON.parse(e.data);
            var isGoodCallback = 
                    data.__callback  &&  typeof callbackList[data.__callback] == 'function';

            if(isGoodCallback) {
                callbackList[data.__callback](data.data);
                delete callbackList[data.__callback];
            }
        })
    }

	static query(params, callback) {
        var callbackId = new Date().getTime();
        callbackList[callbackId] = callback;
        params.__callback = callbackId;
        params.__name = window.name;
        //params.type = "get";

        window.parent.postMessage(JSON.stringify(params), document.location.origin)
	}

    static get(name, callback) {
        var q = {
            query: name, 
            type: 'get'
        };

        AppsAPI.query(q, callback);
    }

    static set(name, data, callback) {
        var q = {
            query: name, 
            type: 'set', 
            data: data
        };

        AppsAPI.query(q, callback);
    }

    static init() {
        AppsAPI.addEventListener()
        
    }
 
}


AppsAPI.init();


global.AppsAPI = AppsAPI;
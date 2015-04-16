(function(_export) {
    var maincallbacks = {};

    // call main window method
    _export.callMain = function (data, callback) {

        var callbackRandom = crypto.getRandomValues(new Uint32Array(2));
        var callbackId = callbackRandom[0] + callbackRandom[1];
        var toSend = {
            callback: callbackId,
            key: window.name,
            data: data
        };

        maincallbacks[callbackId] = callback;
        window.parent.postMessage(JSON.stringify(toSend), document.location.origin);
    };

    window.addEventListener("message", function(e) {
        var data = JSON.parse(e.data);
        if(data.callback) {
            maincallbacks[data.callback](data.data);
        }
    });


    // XHR Proxy
    var originXhr = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        var self = this;
        this.status = 0;
        this.statusText = '';
        this.readyState = 0;
        this.responseText = '';
        this.responseXML = '';
        this.allResponce = [];

        //
        var syncProps = function(data) {

            if(data.methodName != 'init' && data.xhrId == self.xhrId) {
                if(data.xhr) {
                    Object.keys(data.xhr).map(function (k) {
                        if(typeof data.xhr[k] !== 'function') {
                            self[k] = data.xhr[k];
                        }
                    });
                }

                if(typeof self[data.methodName] == 'function' && data.methodName.substr(0,2) == 'on') {
                    self[data.methodName].call(data.event.target, data.event)
                }
            } else {
                self.xhrId = data.xhrId;
            }

        };

        //
        var syncXHRCall = function (method, args) {
            var interval = setInterval(function () {
                if(self.xhrId) {
                    callMain({type: 'xhr', method: method, args: args, xhrId: self.xhrId}, syncProps);
                    clearInterval(interval);
                }
            }, 10)
        };


        callMain({type: 'xhr', method: 'init'}, syncProps);

        this.open = function() {
            var args = Helper.clone(Array.prototype.slice.call(arguments));
            // wait xhrId
            syncXHRCall('open', args)

        };

        this.abort = function () {
            syncXHRCall('abort', []);
        };

        this.setRequestHeader = function (name, value) {
            syncXHRCall('setRequestHeader', [name, value]);
        };

        this.getAllResponseHeaders = function () {
            return self.allResponce;
        };

        this.getResponseHeader = function (name) {
            return self.allResponce == [] ? '' : self.allResponce[name];
        };


        this.send = function() {
            var args = Helper.clone(Array.prototype.slice.call(arguments));
            syncXHRCall('send', args);
        };

    };
})(window);

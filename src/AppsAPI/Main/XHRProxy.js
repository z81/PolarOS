// Todo: es5 -> es6
var xhrCallbacks = {};
var xhrProxy = function (data, e, event) {
    if (data.method == 'init') {
        var random = crypto.getRandomValues(new Uint32Array(2));
        var xhrId = random[0] + random[1];

        var xhr = new XMLHttpRequest();
        (function (xhr, xhrId, event, e) {
            ['onreadystatechange', 'onload', 'onerror'].map(function (method) {
                xhr[method] = function (ev) {
                    var x = Helper.clone(xhr, true);
                    x.allResponce = xhr.getAllResponseHeaders();
                    runIframeCallback(event.source, {
                        callback: e.callback,
                        data: {
                            xhr: x,
                            xhrId: xhrId,
                            methodName: method,
                            event: Helper.clone(ev, true)
                        }
                    });
                };
            })
        })(xhr, xhrId, event, e);
        xhrCallbacks[xhrId] = xhr;

        runIframeCallback(event.source, {callback: e.callback, data: {xhrId: xhrId, methodName: data.method}});
    } else {
        var xhr = xhrCallbacks[data.xhrId];
        xhr[data.method].apply(xhr, data.args);

        runIframeCallback(event.source, {
            callback: e.callback,
            data: {xhrId: data.xhrId, methodName: data.method, xhr: xhr}
        });
    }
};

module.export = xhrProxy;
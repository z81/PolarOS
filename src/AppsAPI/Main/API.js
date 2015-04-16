import xhrProxy from './XHRProxy.js';

window.runIframeCallback = function (source, response) {
    var response = JSON.stringify(response);
    source.postMessage(response, '*');
};


window.addEventListener("message", function (event) {
    var data = JSON.parse(event.data);

    if (data.type == 'xhr') {
        xhrProxy(data, e, event)

    } else if(data.type == 'get') {
        data.data = Config.get(data.query);
        //console.log(data)
        event.source.postMessage(JSON.stringify(data), '*')
    } else if(data.type == 'set') {

        Config.get('windows.list').map(function(w){
            if(data.__name === w.secureKey) {
                Config.get('apps.list').map(function(a){
                    if(a.path + a.manifest.url === w.src) {
                        Config.get('notify').push({
                            type: 'success',
                            title: l('Notify'),
                            text: l('App.change.conf.param', a.manifest.locales.ru.name, data.query, data.data)
                        })
                    }
                });
            }
        });
        

        Config.set(data.query, data.data);
        event.source.postMessage(JSON.stringify(data), '*')
    }


});




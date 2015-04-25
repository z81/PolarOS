import WinComponent from '../UI/Components/WindowsComponent/WinComponent.jsx';

var _isReady = false;
export default class Windows {

	static init() {
		window.Windows = Windows;
		_isReady = true;
	}

	static isReady() {
		return _isReady;
	}

	static run(app) {
		var width  = 350;
        var height = 350;
        

        if (app.manifest.window) {
            width  = app.manifest.window.width  || width;
            height = app.manifest.window.height || height;
        }

        var w = {
            UI: {},
            width: width,
            height: height,
            left: (window.innerWidth - width) / 2,
            top: (window.innerHeight - height) / 2,
            title: app.manifest.locales.ru.name,
            src: app.path + app.manifest.url,
            icon: app.path + app.manifest.icon,
            id: Config.get('windows.list').length,
            app: app
        }

        var windowEvents = {
            onClose: ((win) =>{
                delete Config.get('windows.list')[win.id];
                Config.get('windows.list').slice(1, win.id);
            }).bind(this)
        };

        w.UI = new WinComponent(w, windowEvents, Config.get('windows.list'));
        Config.get('windows.list').push(w);
        w.UI.active();    
	}

}
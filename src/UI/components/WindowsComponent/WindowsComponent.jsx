require("./windows.less");
import WinComponent from "./WinComponent.jsx";

export default class WindowsComponent {

    constructor(config) {
        this.config = config;
        this.windows = config.windows;
        WindowsComponent.windows = this.windows;


        var windowEvents = {
            onClose: ((w) =>{
                delete this.windows.list[w.id];
                this.windows.list.slice(1, w.id);
            }).bind(this)
        };

        this.config.windows.list.forEach((w, i) => {
            w.id = i;
            w.UI = new WinComponent(w, windowEvents, this.windows);
            return w;
        });

        return this;

    }

    static open(app) {
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
            id: WindowsComponent.windows.list.length,
            app: app
        }

        var windowEvents = {
            onClose: ((win) =>{
                delete WindowsComponent.windows.list[win.id];
                WindowsComponent.windows.list.slice(1, win.id);
            }).bind(this)
        };

        w.UI = new WinComponent(w, windowEvents, WindowsComponent.windows);
        WindowsComponent.windows.list.push(w);
        w.UI.active();    
    }

    view () {

        return (this.windows.list.map((w) =>{
                return w.UI.view();
            }))
    }
}


require("./windows.less");
import WinComponent from "./WinComponent.jsx";

export default class WindowsComponent {

    constructor(config) {
        this.config = config;
        this.windows = config.windows;


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

    view () {
        return (this.windows.list.map((w) =>{
                return w.UI.view();
            }))
    }
}


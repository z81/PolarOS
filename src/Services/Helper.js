var _ready = false;

export default class Helper {
    /**
     * [init Helper]
     */
    static init() {
        _ready = true;
        Helper.on('Helper.ready');
        global.Helper = Helper;
    }

    /**
     * [clone object]
     * @param  Object object to clone
     * @param  Boolean don't use json?
     * @return {Object}
     */
    static clone (data, noJSON) {
        if(noJSON) {
            var obj = {};
            for (var k in data) {
                obj[k] = typeof data[k] === 'object' ? Helper.clone(data[k]) : data[k];
            }
            return obj;
        }

        return JSON.parse(JSON.stringify(data))
    }

    /**
     * [renderComponents render MithrilJS component]
     * @param  {Object} {ElemId: Component instance, ...}
     * @param  {Object} Html root element
     */
    static renderComponents (args, root = document.body) {

        for(var id in args) {
            var el = document.createElement("span");
            el.id = id;
            root.appendChild(el);
            m.module(el, args[id]);
        }

        // bind semantic ui
        setTimeout(() => {
            $('.checkbox').checkbox()
        }, 700);

    }

    /*
        get value dotPath(obj, path)
        set value dotPath(obj, path, value)
        example dotPath({a:{b:'c'}}, 'a.b.c', 2)
    */
    /**
    * [dotPath set or get value from object]
    * @param  {String} path to value - "app.list.0"
    * @param  {Object} 
    * @param  {[type]} value to set
    */
    static dotPath(path, obj, value) {
        var dotPos = path.indexOf('.');

        if(dotPos === -1) {
            if(value && typeof obj[path] !== 'Object') {
                obj[path] = value;
            } else {
                return obj[path];
            }
        } else {
            var newPath = path.substr(dotPos + 1, path.length - 2);
            path = path.substr(0, dotPos);

            
            return Helper.dotPath(newPath, obj[path], value);
            
        }
    }

    /**
     * [getPath get path from object]
     * @param  {String} Path
     * @param  {Object} Object
     * @return {[type]}
     */
    static getPath (path, obj) {
       return Helper.dotPath(path, obj);
    }

    /**
     * [setPath set path from object]
     * @param {String} Path
     * @param {Object} Object
     */
    static setPath (path, obj, value) {
       Helper.dotPath(path, obj, value);
    }

    /**
     * [on addEventListener wrapper]
     * @param  {String} Event name
     * @param  {Function} Callback
     * @param  {Object} context, default  document
     */
    static on(e, callback, context = document) {
        context.addEventListener(e, callback, false);
    }

    /**
     * [fire fire document event]
     * @param  {String}  Event name
     * @param  {[type]}  Event data
     */
    static fire(name, data) {
        var event = new Event(name);
        event.data = data;
        document.dispatchEvent(event);
    }

    /**
     * [wait check service isReady or wait *.ready event]
     * @param  {String} Service or event name, case sensitivity
     * @param  {Function}
     */
    static wait(name, callback) {
        var isService = name in window && 'isReady' in window[name];

        isService && window[name].isReady()  ? 
            callback() : 
            Helper.on(name.toLowerCase() + '.ready', callback);
        
    }

    /**
     * [isReady description]
     * @return {Boolean}
     */
    static isReady() {
        return _ready;
    }
}
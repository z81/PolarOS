export default class WinComponent {
    /**
     * Генерирует и устанавлиает случаный ключ для окна.
     * @param win Обьект с параметрами текущего окна
     */
    addRandomKey(win) {
        var cryptoObj = window['crypto'] || window['msCrypto']; // for IE 11
        var rnd = cryptoObj.getRandomValues(new Uint32Array(4));
        win.secureKey = '' + rnd[0] + rnd[1] + rnd[2] + rnd[3];
    }

    /**
     *
     * @param win Обект с параметрами текущего окна
     * @param events
     */
    constructor(w = {}, events = {}, windows = {}) {
        this.windows = windows;
        this.addRandomKey(w);
        this.config = w;
        this.events = events;
        //this.isActive = w.isActive;

        this.oldStyle = null;
        this.isDrag = false;
        this.isResize = false;
        this.isMaximize = false;
        this.minWidth = 200;
        this.minHeight = 200;
        this.lastMouseEvent = null;
        this.firstResizeType = null;

        this.style = {
            top: w.top,
            left: w.left,
            width: w.width,
            height: w.height,
            cursor: 'default',
            opacity: 1
        };

        document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    }

    /**
     * Component View
     *
     * @ctrl name The name of the greeted person.
     */
    view(ctrl) {
        // mithrill bug
        var getStyle = ()=> {
            return Object.keys(this.style).map((key)=> {
                var prefix = ['width', 'height', 'left', 'top'].indexOf(key) !== -1 ? 'px;' : ';';

                return key + ': ' + this.style[key] + prefix;
            }).join('')

        };

        var windowClass = this.windows.active == this.config.id ? "window active" : "window"

        var bodyStyle =
            'height: ' + (this.style.height-26) + 'px;' +
            'width: ' + (this.style.width-4) + 'px;' +// +
            "box-shadow: inset 0px 0px 4px 0px rgba(50, 50, 50, 0.75);"
            //"background: url('/www/assets/cat.jpg'); background-size: cover";

        var dragWrapperStyle =
            "width: " + (this.style.width) + "px;" +
            "height: " + (this.style.height - 26) + "px;" +
            "left: " + (this.style.left+ 1) + "px;" +
            "top: " + (this.style.top + 26) + "px;" +
            "display: " + (this.isResize || this.windows.active !== this.config.id ? 'block;': 'none;') +
            (this.windows.active !== this.config.id ? "background: rgba(181, 181, 181, 0.59);" : "");

        this.config.left = this.style.left;
        this.config.top = this.style.top;
        this.config.width = this.style.width;
        this.config.height = this.style.height;



        var iconElementStyle = {
            background: `url(${this.config.icon})`,
            backgroundSize: 'contain'
        };

        return (
            <div class={windowClass} style={getStyle()} onmousemove={this.changeResizeArrow} onmousedown={this.startResize.bind(this)}>
                <div class="wrapper">
                    <div class="header" ondblclick={this.maximize.bind(this)} onmouseup={this.headerMouseUp.bind(this)} onmousedown={this.startDrag.bind(this)}>
                        <div class="icon" style={iconElementStyle}></div>
                        <div class="title">{this.config.title}</div>
                        <div class="controls">
                            <div class="button minimize" onclick={this.minimize.bind(this)}></div>
                            <div class="button maximize" onclick={this.maximize.bind(this)}></div>
                            <div class="button close" onclick={this.close.bind(this)}></div>
                        </div>
                    </div>
                    <span class="body-drag-wrapper" style={dragWrapperStyle}></span>
                    <div class="body" style={bodyStyle}>
                        <iframe sandbox="allow-scripts allow-same-origin" name={this.config.secureKey} src={this.config.src}></iframe>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * Определяет тип курсора для изменения размера окна
     * @param x
     * @param y
     * @returns {left: boolean, right: boolean, top: boolean, bottom: boolean}
     */
    static getResizeType(x, y) {
        var borderSize = 5;
        return {
            left: x < parseInt(this.style.left) + borderSize,
            right: parseInt(this.style.left) + parseInt(this.style.width) - x < borderSize,
            top: y < parseInt(this.style.top) + borderSize,
            bottom: parseInt(this.style.top) + parseInt(this.style.height) - y < borderSize
        }
    }

    /**
     *
     * @param e
     */
    onMouseMove(e) {
        var resize_type = this.firstResizeType;
        m.startComputation();

        if (e.which == 0 || e.buttons == 0) {
            this.isDrag = false;
            this.isResize = false;
        }

        if (this.isDrag && !(resize_type.left || resize_type.right || resize_type.top || resize_type.bottom)) {

            if (e.pageX > 0 && e.pageX < document.body.clientWidth) {
                this.style.left += e.pageX - this.lastMouseEvent.pageX;
            }
            if (e.pageY > 0 && e.pageY < document.body.clientHeight) {
                this.style.top += e.pageY - this.lastMouseEvent.pageY;
            }

            this.lastMouseEvent = e;

            if (this.isMaximize) {
                this.unmaximize(e)
            }
        } else if (this.isResize) {
            this.old_style = Helper.clone(this.style);
            if (resize_type.right && resize_type.bottom) {
                this.style.width += e.pageX - this.lastMouseEvent.pageX;
                this.style.height += e.pageY - this.lastMouseEvent.pageY;
            } else if (resize_type.left && resize_type.bottom) {
                this.style.left += e.pageX - this.lastMouseEvent.pageX;
                this.style.width += (this.lastMouseEvent.pageX - e.pageX);
                this.style.height += e.pageY - this.lastMouseEvent.pageY;
            } else if (resize_type.left && resize_type.top) {
                this.style.left += e.pageX - this.lastMouseEvent.pageX;
                this.style.top += e.pageY - this.lastMouseEvent.pageY;
                this.style.width += (this.lastMouseEvent.pageX - e.pageX);
                this.style.height += (this.lastMouseEvent.pageY - e.pageY);
            } else if (resize_type.right && resize_type.top) {
                this.style.top += e.pageY - this.lastMouseEvent.pageY;
                this.style.width += e.pageX - this.lastMouseEvent.pageX;
                this.style.height += (this.lastMouseEvent.pageY - e.pageY);
            } else if (resize_type.top) {
                this.style.top += e.pageY - this.lastMouseEvent.pageY;
                this.style.height += (this.lastMouseEvent.pageY - e.pageY);
            } else if (resize_type.bottom) {
                this.style.height += (e.pageY - this.lastMouseEvent.pageY);
            } else if (resize_type.left) {
                this.style.left += e.pageX - this.lastMouseEvent.pageX;
                this.style.width += this.lastMouseEvent.pageX - e.pageX;
            } else if (resize_type.right) {
                this.style.width += e.pageX - this.lastMouseEvent.pageX;
            }

            /*if(this.style.width >= this.minWidth && this.style.height >= this.minHeight) {
             this.lastMouseEvent = e;
             }*/

            if (this.style.width < this.minWidth) {
                this.style.width = this.old_style.width;
            } //else this.lastMouseEvent.pageX = e.pageX;

            if (this.style.height < this.minHeight) {
                this.style.height = this.old_style.height;
            }// else this.lastMouseEvent.pageY = e.pageY;

            this.lastMouseEvent = e;

        }

        m.endComputation();
        e.preventDefault();
    }

    /**
     * Изменяет курсор в зависимости от типа ресайза
     * @param e
     */
    changeResizeArrow (e) {
        m.startComputation();
        var resize_type = WinComponent.getResizeType.call(this,e.pageX, e.pageY);

        if ((resize_type.top && resize_type.left) || (resize_type.bottom && resize_type.right)) {
            this.style.cursor = 'nwse-resize'
        } else if ((resize_type.bottom && resize_type.left) || (resize_type.top && resize_type.right)) {
            this.style.cursor = 'ne-resize'
        } else if (resize_type.top || resize_type.bottom) {
            this.style.cursor = 'n-resize'
        } else if (resize_type.left || resize_type.right) {
            this.style.cursor = 'w-resize'
        } else {
            this.style.cursor = 'default'
        }

        m.endComputation();
    }

    /**
     * Событие проиходит при пермещении окна
     * @param e
     */
    startDrag(e) {
        e.preventDefault();
        this.firstResizeType = WinComponent.getResizeType.call(this, e.pageX, e.pageY);
        this.isDrag = !(e.which == 0 || e.buttons == 0);
        this.lastMouseEvent = e;
    }

    /**
     * Событие проиходит при перетаскивании окна
     * @param e
     */
    startResize(e) {
        this.windows.active = this.config.id;
        e.preventDefault();
        this.firstResizeType = WinComponent.getResizeType.call(this, e.pageX, e.pageY);
        this.isResize = !(e.which == 0 || e.buttons == 0);
        this.lastMouseEvent = e;
    }

    /**
     * Сворачивает окно
     * @param e
     * @param op
     * @param callback
     */
    minimize(e, op, callback = null) {
        op = op || -0.05;
        if (op > 0) {
            this.style.display = 'inline-block';
        }
        var timer = setInterval((function () {
            this.style.opacity += op;
            if ((this.style.opacity < Math.abs(op) && op < 0)) {
                this.style.display = op < 0 ? 'none' : 'inline-block';
                if(callback) callback();
                clearInterval(timer)
            }
            if (this.style.opacity == 1 && op > 0) {
                clearInterval(timer);
            }
            m.redraw()
        }).bind(this), 15)
    }

    /**
     * Разворачивает окно в прежний размер
     */
    unminimize() {
        this.minimize(null, 0.05)
    }

    /**
     * Разворачивает окно на весь экран
     * @param e
     */
    maximize(e) {
        if (this.isMaximize) {
            this.unmaximize(e, true)
        } else {
            this.oldStyle = {
                width: this.style.width,
                height: this.style.height,
                left: this.style.left,
                top: this.style.top
            };
            this.isMaximize = true;
            this.style.width = document.body.clientWidth;
            this.style.height = document.body.clientHeight;
            this.style.left = 0;
            this.style.top = 0;
            m.redraw()
        }
    }

    /**
     * Вохвращает окно в прежний размер после разворачивания
     * @param e
     * @param button если false то окно будет около курсора мыши
     */
    unmaximize(e, button = null) {
        this.isMaximize = false;
        this.style.width = this.oldStyle.width;
        this.style.height = this.oldStyle.height;
        this.style.left = e.pageX - this.style.width / 2;
        this.style.top = e.pageY - 10;
        if (button) {
            this.style.left = this.oldStyle.left;
            this.style.top = this.oldStyle.top;
        }
        m.redraw()
    }

    /**
     * Событие закртия окна
     * @param e
     */
    close (e) {
        this.minimize(null, null, () => {
            if (this.events && this.events['onClose']) {
                this.events.onClose(this.config, e);
            }
        })
    }

    headerMouseUp(e) {
        if(e.pageX == 0) {
            //this.style.left = 0;
            //this.style.top = 0;
        }
    }

    active() {
        this.windows.active = this.config.id;
    }

    controller() {
    }


}
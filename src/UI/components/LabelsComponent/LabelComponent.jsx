export default class LabelComponent{

    constructor(conf, events){
        this.conf = conf;
        this.drag = false;
        this.dragPos = {};
        this.lst = `left: ${this.conf.left}px;top: ${this.conf.top}px;`;

        this.select = ()=> {
        	if(events && 'select' in events) {
        		events.select(conf.id);
        	}
        };

        this.run = ()=> {
        	if(events && 'run' in events) {
        		console.log('run')
        		events.run(conf.app);
        	}
        };

        this.startDrag = (e)=> {
        	this.select();
        	if(e.which !== 3) {
	            this.drag = true;
	            this.dragPos.left = e.clientX - this.conf.left;
	            this.dragPos.top = e.clientY - this.conf.top;
        	}
        };

        this.stopDrag = (e)=> {
            var grid = 70;
            var minPos = 10;
            this.drag = false;
            this.conf.left = minPos + Math.round((e.clientX - this.dragPos.left)/grid)*grid;
            this.conf.top = minPos + Math.round((e.clientY - this.dragPos.top)/grid)*grid;
            this.lst = `left: ${this.conf.left}px;top: ${this.conf.top}px;`;
            m.redraw();
                
        };


        Helper.on('mousemove', (e)=> {
            if(this.drag) {
                this.conf.left = e.clientX - this.dragPos.left;
                this.conf.top = e.clientY - this.dragPos.top;
                this.lst = `left: ${this.conf.left}px;top: ${this.conf.top}px;`
                m.redraw()
            }
        }, document.body);
    }

    controller() {}

    view() {
    	var iconStyle = `background: url(${this.conf.icon}); background-size: 64px 64px;`;
    	var globalClass = this.conf.selected ? 'label selected' : 'label';
        return (
            <div ondblclick={this.run} class={globalClass} style={this.lst} onmousedown={this.startDrag.bind(this)} onmouseup={this.stopDrag.bind(this)}>
                <div class="icon" style={iconStyle}></div>
                <div class="title">{this.conf.title}</div>
            </div>
        );
    }
}
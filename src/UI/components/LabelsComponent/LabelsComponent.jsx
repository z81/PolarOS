require('./labels.less');
import Label from './LabelComponent.jsx';
import WindowsComponent from '../WindowsComponent/WindowsComponent.jsx';

export default class LabelsListComponent {

    constructor(conf) {
        this.list = conf.labels; //[];

        var left = 10;
        
        /*console.log(conf)
        conf.apps.list.map((a, k)=>{
            this.list.push({
                app: a,
                left: left,
                top: 10,
                title: a.manifest.locales.ru.name,
                icon: a.path + a.manifest.icon,
                selected: false
            });

            left+=70;
        });//*/


        var events = {
            'select': (id)=> {
                this.list.map(function(v, k) {
                    v.selected = (k === id);
                })
            },
            'run': (app)=> {
                WindowsComponent.open(app);
            }
        };


        this.list.forEach(function(v, k){
            v.id = k;
            v.UI = new Label(v, events);
        })
    }

    controller() {}

    view(ctrl) {
        return (
            <div class="labels">
                {this.list.map(function(v, k){
                    return v.UI.view();
                })}
            </div>
        );
    }
}
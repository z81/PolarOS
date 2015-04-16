require("./desktop.less");
import TimeComponent from '../TimeComponent/TimeComponent.jsx';
import BatteryComponent from '../BatteryComponent/BatteryComponent.jsx';
import WindowsComponent from '../WindowsComponent/WindowsComponent.jsx';
import LabelsComponent from '../LabelsComponent/LabelsComponent.jsx';
import NotifyComponent from '../NotifyComponent/NotifyComponent.jsx';
var timeComponent = new TimeComponent();
var batteryComponent = new BatteryComponent();


export default class DesktopComponent {
    constructor(config = {}, events = {}) {
        this.windows = config.windows;
        this.config = config;

        this.menuIsHidden = true;
        this.startMenuClass = 'hide';
        this.labelsComponent = new LabelsComponent(config);
        this.notifyComponent = new NotifyComponent(config);

        this.userIconStyle = {
            background: 'url(https://meta-discourse.global.ssl.fastly.net/uploads/default/31630/fca6bbf04786a137.png) no-repeat',
            backgroundSize: '32px'
        };

        this.onClick = (e) => {
            this.menuIsHidden = !this.menuIsHidden;
            this.startMenuClass = this.menuIsHidden ? 'hide' : '';
        };
        this.selectTask = (idx) => {
            return (e) => {
                this.windows.active = idx;
            }
        }

        this.runApp = (app)=> {
            WindowsComponent.open(app)
        }

        this.shutdown = ()=> {
            if('shutdown' in events) {
                events.shutdown();
            }

        }

    }
    controller() {

    }
    view(ctrl) {

        var wallpaperStyle = {
          background: "url("+ this.config.user.background +")",
          'background-size': "cover"
        };

        return (
            <div id="wallpaper" style={wallpaperStyle}>
                <span id="taskbar">
                    <span id="startmenu" class={this.startMenuClass}>
                        <div class="user">
                            <span class="icon" style={this.userIconStyle}></span>
                            <span class="login">{this.config.user.login}</span>
                            <span class="shutdown" onclick={this.shutdown.bind(this)}>[X] </span>
                        </div>
                        <div class="items">
                            {this.config.apps.list.map((app, i) => {
                                var iconStyle = {
                                    background: `url(${app.path}${app.manifest.icon}) no-repeat`,
                                    backgroundSize: '32px'
                                };

                                return (<span class="item" onclick={this.runApp.bind(this, app)}>
                                    <span class="icon" style={iconStyle}></span>
                                    <span class="text">{app.manifest.locales.ru.name}</span>
                                    </span>)
                            })} 
                        </div>
                    </span>
                    <span id="startbutton" onclick={this.onClick}></span>
                    {this.windows.list.map((w, i) => {
                        var iconElementStyle = {
                            background: `url(${w.icon})`,
                            backgroundSize: 'contain'
                        };
                        return (<span class={i == this.windows.active ? "task active": "task"} onclick={this.selectTask(i)}>
                                    <span class="icon" style={iconElementStyle}></span>
                                    <span class="title"> {w.title}</span>
                                </span>)
                    })}
                    <div style="float: right">
                        {batteryComponent.view()}
                        {timeComponent.view()}
                    </div>
                </span>
                {this.labelsComponent.view()}
                {this.notifyComponent.view(this.notifyComponent)}
            </div>
        );
    }
}

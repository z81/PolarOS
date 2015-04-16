require('./styles/main.less');
import DesktopComponent from './Components/DesktopComponent/DesktopComponent.jsx';
import WindowsComponent from './Components/WindowsComponent/WindowsComponent.jsx';
import AuthComponent from './Components/AuthComponent/AuthComponent.jsx';


Helper.renderComponents({
	auth: new AuthComponent({
		// bind check auth event
		'check': (login, pass, callback)=> {

				Server.run('user.auth', {login: login, password: pass}, function(d){
						callback(d.status === 'ok');

						if(d.status === 'ok') {
							Helper.fire('auth.success')
						}
				});
		},
		// bind registration event
		'reg': (user, pass, email, name, callback)=> {

				Server.run('user.reg', {login: user, password: pass, email: email, name: name}, function(d){
						callback(d.status === 'ok', d.errors);
				});
		}
	})
});



// after auth
Helper.on('config.ready', (data)=>{
	Helper.renderComponents({
	      desktop: new DesktopComponent(Config.get(), {'shutdown': Config.save}),
	      windows: new WindowsComponent(Config.get())
	});
});

// Hide LoadingScreen

require("./LoadingScreen.js");

// "node_modules/.bin/webpack-dev-server.cmd" --config mocha.js --hot
var assert = require("assert")
window.m = require("mithril");

import Helper from '../src/Services/Helper.js';
import Server from '../src/Services/Server.js';
import Config from '../src/Services/Config.js';
import DesktopComponent from '../src/Components/DesktopComponent/DesktopComponent.jsx';
import WindowsComponent from '../src/Components/WindowsComponent/WindowsComponent.jsx';
import AuthComponent from '../src/Components/AuthComponent/AuthComponent.jsx';


describe("Services", function() {
	it("Init services", function(done) {
		Helper.init();
		Server.init();
		Config.init();
	});
	describe("Helper", function() {	
		it("Events fire/on", function(done) {
			Helper.on('test', ()=> done())
			Helper.fire('test')
		});
		it("Events fire/on data", function(done) {
			Helper.on('test', (d)=> d.data === 'test' ? done() : '')
			Helper.fire('test', 'test')
		});
		it("Get dots root path", function(done) {
			var a = {a: 'b', c: 1, d: [1,2,3], f: {k: 'test'}};
			Helper.dotPath('a', a) === 'b' ? done() : '';
		});
		it("Get dots path.path", function(done) {
			var a = {a: 'b', c: 1, d: [1,2,3], f: {k: 'test'}};
			Helper.dotPath('f.k', a) === 'test' ? done() : '';
		});
		it("Get dots root array", function(done) {
			var a = {a: 'b', c: 1, d: [1,2,3], f: {k: 'test'}};
			Helper.dotPath('d', a)[1] === 2 ? done() : '';
		});
		it("Set dots root array", function(done) {
			var a = {a: 'b', c: 1, d: [1,2,3], f: {k: 'test'}};
			Helper.dotPath('d', a, [4,4,4]);
			Helper.dotPath('d', a)[1] === 4 ? done() : '';
		});
		it("Set dots path.path obj", function(done) {
			var a = {a: 'b', c: 1, d: [1,2,3], f: {k: 'test'}};
			Helper.dotPath('u', a, {y: {x: 1}});
			Helper.dotPath('u.y.x', a) === 1 ? done() : '';
		});
	});
	describe("Server", function() {
		it("Auth success", function(done) {
			Helper.wait('Server', ()=> {
				Server.run('user.auth', {login: 'bear', password: ''}, function(d){
					if(d.status === 'ok') {
						done()
					}
				}); 
			});
		});
		it("Auth fail", function(done) {
			Helper.wait('Server', ()=> {
				Server.run('user.auth', {login: 'bear', password: 'grylls'}, function(d){
					if(d.status !== 'ok') {
						Helper.fire('auth.success')
						done()
					}
				}); 
			})
			
		});
		it("Get config", function(done) {
			Helper.wait('Config', ()=> {
				Server.get('', function(data){
					data != undefined ? done() : '';
				})
			});
		});

	});

	describe("Config", function() {	
		it("Get root", function(done) {
			Helper.wait('Config', ()=> Config.get() !== undefined ? done() : '')
		});
		it("Get path", function(done) {
			Helper.wait('Config', ()=> Config.get('apps') !== undefined ? done() : '')
		});
		it("Get path.path", function(done) {
			Helper.wait('Config', ()=> Config.get('apps.list') !== undefined ? done() : '')
		});
		it("Set root strig value", function(done) {
			Helper.wait('Config', ()=> {
				Config.set('test', 'test') 

				Config.get('test')  === 'test' ? done() : ''
			})
		});
		it("Set root object value", function(done) {
			Helper.wait('Config', ()=> {
				Config.set('test2', {a: 'b'}) 

				Config.get('test2.a')  === 'b' ? done() : ''
			})
		});
		it("Set path value", function(done) {
			Helper.wait('Config', ()=> {
				Config.set('apps.test', 'test') 

				Config.get('apps.test')  === 'test' ? done() : ''
			})
		});
		it("Set path obj value", function(done) {
			Helper.wait('Config', ()=> {
				Config.set('apps.test', {a: 'b'}) 

				Config.get('apps.test.a')  === 'b' ? done() : ''
			})
		});
		it("Set array value", function(done) {
			Helper.wait('Config', ()=> {
				Config.set('test3', [1,2,3]) 

				Config.get('test3')[1]  === 2 ? done() : ''
			})
		});
	});

})

describe("UI", function() {
	var wrapper = document.createElement("span");
	wrapper.style.display = 'none';
    document.body.appendChild(wrapper);

	describe("Components", function() {
		describe("Auth", function() {
			var auth;
			var events = {
				'check': ()=>{}
			};

			it("create", function(done) {
				auth = new AuthComponent(events);

			});
			it("reander", function(done) {
				Helper.renderComponents({
					auth: auth
				}, wrapper);

				it("render", function(done) {
					if(document.querySelectorAll('#auth > * > *').length > 0) {
						done();
					}
				})

			});
			it("callback", function(done) {
				var login = document.querySelector('#auth .login .username input').value;
				var password = document.querySelector('#auth .login .password input').value;

				events.check = (l, p)=> login === l && password === p ? done() : '';

				document.querySelector('#auth .login button').click();
			});
			it("show error message", function(done) {
				events.check = (l, p, c)=>{
					c(false);
					var it = setInterval(()=>{
						document.querySelector('#auth .login .error')
							.className.indexOf('hide') === -1
								? done() : '';

						clearInterval(it)
					}, 30);
					
				}

				document.querySelector('#auth .login button').click();
			});
		});
	})
})
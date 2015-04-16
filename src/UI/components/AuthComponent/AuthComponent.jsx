require("./auth.less");
import Animate from "./animation.js";
var authForm = require('./authForm.jsx').default;
var regForm = require('./regForm.jsx').default;

export default class AuthComponent {
	constructor(events = {}) {
		this.events = events;
		this.hideError();
		this.globalClass = "auth";
		this.user = "bear";
		this.pass = "";
		this.email = "";
		this.name = "";
		this.wrongAuthClass = "";
		this.isLoading = false;
		this.errorMessage = "Неправильный логин или пароль";
		this.errors = {};
		this.TABS = {
			auth: 0,
			reg: 1
		};
		this.tab = this.TABS.auth;


		setTimeout(()=>Animate.background('.auth'), 500)

	}

	controller() {}

	showError(errors) {
		this.wrongAuthClass = "error";
		
		if(errors) {
			var errs = [];
			Object.keys(errors).map(function(k) {
				errs.push(<div>{k + ': ' + errors[k]}</div>)
			})
			this.errors = errs;
		}

		setTimeout(() => {
			this.hideError();
		}, 5000);
	}

	hideError() {
		this.wrongAuthClass = "";
	}

	hideAll() {
		this.globalClass = "auth hide";
	}

	showAll() {
		this.globalClass = "auth";
	}

	login(e) {
		var self = this;

		this.isLoading = true;

		if('check' in this.events) {
			this.events['check'](this.user, this.pass, (isValid) => {

				this.isLoading = false;
				if(isValid) {
					self.hideAll();
					m.redraw()
				} else {
					self.showError();
					m.redraw()
				}
			});
		}	
	}

	reg(e) {
		this.isLoading = true;

		if('reg' in this.events) {
			this.events['reg'](this.user, this.pass, this.email, this.name, (isValid, errors) => {

				this.isLoading = false;
				if(isValid) {
					this.tab = this.TABS.auth;
					this.hideError();
					m.redraw();
				} else {
					this.showError(errors);
					m.redraw();
				}
			});
		}	
	}

	view(ctrl) {

		return (
			<div class={this.globalClass}>
				{regForm.call(this)}
				{authForm.call(this)}
			</div>
		);
	}

	inputEmailChange(e) {
		this.email = e.target.value;
	}

	inputNameChange(e) {
		this.name = e.target.value;
	}

	inputUserChange(e) {
		this.user = e.target.value;
	}

	inputPassChange(e) {
		this.pass = e.target.value;
	}

	showRegForm() {
		this.tab = this.TABS.reg;
	}

	showAuthForm() {
		this.tab = this.TABS.auth;
	}

}
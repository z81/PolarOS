export default function() {
	var authFiledErrorClass = "required field " + this.wrongAuthClass;
	var authMsgErrorClass = "ui form segment " + this.wrongAuthClass
			+ (this.isLoading ? " segment loading " : "");


	var regClass = "reg ui middle aligned grid child";
	if(this.tab === this.TABS.auth) {
		regClass+=" hide";
	}


	return (
		<div class={regClass}>
			<div class="column">
			    <div class="ui center aligned page grid">
			        <div class="eight wide  column">
			            <div class="ui left aligned segment">
			                <h4 class="ui dividing header">{l('Reg')}</h4>
			                <div class={authMsgErrorClass}>
			                	<div class="ui error message">
			                		<div class="header">{l('Error')}</div>
			                		<p>{this.errors}</p>
			                	</div>
			                    <div class={authFiledErrorClass}>
			                        <label for="username">{l('Login')}:</label>
			                        <div class="ui icon input">
			                            <input type="text" placeholder={l('Login')} value={this.user} onchange={this.inputUserChange.bind(this)} /> <i class="user icon"></i>
			                        </div>
			                    </div>
			                    <div class={authFiledErrorClass}>
			                        <label for="username">{l('Name')}:</label>
			                        <div class="ui icon input">
			                            <input type="text" onchange={this.inputNameChange.bind(this)}  placeholder={l('Name')} /> <i class="user icon"></i>
			                        </div>
			                    </div>
			                    <div class={authFiledErrorClass}>
			                        <label for="username">Email:</label>
			                        <div class="ui icon input">
			                            <input type="email" onchange={this.inputEmailChange.bind(this)}  placeholder={l('Email')} /> <i class="mail icon"></i>
			                        </div>
			                    </div>
			                    <div class={authFiledErrorClass}>
			                        <label for="password">{l('Password')}:</label>
			                        <div class="ui icon input">
			                            <input type="password"  placeholder={l('Password')} onchange={this.inputPassChange.bind(this)}/> <i class="lock icon"></i>
			                        </div>
			                    </div>
			                    <div class="inline field">
							        <div class="ui toggle checkbox">
							            <input type="checkbox" name="public" onchange={this.inputPassChange.bind(this)}/>
							            <label>{l('Q.pass.correct')}</label>
							        </div>
							    </div>
			                    <div onclick={this.reg.bind(this)} class="ui primary button">
			                    	<i class="add user icon"></i> {l('Send')}
			                    </div>
			                    <div onclick={this.showAuthForm.bind(this)}  class="tiny ui green basic button right floated">
			                    	<i class="unlock icon"></i> {l('Btn.auth')}
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
		</div>

	);
}
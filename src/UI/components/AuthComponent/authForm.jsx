export default function() {
	var authFiledErrorClass = "required field " + this.wrongAuthClass;
	var authMsgErrorClass = "ui form segment " + this.wrongAuthClass
			+ (this.isLoading ? " segment loading " : "");


	var loginClass = "login ui middle aligned grid child";

	if(this.tab === this.TABS.reg) {
		loginClass+=" hide";
	}

	return (
		<div class={loginClass}>
			<div class="column">
			    <div class="ui center aligned page grid">
			        <div class="eight wide  column">
			            <div class="ui left aligned segment">
			                <h4 class="ui dividing header">{l('Auth')}</h4>
			                <div class={authMsgErrorClass}>
			                	<div class="ui error message">
			                		<div class="header">{l('Error')}</div>
			                		<p>{this.errorMessage}</p>
			                	</div>
			                    <div class={authFiledErrorClass}>
			                        <label for="username">{l('Login')}:</label>
			                        <div class="ui icon input">
			                            <input type="text" placeholder={l('Login')} value={this.user} onchange={this.inputUserChange.bind(this)} /> <i class="user icon"></i>
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
							            <input type="checkbox" name="public"/>
							            <label>Просто красивый чекбокс</label>
							        </div>
				     			</div>
			                    <div onclick={this.login.bind(this)} class="ui vertical animated primary button">
			                    	<div class="hidden content">
			                    		<i class="unlock icon"></i> {l('Btn.Auth')}
			                    	</div>
								<div class="visible content">
								    <i class="lock icon"></i> {l('Btn.auth')}
								</div>
			                    </div>
			                    <div onclick={this.showRegForm.bind(this)} class="tiny ui green basic button right floated">
			                    	<i class="add user icon"></i> {l('Reg')}
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
		</div>

	);
}
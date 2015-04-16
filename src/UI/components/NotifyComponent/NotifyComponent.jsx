require('./notify.less');

export default class NotifyComponent {
	constructor(config) {
		this.config = config;
		/*this.list = [
			{
				type: 'error',
				title: 'Error',
				text: 'Error'
			},
			{
				type: 'info',
				title: 'Info',
				text: 'Info'
			},
			{
				type: 'success',
				title: 'Success',
				text: 'Success'
			},
			{
				type: 'warning',
				title: 'Warning',
				text: 'Warning test icon',
				icon: 'inbox'
			}
		];*/
	}

	controller() {}
	view(ctrl) {
		return (
			<div class="notify">
				{
					ctrl.config.notify.map(function(n,i){
						var style = `ui ${n.type} message ` + (n.icon ? 'icon' : '');
						
						setTimeout(function(){
							ctrl.config.notify.splice(ctrl.config.notify.length-1, 1);
							m.redraw();
						}, 5000);

						var close = (function(i){
							return function(){
								ctrl.config.notify.splice(i, 1);
								m.redraw();
							}
						})(i);

						return (
							<div class={style}>
								{n.icon ? <i class="inbox icon licon"></i> : ''}
								<i class="close icon" onclick={close}></i>
								<div class="header">
								  	<div class="content">
								    	{n.title}
								  	</div>
								 	<p>{n.text}</p>
							 	</div>
							</div>
						)
					})
				}
			</div>
		);
	}
}

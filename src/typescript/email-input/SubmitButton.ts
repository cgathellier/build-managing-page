import ObserversManager, { Observer } from '../ObserversManager.js';
import Input from './Input.js';
import ErrorMessage from './ErrorMessage.js';
import API, { ResponseObj } from './API.js';

export type Action = 'SUCCESS' | 'ERROR' | 'RESET';

class SubmitButton {
	private $button: HTMLButtonElement = document.querySelector(
		'[aria-label="submit email form"]'
	)!;
	private ValidationManager = new ObserversManager<Observer<Action>, Action>();
	private InputEl = new Input();
	private ErrorEl = new ErrorMessage();

	constructor() {
		this.ValidationManager.subscribe(this.InputEl);
		this.ValidationManager.subscribe(this.ErrorEl);
		this.isTyping = this.isTyping.bind(this);

		this.listen();
	}

	async submitEmail() {
		const res: ResponseObj = await API.post('/email', this.InputEl.email);
		if (res.status === '201') this.ValidationManager.fire('SUCCESS');
	}

	displayError() {
		this.ValidationManager.fire('ERROR');
	}

	isTyping() {
		this.ValidationManager.fire('RESET');
	}

	listen() {
		this.InputEl.listen(this.isTyping);

		this.$button.addEventListener('click', e => {
			e.preventDefault();
			const isValid = this.InputEl.checkEmail();

			switch (isValid) {
				case 'VALID':
					this.submitEmail();
					break;
				case 'INVALID':
					this.displayError();
					break;
				default:
					break;
			}
		});
	}
}

new SubmitButton();

import { Observer } from '../ObserversManager.js';
import { Action } from './SubmitButton.js';

export default class Input implements Observer<Action> {
	private $input: HTMLInputElement = document.querySelector('.footer__newsletter-input')!;
	public email: string = '';

	public checkEmail() {
		const email = this.$input.value;

		if (email === '') {
			return 'EMPTY';
		} else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			this.email = email;
			return 'VALID';
		} else {
			return 'INVALID';
		}
	}

	toggle(action: Action) {
		if (action === 'SUCCESS') {
			this.$input.value = '';
		}
	}
}

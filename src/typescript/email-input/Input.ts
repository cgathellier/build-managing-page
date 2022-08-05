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
		switch (action) {
			case 'SUCCESS':
				this.$input.value = '';
				break;
			case 'ERROR':
				this.$input.classList.add('error');
				break;
			case 'RESET':
				this.$input.classList.remove('error');
				break;

			default:
				break;
		}
	}

	public listen(isTyping: () => void) {
		this.$input.addEventListener('input', isTyping);
	}
}

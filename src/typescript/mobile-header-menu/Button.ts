import Subject from './Subject.js';
import MenuObserver from './Menu.js';
import BackdropObserver from './Backdrop.js';

class Button {
	private $button: HTMLButtonElement | null = document.querySelector('.header__menu-button');
	private $body: HTMLBodyElement = document.querySelector('body')!;
	private AnimationSubject = new Subject();
	private MenuObs = new MenuObserver();
	private BackdropObs = new BackdropObserver();

	constructor() {
		this.AnimationSubject.subscribe(this.MenuObs);
		this.AnimationSubject.subscribe(this.BackdropObs);

		this.listen();
	}

	isMenuOpen(): boolean {
		const icon: HTMLImageElement | null | undefined = this.$button?.querySelector('img');

		if (icon?.getAttribute('alt') === 'Close menu') {
			return true;
		} else {
			return false;
		}
	}

	updateInterface() {
		if (!this.$button) return;

		if (this.isMenuOpen()) {
			this.AnimationSubject.fire('CLOSE');
			this.$button.innerHTML = `<img src="./images/icon-hamburger.svg" alt="Open menu" />`;
			this.$body.classList.remove('body-no-scroll');
		} else {
			this.AnimationSubject.fire('OPEN');
			this.$button.innerHTML = `<img src="./images/icon-close.svg" alt="Close menu" />`;
			this.$body.classList.add('body-no-scroll');
		}
	}

	listen() {
		// click on button
		this.$button?.addEventListener('click', () => this.updateInterface());

		// click on backdrop
		this.BackdropObs.$backdrop?.addEventListener('click', () => this.updateInterface());
	}
}

const button = new Button();

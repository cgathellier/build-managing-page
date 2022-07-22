import Subject from './Subject.js';
import MenuObserver from './Menu.js';
import BackdropObserver from './Backdrop.js';

class Button {
	private $button: HTMLButtonElement | null = document.querySelector('.header__menu-button');
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

	updateIcon() {
		if (this.$button) {
			if (this.isMenuOpen()) {
				this.$button.innerHTML = `<img src="./images/icon-hamburger.svg" alt="Open menu" />`;
			} else {
				this.$button.innerHTML = `<img src="./images/icon-close.svg" alt="Close menu" />`;
			}
		}
	}

	listen() {
		this.$button?.addEventListener('click', () => {
			if (this.isMenuOpen()) {
				this.AnimationSubject.fire('CLOSE');
				this.updateIcon();
			} else {
				this.AnimationSubject.fire('OPEN');
				this.updateIcon();
			}
		});
	}
}

const button = new Button();

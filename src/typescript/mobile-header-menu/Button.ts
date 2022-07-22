import Subject from './Subject.js';
import MenuObserver from './Menu.js';
import BackdropObserver from './Backdrop.js';

class Button {
	private $button: HTMLButtonElement | null = document.querySelector('.header__menu-button');
	private $icon: HTMLImageElement | null | undefined = this.$button?.querySelector('img');
	private AnimationSubject = new Subject();
	private MenuObs = new MenuObserver();
	private BackdropObs = new BackdropObserver();

	constructor() {
		this.AnimationSubject.subscribe(this.MenuObs);
		this.AnimationSubject.subscribe(this.BackdropObs);

		this.listen();
	}

	isMenuOpen(): boolean {
		if (this.$icon?.getAttribute('alt') === 'Close menu') {
			return true;
		} else {
			return false;
		}
	}

	listen() {
		this.$button?.addEventListener('click', () => {
			if (this.isMenuOpen()) {
				this.AnimationSubject.fire('CLOSE');
			} else {
				this.AnimationSubject.fire('OPEN');
			}
		});
	}
}

const button = new Button();

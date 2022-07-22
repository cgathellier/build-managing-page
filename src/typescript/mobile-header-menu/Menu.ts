import { Action, Observer } from './types';

export default class Menu implements Observer {
	private $menu = document.querySelector('.header__menu');

	toggle(action: Action): void {
		if (action === 'OPEN' && this.$menu?.classList.contains('header__menu--hidden')) {
			this.$menu?.classList.remove('header__menu--hidden');
		} else {
			this.$menu?.classList.add('header__menu--hidden');
		}
	}
}

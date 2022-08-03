import { Observer } from '../ObserversManager';
import { Action } from './Button';

export default class Menu implements Observer<Action> {
	private $menu = document.querySelector('.header__menu');

	toggle(action: Action): void {
		if (action === 'CLOSE' && this.$menu?.classList.contains('header__menu--show')) {
			this.$menu?.classList.remove('header__menu--show');
		} else {
			this.$menu?.classList.add('header__menu--show');
		}
	}
}

import { Action, Observer } from './types';

export default class Backdrop implements Observer {
	private $backdrop = document.querySelector('.header__menu-backdrop');

	toggle(action: Action): void {}
}

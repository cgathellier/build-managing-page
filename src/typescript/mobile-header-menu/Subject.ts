import { Action, Observer } from './types';

export default class AnimateMenuSubject {
	private _observers: Observer[] = [];

	subscribe(obs: Observer) {
		this._observers.push(obs);
	}

	fire(action: Action) {
		this._observers.forEach(obs => {
			obs.toggle(action);
		});
	}
}

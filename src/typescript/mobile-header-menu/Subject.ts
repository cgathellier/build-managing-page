import { Action, Observer } from './types';

export default class AnimateMenuSubject {
	private _observers: Observer[] = [];
	// constructor() {}

	subscribe(obs: Observer) {
		this._observers.push(obs);
	}

	unsubscribe(obs: Observer) {
		this._observers.filter(observer => observer !== obs);
	}

	fire(action: Action) {
		this._observers.forEach(obs => {
			obs.toggle(action);
		});
	}
}

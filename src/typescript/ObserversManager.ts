export interface Observer<S> {
	toggle(action: S): void;
}

export default class ObserversManager<T extends Observer<S>, S> {
	private _observers: T[] = [];

	subscribe(obs: T) {
		this._observers.push(obs);
	}

	fire(action: S) {
		this._observers.forEach(obs => {
			obs.toggle(action);
		});
	}
}

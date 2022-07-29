export default class ObserversManager {
    constructor() {
        this._observers = [];
    }
    subscribe(obs) {
        this._observers.push(obs);
    }
    fire(action) {
        this._observers.forEach(obs => {
            obs.toggle(action);
        });
    }
}

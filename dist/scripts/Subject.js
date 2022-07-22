export default class AnimateMenuSubject {
    constructor() {
        this._observers = [];
    }
    subscribe(obs) {
        this._observers.push(obs);
    }
    unsubscribe(obs) {
        this._observers.filter(observer => observer !== obs);
    }
    fire(action) {
        this._observers.forEach(obs => {
            obs.toggle(action);
        });
    }
}

import Subject from './Subject.js';
import MenuObserver from './Menu.js';
import BackdropObserver from './Backdrop.js';
class Button {
    constructor() {
        var _a;
        this.$button = document.querySelector('.header__menu-button');
        this.$icon = (_a = this.$button) === null || _a === void 0 ? void 0 : _a.querySelector('img');
        this.AnimationSubject = new Subject();
        this.MenuObs = new MenuObserver();
        this.BackdropObs = new BackdropObserver();
        this.AnimationSubject.subscribe(this.MenuObs);
        this.AnimationSubject.subscribe(this.BackdropObs);
        this.listen();
    }
    isMenuOpen() {
        var _a;
        if (((_a = this.$icon) === null || _a === void 0 ? void 0 : _a.getAttribute('alt')) === 'Close menu') {
            return true;
        }
        else {
            return false;
        }
    }
    listen() {
        var _a;
        (_a = this.$button) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            if (this.isMenuOpen()) {
                this.AnimationSubject.fire('CLOSE');
            }
            else {
                this.AnimationSubject.fire('OPEN');
            }
        });
    }
}
const button = new Button();

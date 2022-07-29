import ObserversManager from '../ObserversManager.js';
import MenuObserver from './Menu.js';
import BackdropObserver from './Backdrop.js';
class Button {
    constructor() {
        this.$button = document.querySelector('.header__menu-button');
        this.$body = document.querySelector('body');
        this.AnimationManager = new ObserversManager();
        this.MenuObs = new MenuObserver();
        this.BackdropObs = new BackdropObserver();
        this.AnimationManager.subscribe(this.MenuObs);
        this.AnimationManager.subscribe(this.BackdropObs);
        this.listen();
    }
    isMenuOpen() {
        var _a;
        const icon = (_a = this.$button) === null || _a === void 0 ? void 0 : _a.querySelector('img');
        if ((icon === null || icon === void 0 ? void 0 : icon.getAttribute('alt')) === 'Close menu') {
            return true;
        }
        else {
            return false;
        }
    }
    updateInterface() {
        if (!this.$button)
            return;
        if (this.isMenuOpen()) {
            this.AnimationManager.fire('CLOSE');
            this.$button.innerHTML = `<img src="./images/icon-hamburger.svg" alt="Open menu" />`;
            this.$body.classList.remove('body-no-scroll');
        }
        else {
            this.AnimationManager.fire('OPEN');
            this.$button.innerHTML = `<img src="./images/icon-close.svg" alt="Close menu" />`;
            this.$body.classList.add('body-no-scroll');
        }
    }
    listen() {
        var _a, _b;
        // click on button
        (_a = this.$button) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.updateInterface());
        // click on backdrop
        (_b = this.BackdropObs.$backdrop) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => this.updateInterface());
    }
}
const button = new Button();

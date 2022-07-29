export default class Backdrop {
    constructor() {
        this.$backdrop = document.querySelector('.header__menu-backdrop');
    }
    toggle(action) {
        var _a, _b, _c;
        if (action === 'CLOSE' &&
            ((_a = this.$backdrop) === null || _a === void 0 ? void 0 : _a.classList.contains('header__menu-backdrop--show'))) {
            (_b = this.$backdrop) === null || _b === void 0 ? void 0 : _b.classList.remove('header__menu-backdrop--show');
        }
        else {
            (_c = this.$backdrop) === null || _c === void 0 ? void 0 : _c.classList.add('header__menu-backdrop--show');
        }
    }
}

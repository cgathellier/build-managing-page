export default class Menu {
    constructor() {
        this.$menu = document.querySelector('.header__menu');
    }
    toggle(action) {
        var _a, _b, _c;
        if (action === 'OPEN' && ((_a = this.$menu) === null || _a === void 0 ? void 0 : _a.classList.contains('header__menu--hidden'))) {
            (_b = this.$menu) === null || _b === void 0 ? void 0 : _b.classList.remove('header__menu--hidden');
        }
        else {
            (_c = this.$menu) === null || _c === void 0 ? void 0 : _c.classList.add('header__menu--hidden');
        }
    }
}

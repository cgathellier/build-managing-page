"use strict";
class Slider {
    constructor() {
        this.$slider = document.querySelector('.testimonials__slider');
        this._currentSlide = 1;
        this._prevSlide = 4;
        this._nextSlide = 2;
        this.listen();
    }
    currentSlide(slideNum) {
        this._currentSlide = slideNum;
    }
    nextSlide(slideNum) {
        this._nextSlide = slideNum;
    }
    updateInterface() {
        var _a, _b;
        console.log(this.$slider);
        (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.classList.remove(`testimonials__slider--show-${this._currentSlide}`);
        (_b = this.$slider) === null || _b === void 0 ? void 0 : _b.classList.add(`testimonials__slider--show-${this._nextSlide}`);
        this.currentSlide(this._nextSlide);
        this.nextSlide(this._nextSlide + 1);
    }
    listen() {
        var _a;
        (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.updateInterface());
    }
}
const slider = new Slider();

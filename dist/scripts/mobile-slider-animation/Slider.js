import Dots from './Dots.js';
class Slider {
    constructor() {
        var _a;
        this.$slider = document.querySelector('.testimonials__slider');
        this.$slides = document.querySelectorAll('.testimonials__slide');
        this.numberOfSlides = ((_a = this.$slides) === null || _a === void 0 ? void 0 : _a.length) || 0;
        this._currentSlide = 0;
        this._prevSlide = 3;
        this._nextSlide = 1;
        this.Dots = new Dots();
        this.listen();
    }
    prevSlide(slideNum) {
        this._prevSlide = slideNum;
    }
    currentSlide(slideNum) {
        this._currentSlide = slideNum;
    }
    nextSlide(slideNum) {
        if (slideNum > this.numberOfSlides - 1) {
            this._nextSlide = 0;
        }
        else {
            this._nextSlide = slideNum;
        }
    }
    updateInterface() {
        var _a, _b;
        (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.classList.remove(`testimonials__slider--show-${this._currentSlide}`);
        (_b = this.$slider) === null || _b === void 0 ? void 0 : _b.classList.add(`testimonials__slider--show-${this._nextSlide}`);
        this.Dots.update(this._currentSlide, this._nextSlide);
        this.currentSlide(this._nextSlide);
        this.nextSlide(this._nextSlide + 1);
    }
    listen() {
        var _a;
        (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => this.updateInterface());
    }
}
const slider = new Slider();

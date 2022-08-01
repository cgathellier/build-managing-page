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
        this.touchStartClientX = 0;
        this.touchMoveClientX = 0;
        this.sliderOffset = 0;
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
    translateSlider() {
        var _a;
        const translation = (this.touchMoveClientX / this.touchStartClientX) * 100 - 100;
        const rounded = Math.round((translation + Number.EPSILON) * 100) / 100;
        console.log(rounded);
        (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.setAttribute('style', `transform: translateX(${rounded}%)`);
    }
    listen() {
        var _a, _b, _c;
        const _ = this;
        function handleTouchStart(ev) {
            _.touchStartClientX = ev.touches[0].clientX;
        }
        (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.addEventListener('touchstart', handleTouchStart);
        function handleTouchMove(ev) {
            _.touchMoveClientX = ev.touches[0].clientX;
            _.translateSlider();
        }
        (_b = this.$slider) === null || _b === void 0 ? void 0 : _b.addEventListener('touchmove', handleTouchMove);
        function handleTouchEnd(ev) { }
        (_c = this.$slider) === null || _c === void 0 ? void 0 : _c.addEventListener('touchend', handleTouchEnd);
    }
}
const slider = new Slider();

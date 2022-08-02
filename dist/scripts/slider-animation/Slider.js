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
        this.translationOffset = 0;
        this.Dots = new Dots();
        this.listen();
    }
    goPrevSlide() {
        if (this._currentSlide !== 0) {
            this.Dots.update(this._currentSlide, this._prevSlide);
            this._nextSlide = this._currentSlide;
            this._currentSlide = this._prevSlide;
            this._prevSlide = this._prevSlide - 1;
        }
    }
    goNextSlide() {
        if (this._currentSlide !== this.numberOfSlides - 1) {
            this.Dots.update(this._currentSlide, this._nextSlide);
            this._prevSlide = this._currentSlide;
            this._currentSlide = this._nextSlide;
            this._nextSlide = this._nextSlide + 1;
        }
    }
    applyTranslation(value) {
        var _a;
        (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.setAttribute('style', `transform: translateX(${value}%)`);
    }
    computeTranslation() {
        const translation = (this.touchMoveClientX / this.touchStartClientX) * 100 - 100;
        const rounded = Math.round((translation + Number.EPSILON) * 100) / 100;
        this.translationOffset = rounded;
        this.applyTranslation(rounded + this.sliderOffset);
    }
    alignSlider(value) {
        var _a;
        (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.classList.add('testimonials__slider--smoothTransition');
        this.applyTranslation(value);
        setTimeout(() => {
            var _a;
            (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.classList.remove('testimonials__slider--smoothTransition');
        }, 300);
        this.sliderOffset = value;
    }
    handleTouchEnd() {
        this.sliderOffset += this.translationOffset;
        if (this.sliderOffset > 0) {
            this.alignSlider(0);
        }
        else if (this.sliderOffset < -300) {
            this.alignSlider(-300);
        }
        const rest = Math.abs(this.sliderOffset % 100);
        // de gauche à droite mais translation < 30% ==> on revient à l'image actuelle
        if (this.touchStartClientX > this.touchMoveClientX && rest <= 30) {
            this.alignSlider(this.sliderOffset + rest);
        }
        // de gauche à droite mais translation > 30% ==> on passe à l'image suivante
        else if (this.touchStartClientX > this.touchMoveClientX && rest > 30) {
            this.alignSlider(this.sliderOffset - (100 - rest));
            this.goNextSlide();
        }
        // de droite à gauche mais translation > 30% ==> on passe à l'image précédente
        else if (this.touchStartClientX < this.touchMoveClientX && rest < 70) {
            this.alignSlider(this.sliderOffset + rest);
            this.goPrevSlide();
        }
        // de droite à gauche mais translation < 30% ==> on revient à l'image actuelle
        else if (this.touchStartClientX < this.touchMoveClientX && rest >= 70) {
            this.alignSlider(this.sliderOffset - (100 - rest));
        }
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
            _.computeTranslation();
        }
        (_b = this.$slider) === null || _b === void 0 ? void 0 : _b.addEventListener('touchmove', handleTouchMove);
        function handleTouchEnd(ev) {
            _.handleTouchEnd();
        }
        (_c = this.$slider) === null || _c === void 0 ? void 0 : _c.addEventListener('touchend', handleTouchEnd);
    }
}
const slider = new Slider();

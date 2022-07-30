"use strict";
class Slider {
    constructor() {
        var _a;
        this.$slider = document.querySelector('.testimonials__slider');
        this.$slides = document.querySelectorAll('.testimonials__slide');
        this.numberOfSlides = ((_a = this.$slides) === null || _a === void 0 ? void 0 : _a.length) || 0;
        this._currentSlide = 1;
        this._prevSlide = 4;
        this._nextSlide = 2;
        this.listen();
        this.prevSlide(this.numberOfSlides);
        this.currentSlide(1);
        this.nextSlide(2);
    }
    prevSlide(slideNum) {
        this._prevSlide = slideNum;
    }
    currentSlide(slideNum) {
        this._currentSlide = slideNum;
    }
    nextSlide(slideNum) {
        if (slideNum > this.numberOfSlides) {
            this._nextSlide = 1;
        }
        else {
            this._nextSlide = slideNum;
        }
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

import Dots from './Dots.js';
class Slider {
    constructor() {
        this.$slider = document.querySelector('.testimonials__slider');
        this.$slides = document.querySelectorAll('.testimonials__slide');
        this.numberOfSlides = this.$slides.length || 0;
        this._currentSlide = 0;
        this._prevSlide = this.numberOfSlides - 1;
        this._nextSlide = 1;
        this.translationStartClientX = 0;
        this.translationMoveClientX = 0;
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
        const translation = (this.translationMoveClientX / this.translationStartClientX) * 100 - 100;
        const rounded = Math.round((translation + Number.EPSILON) * 100) / 100;
        this.translationOffset = rounded;
        this.applyTranslation(rounded + this.sliderOffset);
    }
    alignSlider(value) {
        var _a;
        (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.classList.add('smoothTransition');
        this.applyTranslation(value);
        setTimeout(() => {
            var _a;
            (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.classList.remove('smoothTransition');
        }, 300);
        this.sliderOffset = value;
    }
    slideRatio() {
        // déterminer la taille d'une slide par rapport à la fenêtre
        const viewport = window.visualViewport.width;
        const slideWidth = Math.round(Number(window.getComputedStyle(this.$slides[0]).width.split('px')[0]) * 10) /
            10;
        return (slideWidth / viewport) * 100;
    }
    saveAndCheckOffSet() {
        this.sliderOffset += this.translationOffset;
        const ratio = this.slideRatio();
        const limit = ratio * -this.numberOfSlides + 100;
        if (this.sliderOffset > 0) {
            this.alignSlider(0);
        }
        else if (this.sliderOffset < limit) {
            this.alignSlider(limit);
        }
    }
    handleTouchEnd() {
        this.saveAndCheckOffSet();
        const rest = Math.abs(this.sliderOffset % 100);
        // de gauche à droite mais translation < 30% ==> on revient à l'image actuelle
        if (this.translationStartClientX > this.translationMoveClientX && rest <= 30) {
            this.alignSlider(this.sliderOffset + rest);
        }
        // de gauche à droite mais translation > 30% ==> on passe à l'image suivante
        else if (this.translationStartClientX > this.translationMoveClientX && rest > 30) {
            this.alignSlider(this.sliderOffset - (100 - rest));
            this.goNextSlide();
        }
        // de droite à gauche mais translation > 30% ==> on passe à l'image précédente
        else if (this.translationStartClientX < this.translationMoveClientX && rest < 70) {
            this.alignSlider(this.sliderOffset + rest);
            this.goPrevSlide();
        }
        // de droite à gauche mais translation < 30% ==> on revient à l'image actuelle
        else if (this.translationStartClientX < this.translationMoveClientX && rest >= 70) {
            this.alignSlider(this.sliderOffset - (100 - rest));
        }
    }
    listen() {
        var _a, _b;
        const _ = this;
        function handleTouchMove(ev) {
            _.translationMoveClientX = ev.touches[0].clientX;
            _.computeTranslation();
        }
        function handleTouchEnd(ev) {
            var _a, _b;
            (_a = _.$slider) === null || _a === void 0 ? void 0 : _a.removeEventListener('touchmove', handleTouchMove);
            _.handleTouchEnd();
            (_b = _.$slider) === null || _b === void 0 ? void 0 : _b.removeEventListener('touchend', handleTouchEnd);
        }
        function handleTouchStart(ev) {
            var _a, _b;
            _.translationStartClientX = ev.touches[0].clientX;
            (_a = _.$slider) === null || _a === void 0 ? void 0 : _a.addEventListener('touchmove', handleTouchMove);
            (_b = _.$slider) === null || _b === void 0 ? void 0 : _b.addEventListener('touchend', handleTouchEnd);
        }
        (_a = this.$slider) === null || _a === void 0 ? void 0 : _a.addEventListener('touchstart', handleTouchStart);
        function handleMouseMove(ev) {
            _.translationMoveClientX = ev.clientX;
            _.computeTranslation();
        }
        function handleMouseUp(ev) {
            var _a;
            document.removeEventListener('mousemove', handleMouseMove);
            if (window.innerWidth < 1024) {
                _.handleTouchEnd();
            }
            else {
                _.saveAndCheckOffSet();
            }
            (_a = _.$slider) === null || _a === void 0 ? void 0 : _a.classList.remove('grabbing');
            document.removeEventListener('mouseup', handleMouseUp);
        }
        function handleMouseDown(ev) {
            var _a;
            (_a = _.$slider) === null || _a === void 0 ? void 0 : _a.classList.add('grabbing');
            _.translationStartClientX = ev.clientX;
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        (_b = this.$slider) === null || _b === void 0 ? void 0 : _b.addEventListener('mousedown', handleMouseDown);
    }
}
const slider = new Slider();

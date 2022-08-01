import Dots from './Dots.js';

class Slider {
	private $slider = document.querySelector('.testimonials__slider');
	private $slides: NodeListOf<HTMLElement> | null =
		document.querySelectorAll('.testimonials__slide');
	private numberOfSlides = this.$slides?.length || 0;
	private _currentSlide: number = 0;
	private _prevSlide: number = 3;
	private _nextSlide: number = 1;

	private touchStartClientX = 0;
	private touchMoveClientX = 0;
	private sliderOffset = 0;
	private translationOffset = 0;

	private Dots = new Dots();

	constructor() {
		this.listen();
	}

	prevSlide(slideNum: number) {
		this._prevSlide = slideNum;
	}

	currentSlide(slideNum: number) {
		this._currentSlide = slideNum;
	}

	nextSlide(slideNum: number) {
		if (slideNum > this.numberOfSlides - 1) {
			this._nextSlide = 0;
		} else {
			this._nextSlide = slideNum;
		}
	}

	updateInterface() {
		this.$slider?.classList.remove(`testimonials__slider--show-${this._currentSlide}`);
		this.$slider?.classList.add(`testimonials__slider--show-${this._nextSlide}`);

		this.Dots.update(this._currentSlide, this._nextSlide);
		this.currentSlide(this._nextSlide);
		this.nextSlide(this._nextSlide + 1);
	}

	applyTranslation(value: number) {
		this.$slider?.setAttribute('style', `transform: translateX(${value}%)`);
	}

	computeTranslation() {
		const translation = (this.touchMoveClientX / this.touchStartClientX) * 100 - 100;
		const rounded = Math.round((translation + Number.EPSILON) * 100) / 100;
		this.translationOffset = rounded;
		this.applyTranslation(rounded + this.sliderOffset);
	}

	alignSlider(value: number) {
		this.$slider?.classList.add('testimonials__slider--smoothTransition');
		this.applyTranslation(value);
		setTimeout(() => {
			this.$slider?.classList.remove('testimonials__slider--smoothTransition');
		}, 300);
		this.sliderOffset = value;
	}

	handleTouchEnd() {
		this.sliderOffset += this.translationOffset;
		if (this.sliderOffset > 0) {
			this.alignSlider(0);
		} else if (this.sliderOffset < -300) {
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
		}

		// de droite à gauche mais translation > 30% ==> on passe à l'image précédente
		else if (this.touchStartClientX < this.touchMoveClientX && rest < 70) {
			this.alignSlider(this.sliderOffset + rest);
		}

		// de droite à gauche mais translation < 30% ==> on revient à l'image actuelle
		else if (this.touchStartClientX < this.touchMoveClientX && rest >= 70) {
			this.alignSlider(this.sliderOffset - (100 - rest));
		}
	}

	listen() {
		const _ = this;

		function handleTouchStart(this: HTMLElement, ev: TouchEvent) {
			_.touchStartClientX = ev.touches[0].clientX;
		}
		this.$slider?.addEventListener('touchstart', handleTouchStart as EventListener);

		function handleTouchMove(this: HTMLElement, ev: TouchEvent) {
			_.touchMoveClientX = ev.touches[0].clientX;
			_.computeTranslation();
		}
		this.$slider?.addEventListener('touchmove', handleTouchMove as EventListener);

		function handleTouchEnd(this: HTMLElement, ev: TouchEvent) {
			_.handleTouchEnd();
		}
		this.$slider?.addEventListener('touchend', handleTouchEnd as EventListener);
	}
}

const slider = new Slider();

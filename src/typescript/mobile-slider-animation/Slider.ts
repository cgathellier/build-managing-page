import Dots from './Dots.js';

class Slider {
	private $slider = document.querySelector('.testimonials__slider');
	private $slides: NodeListOf<HTMLElement> | null =
		document.querySelectorAll('.testimonials__slide');
	private numberOfSlides = this.$slides?.length || 0;
	private _currentSlide: number = 0;
	private _prevSlide: number = 3;
	private _nextSlide: number = 1;

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

	listen() {
		this.$slider?.addEventListener('click', () => this.updateInterface());
	}
}

const slider = new Slider();

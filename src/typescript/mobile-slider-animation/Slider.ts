class Slider {
	private $slider = document.querySelector('.testimonials__slider');
	private $slides: NodeListOf<HTMLElement> | null =
		document.querySelectorAll('.testimonials__slide');
	private numberOfSlides = this.$slides?.length || 0;
	private _currentSlide: number = 1;
	private _prevSlide: number = 4;
	private _nextSlide: number = 2;

	constructor() {
		this.listen();
		this.prevSlide(this.numberOfSlides);
		this.currentSlide(1);
		this.nextSlide(2);
	}

	prevSlide(slideNum: number) {
		this._prevSlide = slideNum;
	}

	currentSlide(slideNum: number) {
		this._currentSlide = slideNum;
	}

	nextSlide(slideNum: number) {
		if (slideNum > this.numberOfSlides) {
			this._nextSlide = 1;
		} else {
			this._nextSlide = slideNum;
		}
	}

	updateInterface() {
		console.log(this.$slider);
		this.$slider?.classList.remove(`testimonials__slider--show-${this._currentSlide}`);
		this.$slider?.classList.add(`testimonials__slider--show-${this._nextSlide}`);

		this.currentSlide(this._nextSlide);
		this.nextSlide(this._nextSlide + 1);
	}

	listen() {
		this.$slider?.addEventListener('click', () => this.updateInterface());
	}
}

const slider = new Slider();

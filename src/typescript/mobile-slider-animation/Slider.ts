class Slider {
	private $slider = document.querySelector('.testimonials__slider');
	private _currentSlide: number = 1;
	private _prevSlide: number = 4;
	private _nextSlide: number = 2;

	constructor() {
		this.listen();
	}

	currentSlide(slideNum: number) {
		this._currentSlide = slideNum;
	}

	nextSlide(slideNum: number) {
		this._nextSlide = slideNum;
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

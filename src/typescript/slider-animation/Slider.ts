import Dots from './Dots.js';

class Slider {
	private $slider = document.querySelector('.testimonials__slider');
	private $slides: NodeListOf<HTMLElement> = document.querySelectorAll('.testimonials__slide')!;
	private numberOfSlides = this.$slides.length || 0;
	private _currentSlide: number = 0;
	private _prevSlide: number = this.numberOfSlides - 1;
	private _nextSlide: number = 1;

	private translationStartClientX = 0;
	private translationMoveClientX = 0;
	private sliderOffset = 0;
	private translationOffset = 0;

	private Dots = new Dots();

	constructor() {
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

	resetState() {
		this.translationStartClientX = 0;
		this.translationMoveClientX = 0;
		this.translationOffset = 0;
	}

	applyTranslation(value: number) {
		this.$slider?.setAttribute('style', `transform: translateX(${value}%)`);
	}

	translationRatio() {
		// déterminer la distance de translation par rapport à la fenêtre
		const viewport = window.visualViewport.width;
		const distance = this.translationMoveClientX - this.translationStartClientX;

		const ratio = (distance / viewport) * 100;
		const rounded = Math.round((ratio + Number.EPSILON) * 100) / 100;

		this.translationOffset = rounded;
		this.applyTranslation(rounded + this.sliderOffset);
	}

	alignSlider(value: number) {
		this.$slider?.classList.add('smoothTransition');
		this.applyTranslation(value);
		setTimeout(() => {
			this.$slider?.classList.remove('smoothTransition');
		}, 300);
		this.sliderOffset = value;
	}

	slideRatio(): number {
		// déterminer la taille d'une slide par rapport à la fenêtre
		const viewport = window.visualViewport.width;
		const slideWidth =
			Math.round(Number(window.getComputedStyle(this.$slides[0]).width.split('px')[0]) * 10) /
			10;

		return (slideWidth / viewport) * 100;
	}

	saveAndCheckOffSet() {
		this.sliderOffset += this.translationOffset;

		const ratio = this.slideRatio();
		const limit = ratio * -this.numberOfSlides + 100;

		if (this.sliderOffset > 0) {
			this.alignSlider(0);
		} else if (this.sliderOffset < limit) {
			this.alignSlider(limit);
		}
	}

	handleTranslationEnd() {
		this.saveAndCheckOffSet();

		const rest = Math.abs(this.sliderOffset % 100);

		// de gauche à droite mais translation < 10% ==> on revient à l'image actuelle
		if (this.translationStartClientX > this.translationMoveClientX && rest <= 10) {
			this.alignSlider(this.sliderOffset + rest);
		}

		// de gauche à droite mais translation > 10% ==> on passe à l'image suivante
		else if (this.translationStartClientX > this.translationMoveClientX && rest > 10) {
			this.alignSlider(this.sliderOffset - (100 - rest));
			this.goNextSlide();
		}

		// de droite à gauche mais translation > 10% ==> on passe à l'image précédente
		else if (this.translationStartClientX < this.translationMoveClientX && rest < 90) {
			this.alignSlider(this.sliderOffset + rest);
			this.goPrevSlide();
		}

		// de droite à gauche mais translation < 10% ==> on revient à l'image actuelle
		else if (this.translationStartClientX < this.translationMoveClientX && rest >= 90) {
			this.alignSlider(this.sliderOffset - (100 - rest));
		}

		this.resetState();
	}

	listen() {
		const _ = this;

		// TOUCH EVENTS
		function handleTouchMove(this: HTMLElement, ev: TouchEvent) {
			_.translationMoveClientX = ev.touches[0].clientX;
			_.translationRatio();
		}
		function handleTouchEnd(this: HTMLElement, ev: TouchEvent) {
			_.$slider?.removeEventListener('touchmove', handleTouchMove as EventListener);
			_.handleTranslationEnd();
			_.$slider?.removeEventListener('touchend', handleTouchEnd as EventListener);
		}
		function handleTouchStart(this: HTMLElement, ev: TouchEvent) {
			_.translationStartClientX = ev.touches[0].clientX;
			_.$slider?.addEventListener('touchmove', handleTouchMove as EventListener);
			_.$slider?.addEventListener('touchend', handleTouchEnd as EventListener);
		}
		this.$slider?.addEventListener('touchstart', handleTouchStart as EventListener);

		// MOUSE EVENTS
		function handleMouseMove(this: HTMLElement, ev: MouseEvent) {
			_.translationMoveClientX = ev.clientX;
			_.translationRatio();
		}
		function handleMouseUp(this: HTMLElement, ev: MouseEvent) {
			document.removeEventListener('mousemove', handleMouseMove as EventListener);
			if (window.innerWidth < 1024) {
				_.handleTranslationEnd();
			} else {
				_.saveAndCheckOffSet();
			}
			_.$slider?.classList.remove('grabbing');
			document.removeEventListener('mouseup', handleMouseUp as EventListener);
		}
		function handleMouseDown(this: HTMLElement, ev: MouseEvent) {
			_.$slider?.classList.add('grabbing');
			_.translationStartClientX = ev.clientX;
			document.addEventListener('mousemove', handleMouseMove as EventListener);
			document.addEventListener('mouseup', handleMouseUp as EventListener);
		}
		this.$slider?.addEventListener('mousedown', handleMouseDown as EventListener);
	}
}

const slider = new Slider();

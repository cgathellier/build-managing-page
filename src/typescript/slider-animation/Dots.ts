export default class Dots {
	private $dots = document.querySelectorAll('.testimonials__navigation-dot');

	update(oldDot: number, newDot: number) {
		if (this.$dots.length === 0) return;

		this.$dots[oldDot]?.classList.remove('testimonials__navigation-dot--selected');
		this.$dots[newDot]?.classList.add('testimonials__navigation-dot--selected');
	}
}

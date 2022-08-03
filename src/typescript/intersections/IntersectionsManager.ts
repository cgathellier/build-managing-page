class IntersectionsManager {
	private $presentationHeader: HTMLDivElement = document.querySelector('.presentation__header')!;

	constructor() {
		this.listen();
	}

	listen() {
		function handleIntersect(
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver
		) {
			entries.forEach(entry => {
				// retirer les class qui font disparaître les éléments
				// soit à gauche soit à droite

				console.log(entry.isIntersecting);
			});
		}

		const options: IntersectionObserverInit = {
			root: null,
			rootMargin: '0px',
			threshold: 1.0,
		};

		const observer = new IntersectionObserver(handleIntersect, options);

		observer.observe(this.$presentationHeader);
	}
}

new IntersectionsManager();

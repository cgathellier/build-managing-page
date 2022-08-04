const $boxes: NodeListOf<HTMLElement> = document.querySelectorAll('[data-intersect]')!;

function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
	entries.forEach(entry => {
		if (entry.intersectionRatio === 1) {
			entry.target.children[0]?.classList.add('is-in-viewport');
		}
	});
}

const options: IntersectionObserverInit = {
	root: null,
	rootMargin: '0px',
	threshold: 1.0,
};

const observer = new IntersectionObserver(handleIntersect, options);

$boxes.forEach((box, index) => {
	setTimeout(() => {
		observer.observe(box);
	}, 500 * index);
});

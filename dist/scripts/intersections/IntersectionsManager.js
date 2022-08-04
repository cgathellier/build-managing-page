"use strict";
const $boxes = document.querySelectorAll('[data-intersect]');
function handleIntersect(entries, observer) {
    entries.forEach(entry => {
        var _a;
        if (entry.intersectionRatio === 1 || entry.target.getBoundingClientRect().y < 0) {
            (_a = entry.target.children[0]) === null || _a === void 0 ? void 0 : _a.classList.add('is-in-viewport');
        }
    });
}
const options = {
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

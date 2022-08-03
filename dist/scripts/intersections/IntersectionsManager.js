"use strict";
class IntersectionsManager {
    constructor() {
        this.$presentationHeader = document.querySelector('.presentation__header');
        this.listen();
    }
    listen() {
        function handleIntersect(entries, observer) {
            entries.forEach(entry => {
                // retirer les class qui font disparaître les éléments
                // soit à gauche soit à droite
                console.log(entry.isIntersecting);
            });
        }
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(this.$presentationHeader);
    }
}
new IntersectionsManager();

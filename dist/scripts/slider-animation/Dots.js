export default class Dots {
    constructor() {
        this.$dots = document.querySelectorAll('.testimonials__navigation-dot');
    }
    update(oldDot, newDot) {
        var _a, _b;
        if (this.$dots.length === 0)
            return;
        (_a = this.$dots[oldDot]) === null || _a === void 0 ? void 0 : _a.classList.remove('testimonials__navigation-dot--selected');
        (_b = this.$dots[newDot]) === null || _b === void 0 ? void 0 : _b.classList.add('testimonials__navigation-dot--selected');
    }
}

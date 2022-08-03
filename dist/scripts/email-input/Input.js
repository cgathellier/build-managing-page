export default class Input {
    constructor() {
        this.$input = document.querySelector('.footer__newsletter-input');
        this.email = '';
    }
    checkEmail() {
        const email = this.$input.value;
        if (email === '') {
            return 'EMPTY';
        }
        else if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.email = email;
            return 'VALID';
        }
        else {
            return 'INVALID';
        }
    }
    toggle(action) {
        if (action === 'SUCCESS') {
            this.$input.value = '';
        }
    }
}

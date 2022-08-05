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
        switch (action) {
            case 'SUCCESS':
                this.$input.value = '';
                break;
            case 'ERROR':
                this.$input.classList.add('error');
                break;
            case 'RESET':
                this.$input.classList.remove('error');
                break;
            default:
                break;
        }
    }
    listen(isTyping) {
        this.$input.addEventListener('input', isTyping);
    }
}

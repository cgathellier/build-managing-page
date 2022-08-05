export default class ErrorMessage {
    constructor() {
        this.$errorEl = document.querySelector('.footer__newsletter-message');
    }
    setSuccess() {
        this.$errorEl.classList.remove('error');
        this.$errorEl.innerHTML = 'Your email has been successfully submitted!';
        setTimeout(() => {
            this.$errorEl.innerHTML = '';
        }, 10000);
    }
    setError() {
        this.$errorEl.classList.add('error');
        this.$errorEl.innerHTML = 'Please insert a valid email';
    }
    reset() {
        this.$errorEl.classList.remove('error');
        this.$errorEl.innerHTML = '';
    }
    toggle(action) {
        switch (action) {
            case 'SUCCESS':
                // affichage d'un message de confirmation en blanc
                this.setSuccess();
                break;
            case 'ERROR':
                // affichage d'un message d'erreur en rouge
                this.setError();
                break;
            case 'RESET':
                // suppression du message
                this.reset();
                break;
            default:
                break;
        }
    }
}

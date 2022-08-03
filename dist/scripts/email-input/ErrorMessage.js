export default class ErrorMessage {
    constructor() {
        this.$errorEl = document.querySelector('.footer__newsletter-message');
    }
    toggle(action) {
        // success : affichage d'un message de confirmation en blanc
        if (action === 'SUCCESS') {
            this.$errorEl.classList.remove('error');
            this.$errorEl.innerHTML = 'Your email has been successfully submitted!';
            setTimeout(() => {
                this.$errorEl.innerHTML = '';
            }, 10000);
        }
        // error : affichage d'un message d'erreur en rouge
        else {
            this.$errorEl.classList.add('error');
            this.$errorEl.innerHTML = 'Please insert a valid email';
        }
    }
}

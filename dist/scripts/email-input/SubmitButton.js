var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ObserversManager from '../ObserversManager.js';
import Input from './Input.js';
import ErrorMessage from './ErrorMessage.js';
import API from './API.js';
class SubmitButton {
    constructor() {
        this.$button = document.querySelector('[aria-label="submit email form"]');
        this.ValidationManager = new ObserversManager();
        this.InputEl = new Input();
        this.ErrorEl = new ErrorMessage();
        this.ValidationManager.subscribe(this.InputEl);
        this.ValidationManager.subscribe(this.ErrorEl);
        this.listen();
    }
    submitEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield API.post('/email', this.InputEl.email);
            if (res.status === '201')
                this.ValidationManager.fire('SUCCESS');
        });
    }
    displayError() {
        this.ValidationManager.fire('ERROR');
    }
    listen() {
        this.$button.addEventListener('click', e => {
            e.preventDefault();
            const isValid = this.InputEl.checkEmail();
            switch (isValid) {
                case 'VALID':
                    this.submitEmail();
                    break;
                case 'INVALID':
                    this.displayError();
                    break;
                default:
                    break;
            }
        });
    }
}
new SubmitButton();

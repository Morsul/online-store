import { elementGenerator } from "../../controller/taggenerator";
import { paymentSystemsImg, ValidationForm } from "./validationForm";

const regExprsValid = {
  name: /^(\w{3,}\s){1,}\w{3,}$/i,
  phone: /^\+[0-9]{9,}/,
  address: /^([^\s]{5,}\s){2,}[^\s]{5,}$/i,
  email: /^[a-z0-9._%+-]+@[a-z0-9-]+[.][a-z]{2,4}$/i,
  cardNumber: /[0-9]{16}/,
  cardDate: /(0[1-9]|1[0-2])\/[0-9]{2}/,
  cardCVV: /[0-9]{3}/,
}

export class ModalWindow {

  private _validationForm: ValidationForm = new ValidationForm();

  createWindow(): HTMLDivElement {
    const shadow: HTMLDivElement = elementGenerator.createDiv({ className: 'window' });
    shadow.addEventListener('click', (event) => {
      const target: HTMLDivElement = <HTMLDivElement>event.target;
      if(target.classList.contains('window')) {
        shadow.remove();
      }
    });
    const window: HTMLDivElement = elementGenerator.createDiv({ className: 'window_modal' });
    const title: HTMLHeadingElement = elementGenerator.createHeading('h2', { className: 'window_title', text: 'Personal details' });
    
    const name: HTMLInputElement = elementGenerator.createInput('text', { className: 'input', placeholder: 'Name', pattern: '^([^\\s]{3,}\\s){1,}[^\\s]{3,}$' });
    name.addEventListener('focusout', () => this._validationForm.blur(name, regExprsValid.name), {once: true});
    const nameDiv: HTMLDivElement = elementGenerator.createDiv({ className: 'check-valid' });
    this._validationForm.mapFormField.set(name, () => this._validationForm.checkValidData(name, regExprsValid.name));
    nameDiv.append(name);

    const phoneNumber: HTMLInputElement = elementGenerator.createInput('text', { className: 'input', placeholder: 'Phone number', pattern: '^\\+[0-9]{9,}' });
    phoneNumber.addEventListener('focusout', () => this._validationForm.blur(phoneNumber, regExprsValid.phone), {once: true});
    const phoneDiv: HTMLDivElement = elementGenerator.createDiv({ className: 'check-valid' });
    this._validationForm.mapFormField.set(phoneNumber, () => this._validationForm.checkValidData(phoneNumber, regExprsValid.phone))
    phoneDiv.append(phoneNumber);

    const address: HTMLInputElement = elementGenerator.createInput('text', { className: 'input', placeholder: 'Delivery address', pattern: '^([^\\s]{5,}\\s){2,}[^\\s]{5,}$'});
    address.addEventListener('focusout', () => this._validationForm.blur(address, regExprsValid.address), {once: true});
    const addressDiv: HTMLDivElement = elementGenerator.createDiv({ className: 'check-valid' });
    this._validationForm.mapFormField.set(address, () => this._validationForm.checkValidData(address, regExprsValid.address));
    addressDiv.append(address);

    const email: HTMLInputElement = elementGenerator.createInput('email', { className: 'input', placeholder: 'E-mail', pattern: '^[a-z0-9._%+-]+@[a-z0-9-]+[.][a-z]{2,4}$'});
    email.addEventListener('focusout', () => this._validationForm.blur(email, regExprsValid.email), {once: true});
    const emailDiv: HTMLDivElement = elementGenerator.createDiv({ className: 'check-valid' });
    this._validationForm.mapFormField.set(email, () => this._validationForm.checkValidData(email, regExprsValid.email));
    emailDiv.append(email);

    const titleCard: HTMLHeadingElement = elementGenerator.createHeading('h2', {className: 'window_title', text: 'Credit card details' });
    const cardBlock: HTMLDivElement = elementGenerator.createDiv({ className: 'window_card' });
    const cardWrapper: HTMLDivElement = elementGenerator.createDiv({ className: 'card-wrapper'});

    const numberCardBlock: HTMLDivElement = elementGenerator.createDiv({ className: '' });
    const imgCard: HTMLImageElement = elementGenerator.createImg(paymentSystemsImg[0], { alt: 'card'});
    const numberCard: HTMLInputElement = elementGenerator.createInput('text', { placeholder: 'Card number', className: 'input', pattern: '[0-9]{16}' });
    numberCard.addEventListener('input', () => this._validationForm.validNumberCard(numberCard, imgCard));
    numberCard.addEventListener('focusout', () => {
      numberCard.removeEventListener('input', () => this._validationForm.validNumberCard(numberCard, imgCard));
      this._validationForm.showNumberMessage(numberCard, imgCard, cardBlock);
      numberCard.addEventListener('input', () => this._validationForm.showNumberMessage(numberCard, imgCard, cardBlock));
    }, {once: true});
    this._validationForm.mapFormField.set(numberCard, () => this._validationForm.showNumberMessage(numberCard, imgCard, cardBlock));
    numberCardBlock.append(imgCard, numberCard);

    const codeBlock: HTMLDivElement = elementGenerator.createDiv({});
    const dateBlock: HTMLSpanElement = elementGenerator.createSpan({ text: 'VALID: '});
    const dataInput: HTMLInputElement = elementGenerator.createInput('text', { placeholder: 'Valid Thru', className: 'input', pattern: '(0[1-9]|1[0-2])/[0-9]{2}' } );
    dataInput.addEventListener('input', () => this._validationForm.validDateCard(dataInput));
    dataInput.addEventListener('focusout', () => {
      dataInput.addEventListener('input', () => this._validationForm.showDateMessage(dataInput, cardBlock));
      this._validationForm.showDateMessage(dataInput, cardBlock);
      dataInput.removeEventListener('input', () => this._validationForm.validDateCard(dataInput));
    }, {once: true});
    this._validationForm.mapFormField.set(dataInput, () => this._validationForm.showDateMessage(dataInput, cardBlock))

    dateBlock.append(dataInput);
    const cvvBlock: HTMLSpanElement = elementGenerator.createSpan({ text: 'CVV: '});
    const cvvInput: HTMLInputElement = elementGenerator.createInput('text', { placeholder: 'Code', className: 'input', pattern: '[0-9]{3}' });
    cvvInput.addEventListener('input', () => this._validationForm.validCVV(cvvInput));
    cvvInput.addEventListener('focusout', () => {
      cvvInput.addEventListener('input', () => this._validationForm.showCVVMessage(cvvInput, cardBlock));
      this._validationForm.showCVVMessage(cvvInput, cardBlock);
      cvvInput.removeEventListener('input', () => this._validationForm.validCVV(cvvInput));
    }, {once: true});
    this._validationForm.mapFormField.set(cvvInput, () => this._validationForm.showCVVMessage(cvvInput, cardBlock));

    cvvBlock.append(cvvInput);
    codeBlock.append(dateBlock, cvvBlock);
    cardWrapper.append(numberCardBlock, codeBlock);
    cardBlock.append(cardWrapper);
    const confirmButton: HTMLButtonElement = elementGenerator.createButton({text: 'confirm', className: 'button' });
    const formTag: HTMLFormElement = document.createElement('form');
    formTag.noValidate = true;
    formTag.addEventListener('submit', (event) => this._validationForm.validForm(event));
    formTag.classList.add('pay-order');
    formTag.append(title, nameDiv, phoneDiv, addressDiv, emailDiv, titleCard, cardBlock, confirmButton);
    window.append(formTag);
    shadow.append(window);
    return shadow;
  }

}
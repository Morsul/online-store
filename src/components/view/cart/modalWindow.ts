import { elementGenerator } from "../../controller/taggenerator";

const paymentSystemsImg = {
  0: 'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71',
  2: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Mir-logo.SVG.svg',
  4: 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png',
  5: 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg'
};

export class ModalWindow {

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
    const name: HTMLInputElement = elementGenerator.createInput('text', { className: 'input', placeholder: 'Name' });
    name.addEventListener('input', (event) => this.validName(event));
    const phoneNumber: HTMLInputElement = elementGenerator.createInput('text', { className: 'input', placeholder: 'Phone number' });
    phoneNumber.addEventListener('input', (event) => this.validPhone(event));
    const address: HTMLInputElement = elementGenerator.createInput('text', { className: 'input', placeholder: 'Delivery address' });
    address.addEventListener('input', (event) => this.validAddress(event));
    const email: HTMLInputElement = elementGenerator.createInput('email', { className: 'input', placeholder: 'E-mail' });
    email.addEventListener('input', (event) => this.validEmail(event));
    const titleCard: HTMLHeadingElement = elementGenerator.createHeading('h2', {className: 'window_title', text: 'Credit card details' });
    const cardBlock: HTMLDivElement = elementGenerator.createDiv({ className: 'window_card' });
    const cardWrapper: HTMLDivElement = elementGenerator.createDiv({ className: 'card-wrapper'});
    const numberCardBlock: HTMLDivElement = elementGenerator.createDiv({ className: '' });
    const imgCard: HTMLImageElement = elementGenerator.createImg(paymentSystemsImg[0], { alt: 'card'});
    const numberCard: HTMLInputElement = elementGenerator.createInput('text', { placeholder: 'Card number', className: 'input' });
    numberCard.addEventListener('input', (event) => this.validNumberCard(event, imgCard));
    numberCardBlock.append(imgCard, numberCard);
    const codeBlock: HTMLDivElement = elementGenerator.createDiv({});
    const dateBlock: HTMLSpanElement = elementGenerator.createSpan({ text: 'VALID: '});
    const dataInput: HTMLInputElement = elementGenerator.createInput('text', { placeholder: 'Valid Thru', className: 'input' });
    dataInput.addEventListener('input', (event) => this.validDataCard(event));
    dateBlock.append(dataInput);
    const cvvBlock: HTMLSpanElement = elementGenerator.createSpan({ text: 'CVV: '});
    const cvvInput: HTMLInputElement = elementGenerator.createInput('text', { placeholder: 'Code', className: 'input' });
    cvvInput.addEventListener('input', (event) => this.validCVV(event));
    cvvBlock.append(cvvInput);
    codeBlock.append(dateBlock, cvvBlock);
    cardWrapper.append(numberCardBlock, codeBlock);
    cardBlock.append(cardWrapper);
    const confirmButton: HTMLButtonElement = elementGenerator.createButton({text: 'confirm', className: 'button' });
    window.append(title, name, phoneNumber, address, email, titleCard, cardBlock, confirmButton);
    shadow.append(window);
    return shadow;
  }

  private validName(event: Event) {
    const field: HTMLInputElement = <HTMLInputElement>event.target;
    const regExp = /^([^\s]{3,}\s){1,}[^\s]{3,}$/gi;
    console.log(regExp.test(field.value.trim()));
  }

  private validPhone(event: Event) {
    const field: HTMLInputElement = <HTMLInputElement>event.target;
    const regExp = /^\+[0-9]{9,}/;
    console.log(regExp.test(field.value.trim()));
  }

  private validAddress(event: Event) {
    const field: HTMLInputElement = <HTMLInputElement>event.target;
    const regExp = /^([^\s]{5,}\s){2,}[^\s]{5,}$/gi;
    console.log(regExp.test(field.value.trim()));
  }

  private validEmail(event: Event) {
    const field: HTMLInputElement = <HTMLInputElement>event.target;
    const regExp = /^[a-z0-9._%+-]+@[a-z0-9-]+[.][a-z]{2,4}$/i;
    console.log(regExp.test(field.value.trim()));
  }

  private validNumberCard(event: Event, img: HTMLImageElement) {
    const field: HTMLInputElement = <HTMLInputElement>event.target;
    field.value = field.value.replace(/\D/g, '').slice(0, 16);
    switch(field.value[0]) {
      case '2':
        img.src = paymentSystemsImg[2];
        break;
      case '4':
        img.src = paymentSystemsImg[4];
        break;
      case '5':
        img.src = paymentSystemsImg[5];
        break;
      default:
        img.src = paymentSystemsImg[0];
    }
  }

  private validDataCard(event: Event) {
    const field: HTMLInputElement = <HTMLInputElement>event.target;
    field.value = field.value.replace(/\D/g, '').slice(0, 4);
    if (field.value.length > 2) {
      field.value = field.value.slice(0, 2) + '/' + field.value.slice(2);
    }
  }

  private validCVV(event: Event) {
    const field: HTMLInputElement = <HTMLInputElement>event.target;
    field.value = field.value.replace(/\D/g, '').slice(0, 3);
  }

}
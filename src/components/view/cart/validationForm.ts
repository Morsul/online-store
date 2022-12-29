import { elementGenerator } from "../../controller/taggenerator";

export const paymentSystemsImg = {
  0: 'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71',
  2: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Mir-logo.SVG.svg',
  4: 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png',
  5: 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg'
};

export class ValidationForm {

  public mapFormField: Map<HTMLInputElement, () => void> = new Map<HTMLInputElement, () => void>();

  public blur (field: HTMLInputElement, regExp: RegExp) {
    this.checkValidData(field, regExp);
    field.addEventListener('input', () => this.checkValidData(field, regExp));
  }

  public checkValidData(field: HTMLInputElement, regExp: RegExp): void {
    if(!regExp.test(field.value.trim())) {
      field.classList.add('input-error');
      field.parentElement?.classList.add('valid-error');
    } else {
      field.classList.remove('input-error');
      field.parentElement?.classList.remove('valid-error');
    }
  }

  public validNumberCard(field: HTMLInputElement, img: HTMLImageElement): string {
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
    return field.value;
  }

  public showNumberMessage(field: HTMLInputElement, img: HTMLImageElement, parent: HTMLDivElement): void {
    field.value = this.validNumberCard(field, img);
    this.toogleMessage(field.value.length < 16, field, parent, 'error-number-card', 'Card number - error');
  }

  public validDateCard(field: HTMLInputElement): string {
    field.value = field.value.replace(/\D/g, '').slice(0, 4);
    if (field.value.length > 2) {
      field.value = field.value.slice(0, 2) + '/' + field.value.slice(2);
    }
    return field.value;
  }

  public showDateMessage(field: HTMLInputElement, parent: HTMLDivElement): void {
    field.value = this.validDateCard(field);
    const isShow: boolean = field.value.length < 5 || +field.value.slice(0, 2) > 12;
    this.toogleMessage(isShow, field, parent, 'error-date-card', 'Card valid thru - error');
  }

  public validCVV(field: HTMLInputElement): string {
    return field.value = field.value.replace(/\D/g, '').slice(0, 3);
  }

  public showCVVMessage(field: HTMLInputElement, parent: HTMLDivElement): void {
    field.value = this.validCVV(field);
    this.toogleMessage(field.value.length < 3, field, parent, 'error-cvv-card', 'Card CVV - error');
  }

  private toogleMessage(isShow: boolean,field: HTMLInputElement, parent: HTMLDivElement, className: string, message: string): void {
    if(isShow) {
      field.classList.add('error-card');
      if (!document.querySelector( `.${className}`)) {
        parent.after(elementGenerator.createParagraph({ text: message, className: `error-message ${className}`}));
      }
    } else {
      field.classList.remove('error-card');
      document.querySelector('.' + className)?.remove();
    }
  }

  public validForm(event: Event): boolean {
    const form: HTMLFormElement = <HTMLFormElement>event.target;
    event.preventDefault();
    let isValid = true;
    for (let j = 0; j < form.length - 1; j++) {
      const input = <HTMLInputElement>form[j];
      if(input.value.length == 0 || input.validity.patternMismatch) {
        // form invalid
        isValid = false;
      }
      const func = this.mapFormField.get(input);
      if (func) {
        input.oninput = func;
        input.dispatchEvent( new Event('focusout') );
        func();
      }
    }
    console.log(isValid);
    return true;// isValid;
  }

}
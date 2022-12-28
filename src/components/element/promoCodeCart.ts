import { IPromoCode } from '../../type';
import { LocalStorageManager } from '../controller/localStorage';
import { elementGenerator } from '../controller/taggenerator';

export class PromoCodeCart {
  private _promoCodes: Array<IPromoCode>;
  private _promoLS: Array<IPromoCode>;
  private _inputPromo: HTMLInputElement;
  private _oldPriceHTML: HTMLParagraphElement;
  private _newPriceHTML: HTMLSpanElement;

  constructor(oldPriceHTML: HTMLParagraphElement) {
    this._promoCodes = new Array<IPromoCode>();
    this._promoCodes.push({ id: 'RS', title: 'Rolling Scopes School', discount: 10 });
    this._promoCodes.push({ id: 'EPM', title: 'EPAM Systems', discount: 10 });
    this._promoLS = new LocalStorageManager().getLSPromo();
    this._inputPromo = elementGenerator.createInput('text', {
      placeholder: 'Enter promo code',
      className: 'summary-cart_input',
    });
    this._oldPriceHTML = oldPriceHTML;
    this._newPriceHTML = elementGenerator.createParagraph({ text: 'Total: ', className: 'new-price' });
  }

  createPromoCart(): DocumentFragment {
    const fragment = new DocumentFragment();
    const price = new LocalStorageManager().getPromoPrice();
    const newPrice = elementGenerator.createSpan({ text: price.toString(), className: 'cost-after-promo' });
    this._newPriceHTML.append(newPrice);
    if (this._promoLS.length) {
      this._oldPriceHTML.classList.add('old-price');
    } else {
      this._newPriceHTML.classList.add('hidden');
    }
    const applyPromo = this._promoLS.map((value) => this.createApplyPromoCode(value));
    const promoTest = elementGenerator.createParagraph({
      text: 'Promo for test: "rs", "epm"',
      className: 'example-promo',
    });
    this._inputPromo.addEventListener('input', (event) => this.checkInputPromo(event));
    fragment.append(this._newPriceHTML, ...applyPromo, this._inputPromo, promoTest);

    window.addEventListener('storage', () => this.updateTitlePrice());

    return fragment;
  }

  private checkInputPromo(event: Event) {
    const input: HTMLInputElement = <HTMLInputElement>event.target;
    const promo: IPromoCode | undefined = this._promoCodes.find(
      (value) => value.id.toLowerCase() === input.value.toLowerCase()
    );
    if (input.nextElementSibling?.classList.contains('promo-suggest')) {
      input.nextElementSibling.remove();
    }
    if (promo) {
      input.after(this.createSuggestedPromoCode(promo));
    }
  }

  private createSuggestedPromoCode(promo: IPromoCode): DocumentFragment {
    const fragment = new DocumentFragment();
    const blockPromo = elementGenerator.createDiv({ className: 'promo-suggest promo-description' });
    const descriptionPromo = elementGenerator.createSpan({ text: `${promo.title} - ${promo.discount}%` });
    blockPromo.append(descriptionPromo);
    const indexLS = this._promoLS.findIndex((value) => value.id === promo.id);
    const addPromo = elementGenerator.createDiv({ text: 'add', className: 'button button-promo' });
    if (indexLS === -1) {
      addPromo.addEventListener('click', () => {
        const prevNode = blockPromo.previousSibling;
        prevNode?.before(this.createApplyPromoCode(promo));
        addPromo.remove();
        this._promoLS.push(promo);
        localStorage.setItem('Promo', JSON.stringify(this._promoLS));
        this.updateTitlePrice();
      });
      blockPromo.append(addPromo);
    }
    fragment.append(blockPromo);
    return fragment;
  }

  private createApplyPromoCode(promo: IPromoCode): DocumentFragment {
    const fragment = new DocumentFragment();
    const blockPromo = elementGenerator.createDiv({ className: 'promo-description' });
    const descriptionPromo = elementGenerator.createSpan({ text: `${promo.title} - ${promo.discount}%` });
    const removePromo = elementGenerator.createDiv({ text: 'del', className: 'button button-promo' });
    removePromo.addEventListener('click', () => {
      blockPromo.remove();
      const indexLS = this._promoLS.findIndex((value) => value.id === promo.id);
      if (indexLS >= 0) {
        this._promoLS.splice(indexLS, 1);
        localStorage.setItem('Promo', JSON.stringify(this._promoLS));
        this.updateTitlePrice();
      }
      this._inputPromo.dispatchEvent(new Event('input'));
    });
    blockPromo.append(descriptionPromo, removePromo);
    fragment.append(blockPromo);
    return fragment;
  }

  private updateTitlePrice() {
    if (!this._promoLS.length) {
      this._oldPriceHTML.classList.remove('old-price');
      this._newPriceHTML.classList.add('hidden');
    } else {
      this._oldPriceHTML.classList.add('old-price');
      this._newPriceHTML.classList.remove('hidden');
      const priceHTML = this._newPriceHTML.querySelector('.cost-after-promo');
      if (priceHTML) {
        priceHTML.innerHTML = new LocalStorageManager().getPromoPrice().toString();
      }
    }
  }
}

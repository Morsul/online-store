import { elementGenerator } from '../controller/taggenerator';
import Router from '../controller/router';
import { LocalStorageManager } from '../controller/localStorage';
//import { ILocalStorageproduct } from "../../basic";

export class HeaderCart {
  private _productCount: HTMLParagraphElement;
  private _cartCost: HTMLParagraphElement;
  private _localStorage;
  constructor() {
    this._localStorage = new LocalStorageManager();
    const costLS = this._localStorage.getInfoCost();
    this._productCount = elementGenerator.createParagraph({ className: 'cart__product-count', text: `${costLS[0]}` });
    this._cartCost = elementGenerator.createParagraph({
      className: 'cart__product-price',
      text: `Cart cost: ${costLS[1]}`,
    });
  }

  create() {
    const cart = elementGenerator.createDiv({ className: 'cart' });
    cart.append(this._productCount, this._cartCost);

    cart.addEventListener('click', (e: Event): void => Router.getInstance().route(e, '/cart'));
    window.addEventListener('storage', () => this._updateCart());
    return cart;
  }

  private _updateCart(): void {
    const info = this._localStorage.getInfoCost();
    this._productCount.innerText = String(info[0]);
    this._cartCost.innerText = `Cart cost: ${info[1]}`;
  }
}

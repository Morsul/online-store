//import { IPromoCode } from "../../basic";
import { LocalStorageManager } from "../controller/localStorage";
import { elementGenerator } from "../controller/taggenerator";
import { ModalWindow } from "../view/cart/modalWindow";
import { PromoCodeCart } from "./promoCodeCart";

export class SummaryCart {

  private _productCount: HTMLSpanElement;
  private _productCost: HTMLSpanElement;

  constructor() {
    const cartLS = new LocalStorageManager().getInfoCost();
    this._productCost = elementGenerator.createSpan({text: cartLS[1].toString()});
    this._productCount = elementGenerator.createSpan({text: cartLS[0].toString()});
  }

  createSummeryCart(): DocumentFragment {
    const fragment = new DocumentFragment();
    const cartAside = elementGenerator.createHTMLElement('aside', {className: "summary-cart"});
    const title = elementGenerator.createParagraph({text: 'Summary', className: 'summary-cart_title'});
    const productCountBlock = elementGenerator.createParagraph({text: 'Products: '});
    productCountBlock.append(this._productCount);
    const productCostBlock = elementGenerator.createParagraph({text: 'Total: '});
    productCostBlock.append(this._productCost);
    
    const promoTest = new PromoCodeCart(productCostBlock).createPromoCart();
    const buttonBuy = elementGenerator.createDiv({text: 'buy', className: 'button'});
    buttonBuy.addEventListener('click', () => {
      const modalWindow = new ModalWindow();
      document.querySelector('.main')?.append(modalWindow.createWindow());
    });
    cartAside.append(title, productCountBlock, productCostBlock, promoTest, buttonBuy);
    fragment.append(cartAside)

    window.addEventListener('storage', () => this.updateSummary());

    return fragment;
    }

    private updateSummary() {
      const dataLS: LocalStorageManager = new LocalStorageManager();
      const cartLS: Array<number> = dataLS.getInfoCost();
      this._productCost.innerHTML = cartLS[1].toString();
      this._productCount.innerHTML = cartLS[0].toString();
    }

}
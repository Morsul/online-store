import { elementGenerator } from "../controller/taggenerator";
import Router from "../controller/router";
import { localStorageManager } from "../controller/localStorage";
import { ILocalStorageproduct } from "../../basic";

export class HeaderCart {
  private _productCount;
  private _cartCost;
  private _localStorage;
  constructor(){
    this._localStorage = new localStorageManager();
    this._productCount = elementGenerator.createParagraph({className: 'cart__product_count', text: `${this._getInfo()[0]}`});
    this._cartCost = elementGenerator.createParagraph({className: 'cart__product_price', text: `Cart cost: ${this._getInfo()[1]}`});
  }

  create(){
    const cart = elementGenerator.createDiv({className: 'cart'});
    cart.append(this._productCount, this._cartCost);
    
    cart.addEventListener('click', (e: Event): void => Router.getInstance().route(e, '/cart'));
    window.addEventListener('storage', ()=>this._updateCart());
    return cart
  }

  private _updateCart():void{
    const info = this._getInfo();
    this._productCount.innerText = String(info[0]);
    this._cartCost.innerText = `Cart cost: ${info[1]}`
  }

  private _getInfo():number[]{
    const cartLocal: Array<ILocalStorageproduct> = this._localStorage.getLSCart();
    let priceSumm = 0.00;
    let itemCount = 0.00;
    cartLocal.forEach(e=>{
      itemCount += e.count;
      priceSumm += Math.round(e.count*(e.price*((100-e.discountPercentage))));
    });
    return [itemCount, priceSumm/100];
  }

}
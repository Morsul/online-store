import { elementGenerator } from "../controller/taggenerator";
import Router from "../controller/router";

export class Header{
  createHeader(): DocumentFragment{
    const fragment = new DocumentFragment();

    const header = elementGenerator.createHTMLElement('header',{});
    const headerContainer = elementGenerator.createDiv({className: 'header__container container'});
    const home = elementGenerator.createParagraph({className: 'home', text: 'Home'});

    const cart = elementGenerator.createDiv({className: 'cart'});
    const productCount = elementGenerator.createDiv({className: 'cart__product_count', text: '0'});
    const cartCost = elementGenerator.createDiv({className: 'cart__product_price', text: 'Cart cost: 0.00'});

    home.addEventListener('click', (e: Event): void => Router.getInstance().route(e, '/'));
    cart.addEventListener('click', (e: Event): void => Router.getInstance().route(e, '/cart'));
    
    cart.append(productCount, cartCost)
    headerContainer.append(home, cart)
    header.append(headerContainer)

    fragment.append(header)

    return fragment;
  }
}

import { elementGenerator } from '../controller/taggenerator';
import Router from '../controller/router';
import { HeaderCart } from './headerCart';
import '../assets/svg/logo.svg';

export class Header {
  createHeader(): DocumentFragment {
    const fragment = new DocumentFragment();

    const header = elementGenerator.createHTMLElement('header', {});
    const headerContainer = elementGenerator.createDiv({ className: 'header__container container' });
    const home = elementGenerator.createParagraph({ className: 'home' });
    const cart = new HeaderCart();

    home.addEventListener('click', (e: Event): void => Router.getInstance().route(e, '/'));

    headerContainer.append(home, cart.create());
    header.append(headerContainer);

    fragment.append(header);

    return fragment;
  }
}

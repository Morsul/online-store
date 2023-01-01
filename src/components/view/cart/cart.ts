import { IProduct, View } from "../../../type";
import { elementGenerator } from "../../controller/taggenerator";
import { Pagination } from "./templates/pagination";
import { ProductList } from "../../element/productList";
import { SummaryCart } from "./templates/summaryCart";
import './cart.scss';
import { ModalWindow } from "./templates/modalWindow";
export class Cart implements View {

  draw(data: Array<IProduct>): void {
    
    const productList = new ProductList();
    const summaryCart = new SummaryCart();
    const pagination = new Pagination();

    const mainArticle = elementGenerator.createHTMLElement('article', {className: 'cart-list'});
    mainArticle.append(pagination.createPagination(), productList.createCartProductList(data));
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).append(
      mainArticle,
      summaryCart.createSummeryCart()
    );
  }

  cartEmpty(isShow?: boolean): void {
    const title:HTMLDivElement = elementGenerator.createHeading('h2', { text: 'Cart is Empty', className: 'title-page' });
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(title);
    if(isShow) {
      const popup = new ModalWindow();
      (<HTMLElement>document.querySelector('.main')).appendChild(popup.createPurchaseDone());
    }
  }

}
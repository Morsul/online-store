import { IProduct, View } from "../../../type";
import { elementGenerator } from "../../controller/taggenerator";
import { Pagination } from "../../element/pagination";
import { ProductList } from "../../element/productList";
import { SummaryCart } from "../../element/summaryCart";
import './cart.scss';
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

}
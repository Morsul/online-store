import { IProduct, View } from "../../../type";
import { ProductList } from "../../element/productList";
import { SummaryCart } from "../../element/summaryCart";
import './cart.scss';
export class Cart implements View {
  draw(data: Array<IProduct>): void {
    const productList = new ProductList();
    const summaryCart = new SummaryCart();
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).append(
      productList.createCartProductList(data, 'cart_list', true),
      summaryCart.createSummeryCart()
    );
  }
}
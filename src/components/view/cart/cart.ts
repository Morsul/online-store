import { IProduct, View } from "../../../basic";
import { ProductList } from "../../element/productList";
import { SummaryCart } from "../../element/summaryCart";
import './index.css';
export class Cart implements View {
  draw(data: Array<IProduct>): void {
    const productList = new ProductList();
    const summaryCart = new SummaryCart();
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).append(
      productList.createProductList(data, 'cart_list'),
      summaryCart.createSummeryCart()
    );
  }
}
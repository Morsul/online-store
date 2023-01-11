import { IFilter, IProduct, View } from '../../../type';
import { elementGenerator } from '../../controller/taggenerator';
import { Pagination } from './templates/pagination';
import { ProductList } from '../../element/productList';
import { SummaryCart } from './templates/summaryCart';
import './cart.scss';
import { ModalWindow } from './templates/modalWindow';
export class Cart implements View {
  draw(data: Array<IProduct>, options?: IFilter): void {
    const limit: number = options?.limit ? Number(options.limit) : 3;
    const page: number = options?.page ? Number(options.page) : 1;
    const indexStart = (page - 1) * limit;
    const dataPage: Array<IProduct> = data.slice(indexStart, page * limit);

    const listProduct: boolean = options?.updateList ? true : false;
    if (!listProduct) {
      const isShow: boolean = options?.modal ? true : false;
      this.updatePage(dataPage, isShow, limit, page, indexStart);
    } else {
      this.updateListProduct(dataPage, indexStart);
    }
  }

  private updatePage(
    dataPage: Array<IProduct>,
    isShow: boolean,
    limit: number,
    page: number,
    indexStart: number
  ): void {
    const summaryCart = new SummaryCart();
    const pagination = new Pagination(limit, page);
    const popup = new ModalWindow();
    const productList = new ProductList();
    const mainArticle = elementGenerator.createHTMLElement('article', { className: 'cart-list' });
    mainArticle.append(pagination.createPagination(), productList.createCartProductList(dataPage, indexStart));
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).append(
      mainArticle,
      summaryCart.createSummeryCart(),
      isShow ? popup.createWindow() : ''
    );
  }

  private updateListProduct(dataPage: Array<IProduct>, indexStart: number): void {
    const productList = new ProductList();
    const cart: HTMLElement = <HTMLElement>document.querySelector('.cart-list');
    if (cart) {
      cart.children.item(1)?.remove();
      cart.append(productList.createCartProductList(dataPage, indexStart));
    }
  }

  cartEmpty(isShow?: boolean): void {
    const title: HTMLDivElement = elementGenerator.createHeading('h2', {
      text: 'Cart is Empty',
      className: 'title-page',
    });
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(title);
    if (isShow) {
      const popup = new ModalWindow();
      (<HTMLElement>document.querySelector('.main')).appendChild(popup.createPurchaseDone());
    }
  }
}

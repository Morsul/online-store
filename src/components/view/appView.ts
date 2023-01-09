import { ICatalog, IFilter, IProduct } from '../../type';
import { Cart } from './cart/cart';
import CatalogView from './catalog/catalog';
import NotPageView from './notPage/notPage';
import ProductView from './product/product';
import FilterProducts from '../controller/filterProducts';

class AppView {
  private _catalog: CatalogView;
  private _product: ProductView;
  private _cart: Cart;
  private _notePage: NotPageView;
  private _filter: FilterProducts;

  constructor() {
    this._catalog = new CatalogView();
    this._product = new ProductView();
    this._cart = new Cart();
    this._notePage = new NotPageView();
    this._filter = new FilterProducts();
  }

  drawCatalog(data: ICatalog, options?: IFilter): void {
    let listProduct: Array<IProduct> | null;
    if (options) {
      listProduct = this._filter.getFilterList(options, data.products);
      if (listProduct) {
        this._catalog.draw(listProduct, options);
      }
      return;
    }
    this._catalog.draw(data.products);
  }

  drawProduct(data: ICatalog, options?: IFilter): void {
    console.log(options);
    if (options) {
      const product = this._filter.getSingleProduct(options, data);
      if (product) {
        this._product.draw(product);
        return;
      }
      const idProduct = options?.product;
      if (idProduct) {
        this._product.drawNotProduct(idProduct);
        return;
      }
    }
    this.drawNotPage();
  }

  drawCart(data: ICatalog, options?: IFilter): void {
    const productList: Array<IProduct> = this._filter.getCartList(data.products /*, options*/);
    const isModal: boolean = options?.modal ? true : false;
    //const updateList: boolean = options?.updateList ? true : false;
    if (productList.length) {
      this._cart.draw(productList, options);
      //isModal, updateList);
    } else {
      this._cart.cartEmpty(isModal);
    }
  }
  drawNotPage(): void {
    this._notePage.draw();
  }
}

export default AppView;

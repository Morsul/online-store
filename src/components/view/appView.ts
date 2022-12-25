import { ICatalog, IFilter, IProduct } from "../../basic";
import { Cart } from "./cart/cart";
import CatalogView from "./catalog/catalog";
import NotPageView from "./notPage/notPage";
import ProductView from "./product/product";
import FilterProducts from "../controller/filterProducts";

class AppView {
  private _catalog: CatalogView;
  private _product: ProductView;
  private _cart: Cart;
  private _notePage: NotPageView;
  private _filter: FilterProducts;

  constructor () {
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
        this._catalog.draw(listProduct);
      }
      return;
    }
    this._catalog.draw(data.products);
  }

  drawProduct(data: ICatalog, options?: IFilter) :void {
    let product: IProduct | null;
    if (options) {
      product = this._filter.getSingleProduct(options, data);
      if (product) {
        this._product.draw(product);
        return
      }
    }
    this.drawNotPage();
  }

  drawCart(data: ICatalog, options?: IFilter): void {
    this._cart.draw(this._filter.getCartList(data.products, options));
  }

  drawNotPage(): void {
    this._notePage.draw();
  }
  
}

export default AppView;
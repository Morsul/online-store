import { ICatalog, IProduct } from "../../basic";
import CardView from "./cart/cart";
import CatalogView from "./catalog/catalog";
import NotPageView from "./notPage/notPage";
import ProductView from "./product/product";

class AppView {
  private _catalog: CatalogView;
  private _product: ProductView;
  private _card: CardView;
  private _notePage: NotPageView;

  constructor () {
    this._catalog = new CatalogView();
    this._product = new ProductView();
    this._card = new CardView();
    this._notePage = new NotPageView();
  }

  drawCatalog(data: ICatalog) {
    this._catalog.draw(data.products);
  }

  drawProduct(data: IProduct) {
    this._product.draw(data);
  }

  drawCart(data: ICatalog) {
    this._card.draw(data.products);
  }

  drawNotPage() {
    this._notePage.draw();
  }
  
}

export default AppView;
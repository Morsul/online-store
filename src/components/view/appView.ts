import { ICatalog } from "../../basic";
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

  drawCatalog(data: ICatalog, options?: string) {
    console.log(options);
    this._catalog.draw(data.products);
  }

  drawProduct(data: ICatalog, options?: string) {
    console.log(options);
    this._product.draw(data.products[0]);
  }

  drawCart(data: ICatalog, options?: string) {
    console.log(options);
    this._card.draw(data.products);
  }

  drawNotPage() {
    this._notePage.draw();
  }
  
}

export default AppView;
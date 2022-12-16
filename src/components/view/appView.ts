import Card from "./cart/cart";
import Catalog from "./catalog/catalog";
import NotPage from "./notPage/notPage";
import Product from "./product/product";

class AppView {
  private _catalog: Catalog;
  private _product: Product;
  private _card: Card;
  private _notePage: NotPage;

  constructor () {
    this._catalog = new Catalog();
    this._product = new Product();
    this._card = new Card();
    this._notePage = new NotPage();
  }

  drawCatalog() {
    this._catalog.draw();
  }

  drawProduct() {
    this._product.draw();
  }

  drawCart() {
    this._card.draw();
  }

  drawNotPage() {
    this._notePage.draw();
  }
  
}

export default AppView;
import { Callback, ICatalog, IProduct } from "../../basic";
import Controller from "../controller/controller";
import Router from "../controller/router";
import AppView from "../view/appView";

class App {
  private _controller;
  private _view: AppView;
  private _router: Router;

  constructor() {
    this._controller = new Controller();
    this._view = new AppView();
    const map: Map<string, Callback<string>> = new Map();
    map.set('/404', () => this._controller.getNotPage(() => this._view.drawNotPage()));
    map.set('/', (find) => this._controller.getCatalog(find, (date: ICatalog) => this._view.drawCatalog(date)) );
    map.set('/cart', (find) => this._controller.getCart(find, (date: ICatalog) => this._view.drawCart(date)));
    map.set('/product', (find) => this._controller.getProduct(find, (date: IProduct) => this._view.drawProduct(date)));
    this._router = new Router(map);
  }

  start () {
    (<HTMLElement>document
      .querySelector('.cart'))
      .addEventListener('click', (e: Event): void => this._router.route(e, '/cart'));
    (<HTMLElement>document
      .querySelector('.home'))
      .addEventListener('click', (e: Event): void => this._router.route(e, '/'));
    this._router.handleLocation();
  }

}

export default App;
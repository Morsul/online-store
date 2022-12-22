import { Callback } from "../../basic";
import Controller from "../controller/controller";
import Router from "../controller/router";
import AppView from "../view/appView";
class App {
  private _controller: Controller;
  private _view: AppView;

  constructor() {
    this._controller = new Controller();
    this._view = new AppView();
  }

  start () {
    (<HTMLElement>document
      .querySelector('.cart'))
      .addEventListener('click', (e: Event): void => Router.getInstance().route(e, '/cart'));
    (<HTMLElement>document
      .querySelector('.home'))
      .addEventListener('click', (e: Event): void => Router.getInstance().route(e, '/'));
    Router.getInstance();
    const map: Map<RegExp, Callback<string>> = new Map();
    map.set(/404/, () => this._controller.getNotPage(() => this._view.drawNotPage()));
    map.set(/^\/$/, (find) => this._controller.getCatalog(find, (data, filter) => this._view.drawCatalog(data, filter)) );
    map.set(/^\/cart$/, (find) => this._controller.getCart(find, (data, filter) => this._view.drawCart(data, filter)));
    map.set(/^\/product\/[0-9]{1,3}$/, (find) => this._controller.getProduct(find, (data, filter) => this._view.drawProduct(data, filter)));
    Router.getInstance().routes = map;
    Router.getInstance().handleLocation();
  }

}

export default App;
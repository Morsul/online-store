import { Callback } from "../../basic";
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
    const map: Map<string, Callback> = new Map();
    map.set('/404', () => this._view.drawNotPage());
    map.set('/', () => this._controller.getCatalog(() => this._view.drawCatalog()) );
    map.set('/cart', () => this._controller.getCart(() => this._view.drawCart()));
    map.set('/product', () => this._controller.getProduct(() => this._view.drawProduct()));
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
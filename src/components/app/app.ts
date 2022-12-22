import { Callback, ICatalog, IProduct } from "../../basic";
import Controller from "../controller/controller";
import Router from "../controller/router";
import AppView from "../view/appView";
import { Header } from "../element/header";
import { elementGenerator } from "../controller/taggenerator";
import { Footer } from "../element/footer";

class App {
  private _controller;
  private _view: AppView;

  constructor() {
    this._controller = new Controller();
    this._view = new AppView();
  }

  start () {
    const header = new Header();
    const main = elementGenerator.createHTMLElement('main', {className: 'main'});
    const footer = new Footer();
    document.body.append(header.createHeader(), main, footer.createFooter())
    Router.getInstance();
    const map: Map<RegExp, Callback<string>> = new Map();
    map.set(/404/, () => this._controller.getNotPage(() => this._view.drawNotPage()));
    map.set(/^\/$/, (find) => this._controller.getCatalog(find, (date: ICatalog) => this._view.drawCatalog(date)) );
    map.set(/^\/cart$/, (find) => this._controller.getCart(find, (date: ICatalog) => this._view.drawCart(date)));
    map.set(/^\/products\/[0-9]{1,3}$/, (find) => this._controller.getProduct(find, (date: IProduct) => this._view.drawProduct(date)));
    Router.getInstance().routes = map;
    Router.getInstance().handleLocation();
  }

}

export default App;
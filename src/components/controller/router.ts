import { Callback } from "../../type";

class Router {
  private static instance: Router;
  private _routes: Map<RegExp, Callback<string>>;
  
  private constructor() {
    this._routes = new Map<RegExp, Callback<string>>();
  }

  static getInstance() {
    if (!Router.instance) {
      Router.instance = new Router();
      window.addEventListener('popstate', () => Router.instance.handleLocation() );
    }
    return Router.instance;
  }

  set routes (routes: Map<RegExp, Callback<string>>) {
    Router.instance._routes = routes;
  }

  handleLocation(hrefOptions?: string) {
    console.log(hrefOptions);
    const path: string = window.location.pathname;
    let getData: Callback<string> | undefined;
    for(const key of Router.getInstance()._routes.keys()) {
      if (key.test(path)) {
        getData = Router.getInstance()._routes.get(key);
        break;
      }
      else if (key.test('404')) {
        getData = Router.getInstance()._routes.get(key);
      }
    }
    if (getData) {
      const addOption = hrefOptions ? (window.location.search ? '&' : '?') + hrefOptions : '';
      getData(decodeURI(path + window.location.search) + addOption);
    }
  }

  route(event: Event, href: string): void {
    event = event || window.event;
    event.preventDefault();
    if (href === window.location.pathname + window.location.search) {
      return;
    }
    history.pushState({route: href}, '', href);
    Router.getInstance().handleLocation();
  }

  routeDefault(href: string, hrefOptions?: string): void {
    if (href !== window.location.pathname + window.location.search) {
      history.pushState({route: href}, '', href);
    }
    Router.getInstance().handleLocation(hrefOptions);
  }

}
export default Router;
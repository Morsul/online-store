import { Callback } from "../../basic";

class Router {

  private _routes: Map<RegExp, Callback<string>>;
  
  constructor (routers: Map<RegExp, Callback<string>>) {
    this._routes = routers;
    window.addEventListener('popstate', this.handleLocation);
  }

  handleLocation = async () => {
    const path: string = window.location.pathname;
    let getData: Callback<string> | undefined;
    for(const key of this._routes.keys()) {
      if (key.test(path)) {
        getData = this._routes.get(key);
        break;
      }
      else if (key.test('404')) {
        getData = this._routes.get(key);
      }
    }
    if (getData) {
      getData(path + window.location.search);
    }
  };

  route(event: Event, href: string): void {
    event = event || window.event;
    event.preventDefault();
    history.pushState({route: href}, '', href);
    this.handleLocation();
  }

}
export default Router;
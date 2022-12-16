import { Callback } from "../../basic";

class Router {

  private _routes: Map<string, Callback>;
  
  constructor (routers: Map<string, () => void>) {
    this._routes = routers;
    window.onpopstate = this.handleLocation;
  }

  handleLocation = async () => {
    const path: string = window.location.pathname;
    const route = this._routes.get(path) || this._routes.get('/404');
    if (route) {
      route();
    }
  };

  route(event: Event, href: string): void {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({route: href}, '', href);
    this.handleLocation();
  }

}
export default Router;
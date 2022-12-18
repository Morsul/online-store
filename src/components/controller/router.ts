import { Callback } from "../../basic";

class Router {

  private _routes: Map<string, Callback<string>>;
  
  constructor (routers: Map<string, Callback<string>>) {
    this._routes = routers;
    window.addEventListener('popstate', this.handleLocation);
  }

  handleLocation = async () => {
    const path: string = window.location.pathname;
    const getDate = this._routes.get(path) || this._routes.get('/404');
    if (getDate) {
      getDate(window.location.search);
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
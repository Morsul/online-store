import { Callback } from "../../basic";

class Controller {

  getCatalog(callback: Callback): void {
    callback();
  }

  getCart(callback: Callback): void {
    callback();
  }

  getProduct(callback: Callback): void {
    callback();
  }

}

export default Controller;
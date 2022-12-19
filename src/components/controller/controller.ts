import { Callback, IProduct, ICatalog } from "../../basic";
import AppLoader from "./appLoader";

class Controller extends AppLoader {
  getCatalog(find: string, callback: Callback<ICatalog>): void {
    super.getResp('/products?limit=100', callback);
  }

  getCart(find: string, callback: Callback<ICatalog>): void {
    super.getResp('/products?limit=100', callback);
  }

  getProduct(find: string, callback: Callback<IProduct>): void {
    super.getResp(find, callback);
  }

  getNotPage(callback: () => void) {
    callback();
  }

}

export default Controller;
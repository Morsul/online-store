import { Callback, IProduct, ICatalog } from "../../basic";
import AppLoader from "./appLoader";

class Controller extends AppLoader {

  getCatalog(find: string, callback: Callback<ICatalog>): void {
    super.getResp(callback);
  }

  getCart(find: string, callback: Callback<ICatalog>): void {
    super.getResp(callback);
  }

  getProduct(find: string, callback: Callback<IProduct>): void {
    super.getResp(callback);
  }

  getNotPage(callback: () => void) {
    callback();
  }

}

export default Controller;
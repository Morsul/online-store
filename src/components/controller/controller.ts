import { Callback, ICatalog } from "../../basic";
import Loader from "./loader";
import jsonFile from '../assets/data/products.json';

class Controller extends Loader {

  constructor() {
    super(jsonFile.toString());
  }

  getCatalog(find: string, callback: Callback<ICatalog>): void {
    super.getResp({ options: '/products', callback });
  }

  getCart(find: string, callback: Callback<ICatalog>): void {
    super.getResp({ options: '', callback });
  }

  getProduct(find: string, callback: Callback<ICatalog>): void {
    super.getResp({ options: find, callback });
  }

  getNotPage(callback: () => void) {
    callback();
  }

}

export default Controller;
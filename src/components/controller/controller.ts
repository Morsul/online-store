import { Callback, ICatalog, IFilter } from '../../type';
import Loader from './loader';
import jsonFile from '../assets/data/products.json';

class Controller extends Loader {
  constructor() {
    super(jsonFile.toString());
  }

  getCatalog(find: string, callback: Callback<ICatalog>): void {
    const filter: IFilter = { product: '-1' };
    find
      .replace('/?', '')
      .split('&')
      .forEach((value) => {
        const filterValue = value.split('=');
        if (filterValue.length === 2) {
          filter[<keyof typeof filter>filterValue[0]] = filterValue[1];
        }
      });
    super.getResp(filter, callback);
  }

  getCart(find: string, callback: Callback<ICatalog>): void {
    super.getResp({ product: '-1' }, callback);
  }

  getProduct(find: string, callback: Callback<ICatalog>): void {
    const match: RegExpMatchArray | null = find.match(/[0-9]{1,3}/);
    if (match) {
      super.getResp({ product: match[0] }, callback);
    }
  }

  getNotPage(callback: () => void) {
    callback();
  }
}

export default Controller;

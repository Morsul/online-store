import { Callback, ICatalog, IFilter } from '../../type';
import Loader from './loader';
import jsonFile from '../assets/data/products.json';

export class Controller extends Loader {
  constructor() {
    super(jsonFile.toString());
  }

  getCatalog(find: string, callback: Callback<ICatalog>): void {
    const filter: IFilter = this.getOptions('/?', find);
    super.getResp(filter, callback);
  }

  getCart(find: string, callback: Callback<ICatalog>): void {
    const filter: IFilter = this.getOptions('/cart?', find);
    super.getResp(filter, callback);
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

  getOptions(replaceStr: string, options: string): IFilter {
    const filter: IFilter = {};
    options
      .replace(replaceStr, '')
      .split('&')
      .forEach((value) => {
        const filterValue = value.split('=');
        if (filterValue.length === 2) {
          filter[<keyof typeof filter>filterValue[0]] = filterValue[1];
        }
      });
    return filter;
  }
}

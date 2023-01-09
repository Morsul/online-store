import {describe, expect, test} from '@jest/globals';
import { FilterControler } from '../src/components/controller/filterController';
import { Controller } from '../src/components/controller/controller';
import { Callback, ICatalog, IFilter } from '../src/type';
//import Loader from '../src/components/controller/loader';
import AppView from '../src/components/view/appView';

describe('Filter module', () => {
  const filter: FilterControler = new FilterControler();
  test('add filter', () => {
    expect(filter.addFilter('brand', 'apple')).toBe('?brand=apple');
    expect(filter.addFilter('brand', 'oppo')).toBe('?brand=apple|oppo');
    expect(filter.addFilter('category', 'lighting')).toBe('?brand=apple|oppo&category=lighting');
  });
  test('remove filter', () => {
    expect(filter.removeFilter('brand', 'apple')).toBe('?brand=oppo&category=lighting');
    expect(filter.removeFilter('brand', 'oppo')).toBe('?category=lighting');
  });
  test('add range filter', () => {
    expect(filter.addRangeFilter('price', '300', '1000')).toBe('?category=lighting&price=300|1000');
    expect(filter.addRangeFilter('stock', '10', '30')).toBe('?category=lighting&price=300|1000&stock=10|30');
  });
});

describe('Controller module', () => {
  const controller: Controller = new Controller();
  test('Options controller', () => {
    const options: IFilter = {
      category: 'lighting',
      brand: 'infinix',
    };
    expect(controller.getOptions('/?', 'category=lighting&brand=infinix')).toEqual(options);
    const optionsSecond: IFilter = {
      category: 'lighting|skincare',
      brand: 'infinix|baking food items',
    };
    expect(controller.getOptions('/?', 'category=lighting|skincare&brand=infinix|baking food items')).toEqual(optionsSecond);
    const optionsCart: IFilter = {
      limit: '1',
      page: '2',
    }
    expect(controller.getOptions('/cart?', 'limit=1&page=2')).toEqual(optionsCart);
  });
});
/*
describe('Controller module', done => {
  const callback: Callback<ICatalog> = (data: ICatalog, options?: IFilter) => {
    /*if (error) {
      done(error);
      return;
    }
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }: BlockFn;

  new Controller().getResp<ICatalog>({}, callback);
});
*/
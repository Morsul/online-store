import { CheckboxFilter, DoubleSliderFilter } from './filter';
import { elementGenerator } from '../controller/taggenerator';
import dataFilterList = require('../assets/data/filterCategories.json');
import dataProductList = require('../assets/data/products.json');
import { IFilterInfo, ICatalog, ISaticData, IFilter, IProduct } from '../../type';
import { FilterControler } from '../controller/filterController';

export class FilterList {
  private _brandInfo: CheckboxFilter[];
  private _categoryInfo: CheckboxFilter[];
  constructor() {
    (this._brandInfo = []), (this._categoryInfo = []);
  }

  async createFilterList(data: Array<IProduct>, options?: IFilter): Promise<DocumentFragment> {
    const filterControler = new FilterControler();
    const fragment = new DocumentFragment();

    const filterData: IFilterInfo = await this.getFilterData();
    const staticData: ISaticData = await this.getStatistic(filterData, data);

    const filtersWrap = elementGenerator.createHTMLElement('aside', { className: 'filter-wrap' });

    const brandUrlFilter: string[] = options?.brand ? options.brand.split('|') : [''];

    const filterBrand = elementGenerator.createDiv({ className: 'filter-list' });
    const categoryHeadline = elementGenerator.createParagraph({ text: 'Brand', className: 'filter-headline' });

    filterBrand.append(
      categoryHeadline,
      this.generateFilters(staticData, filterData.brandFilter, 'brand', brandUrlFilter)
    );

    const filterCategoty = elementGenerator.createDiv({ className: 'filter-list' });
    const brandHeadline = elementGenerator.createParagraph({ text: 'Categories', className: 'filter-headline' });

    const categoryUrlFilter: string[] = options?.category ? options.category.split('|') : [''];

    filterCategoty.append(
      brandHeadline,
      this.generateFilters(staticData, filterData.categoryFilter, 'category', categoryUrlFilter)
    );

    const priceSlider = elementGenerator.createDiv({ className: 'filter-list' });
    const priceSliderHeadline = elementGenerator.createParagraph({ text: 'Price range', className: 'filter-headline' });
    const priceSliderFilter = new DoubleSliderFilter(
      String(staticData.price[0]),
      String(staticData.price[1]),
      'price',
      options?.price
    );
    priceSlider.append(priceSliderHeadline, priceSliderFilter.getElements());

    const stockSlider = elementGenerator.createDiv({ className: 'filter-list' });
    const stockSliderHeadline = elementGenerator.createParagraph({ text: 'Stock range', className: 'filter-headline' });
    const stockSliderFilter = new DoubleSliderFilter(
      String(staticData.stock[0]),
      String(staticData.stock[1]),
      'stock',
      options?.stock
    );
    stockSlider.append(stockSliderHeadline, stockSliderFilter.getElements());

    const ressetButton = elementGenerator.createParagraph({ text: 'Reset Filters', className: 'button' });

    ressetButton.addEventListener('click', () => filterControler.setDefaultFilter());

    filtersWrap.append(ressetButton, filterBrand, filterCategoty, priceSlider, stockSlider);
    fragment.append(filtersWrap);

    return fragment;
  }

  private async getFilterData(): Promise<IFilterInfo> {
    return fetch(dataFilterList.toString())
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  private async getOveralData(): Promise<ICatalog> {
    return fetch(dataProductList.toString())
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  private async getStatistic(filterData: IFilterInfo, data: Array<IProduct>): Promise<ISaticData> {
    const overalData: ICatalog = await this.getOveralData();
    const staticData: ISaticData = {
      price: [1, 1],
      stock: [1, 1],
      avalaiblePrice: [1, 1],
      abalaibleStock: [1, 1],
      categoryInfo: new Map<string, number[]>(),
      brandInfo: new Map<string, (number | number)[]>(),
    };

    overalData.products.forEach((element, index) => {
      if (index === 0) {
        staticData.price[0] = element.price;
        staticData.price[1] = element.price;
        staticData.stock[0] = element.stock;
        staticData.stock[1] = element.stock;
      } else {
        if (element.price < staticData.price[0]) {
          staticData.price[0] = element.price;
        } else if (element.price > staticData.price[1]) {
          staticData.price[1] = element.price;
        }

        if (element.stock < staticData.stock[0]) {
          staticData.stock[0] = element.stock;
        } else if (element.stock > staticData.stock[1]) {
          staticData.stock[1] = element.stock;
        }
      }
    });

    filterData.categoryFilter.forEach((e) => {
      const catFoundList = data.filter((k) => k.category.toLowerCase() === e.toLowerCase());
      const catTotal = overalData.products.filter((k) => k.category.toLowerCase() === e.toLowerCase());
      staticData.categoryInfo.set(e, [catFoundList.length, catTotal.length]);
    });

    filterData.brandFilter.forEach((e) => {
      const brandFoundList = data.filter((k) => k.brand.toLowerCase() === e.toLowerCase());
      const brandTotal = overalData.products.filter((k) => k.brand.toLowerCase() === e.toLowerCase());
      staticData.brandInfo.set(e, [brandFoundList.length, brandTotal.length]);
    });

    return staticData;
  }

  private generateFilters(staticData: ISaticData, data: string[], group: string, filterList: string[]): HTMLDivElement {
    const filterCategotyContainer = elementGenerator.createDiv({ className: 'filter-list__container' });
    const info = staticData[`${group}Info` as keyof ISaticData] as Map<string, number[]>;

    data.forEach((e: string, i: number) => {
      const isChecked = filterList.includes(e.toLowerCase());
      let filterSet: CheckboxFilter;
      if (group === 'brand') {
        filterSet = new CheckboxFilter();
        this._brandInfo?.push(filterSet);
        filterCategotyContainer.append(filterSet.createCheckboxFiled(info, `${group}`, i, 'filter', `${e}`, isChecked));
      }
      if (group === 'category') {
        filterSet = new CheckboxFilter();
        this._categoryInfo?.push(filterSet);
        filterCategotyContainer.append(filterSet.createCheckboxFiled(info, `${group}`, i, 'filter', `${e}`, isChecked));
      }
    });
    return filterCategotyContainer;
  }

  async updateFilterState(data: Array<IProduct>) {
    const filterData: IFilterInfo = await this.getFilterData();
    const staticData: ISaticData = await this.getStatistic(filterData, data);
    this._brandInfo.forEach((e) => {
      e.updateStatistic(staticData.brandInfo);
    });

    this._categoryInfo.forEach((e) => {
      e.updateStatistic(staticData.categoryInfo);
    });
  }
}

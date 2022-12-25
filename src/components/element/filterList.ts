import { CheckboxFilter, DoubleSliderFilter } from "./filter";
import { elementGenerator } from "../controller/taggenerator";
import dataFilterList = require('../assets/data/filterCategories.json');
import dataProductList = require('../assets/data/products.json');
import { IFilterInfo, ICatalog, ISaticData} from "../../basic";
 

export class FilterList {

  async createFilterList(): Promise<DocumentFragment> {
    const fragment = new DocumentFragment();

    const filterData: IFilterInfo = await this.getFilterData();

    const filtersWrap = elementGenerator.createHTMLElement('aside', {className: "filter-wrap"});

    const filterBrand = elementGenerator.createDiv({className: "filter-list"});
    const filterBrandContainer = elementGenerator.createDiv({className: "filter-list__container"});
    const categoryHeadline = elementGenerator.createParagraph({text: 'Brand', className: "filter-headline"});
    
    filterData.brandFilter.forEach((e: string, i: number)=>{
      const filterSet = new CheckboxFilter();
      filterBrandContainer.append(filterSet.createCheckboxFiled('brand', i, 'filter', `${e}`));
    });

    filterBrand.append(categoryHeadline, filterBrandContainer);

    const filterCategoty = elementGenerator.createDiv({className: "filter-list"});
    const filterCategotyContainer = elementGenerator.createDiv({className: "filter-list__container"});
    const brandHeadline = elementGenerator.createParagraph({text: 'Categories', className: "filter-headline"});

    filterData.categoryFilter.forEach((e: string, i: number)=>{
      const filterSet = new CheckboxFilter();
      filterCategotyContainer.append(filterSet.createCheckboxFiled('category', i, 'filter', `${e}`));
    });
    filterCategoty.append(brandHeadline, filterCategotyContainer);


    const staticData: ISaticData = await this.getStatistic();
    const priceSlider = elementGenerator.createDiv({className: "filter-list"})
    const priceSliderHeadline = elementGenerator.createParagraph({text: 'Price range', className: "filter-headline"});
    const priceSliderFilter = new DoubleSliderFilter(String(staticData.price[0]), String(staticData.price[1]), 'price');
    priceSlider.append(priceSliderHeadline, priceSliderFilter.getElements());

    const stockSlider = elementGenerator.createDiv({className: "filter-list"})
    const stockSliderHeadline = elementGenerator.createParagraph({text: 'Stock range', className: "filter-headline"});
    const stockSliderFilter = new DoubleSliderFilter(String(staticData.stock[0]), String(staticData.stock[1]), 'stock')
    stockSlider.append(stockSliderHeadline, stockSliderFilter.getElements());

    filtersWrap.append(filterBrand, filterCategoty, priceSlider, stockSlider)
    fragment.append(filtersWrap);

    
    return fragment;
  }

  private async getFilterData(): Promise<IFilterInfo>{
    return fetch(dataFilterList.toString())
    .then(response => response.json())
    .then(data => {
      return data
    })
  }

  private async getOveralData(): Promise<ICatalog>{
    return fetch(dataProductList.toString())
    .then(response => response.json())
    .then(data => {
      return data
    })
  }

  private async getStatistic(): Promise<ISaticData> {
    const overalData: ICatalog = await this.getOveralData();
    const staticData: ISaticData = {
      price: [1,1],
      stock: [1,1]
    }

    overalData.products.forEach(element => {
      if(element.price < staticData.price[0]){
        staticData.price[0] = element.price
      } else if(element.price > staticData.price[1]){
        staticData.price[1] = element.price
      }

      if(element.stock < staticData.stock[0]){
        staticData.stock[0] = element.stock
      } else if(element.stock > staticData.stock[1]){
        staticData.stock[1] = element.stock
      }
    });

    return staticData;
  }
}
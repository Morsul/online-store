import { CheckboxFilter, DoubleSliderFilter } from "./filter";
import { elementGenerator } from "../controller/taggenerator";
import dataFilterList = require('../assets/data/filterCategories.json');
import dataProductList = require('../assets/data/products.json');
import { IFilterInfo, ICatalog, ISaticData, IFilter} from "../../basic";
import { FilterControler } from "../controller/filterController";
 

export class FilterList {

  async createFilterList(options?: IFilter): Promise<DocumentFragment> {
    const filterControler = new FilterControler();
    const fragment = new DocumentFragment();

    const filterData: IFilterInfo = await this.getFilterData();

    const filtersWrap = elementGenerator.createHTMLElement('aside', {className: "filter-wrap"});

    const brandUrlFilter: string[] = options?.brand ? options.brand.split('|') : [''];

    const filterBrand = elementGenerator.createDiv({className: "filter-list"});
    const categoryHeadline = elementGenerator.createParagraph({text: 'Brand', className: "filter-headline"});

    filterBrand.append(categoryHeadline,  this.generateFilters(filterData.brandFilter, 'brand', brandUrlFilter));

    const filterCategoty = elementGenerator.createDiv({className: "filter-list"});
    const brandHeadline = elementGenerator.createParagraph({text: 'Categories', className: "filter-headline"});

    const categoryUrlFilter: string[] = options?.category ? options.category.split('|') : [''];  

    filterCategoty.append(brandHeadline, this.generateFilters(filterData.categoryFilter, 'category', categoryUrlFilter));


    const staticData: ISaticData = await this.getStatistic();
    const priceSlider = elementGenerator.createDiv({className: "filter-list"})
    const priceSliderHeadline = elementGenerator.createParagraph({text: 'Price range', className: "filter-headline"});
    const priceSliderFilter = new DoubleSliderFilter(String(staticData.price[0]), String(staticData.price[1]), 'price');
    priceSlider.append(priceSliderHeadline, priceSliderFilter.getElements());

    const stockSlider = elementGenerator.createDiv({className: "filter-list"})
    const stockSliderHeadline = elementGenerator.createParagraph({text: 'Stock range', className: "filter-headline"});
    const stockSliderFilter = new DoubleSliderFilter(String(staticData.stock[0]), String(staticData.stock[1]), 'stock')
    stockSlider.append(stockSliderHeadline, stockSliderFilter.getElements());

    const ressetButton = elementGenerator.createParagraph({text: 'Reset Filters', className: 'button'})

    ressetButton.addEventListener('click',()=>filterControler.setDefaultFilter());
    
    filtersWrap.append(ressetButton, filterBrand, filterCategoty, priceSlider, stockSlider)
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

    overalData.products.forEach((element, index) => {
      if (index === 0){
        staticData.price[0] = element.price;
        staticData.price[1] = element.price;
        staticData.stock[0] = element.stock;
        staticData.stock[1] = element.stock;
      } else {
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
      }
    });

    return staticData;
  }
  private generateFilters(data: string[], group: string, filterList: string[]): HTMLDivElement{
    const filterCategotyContainer = elementGenerator.createDiv({className: "filter-list__container"});

    data.forEach((e: string, i: number)=>{
      const filterSet = new CheckboxFilter();
      const isChecked = filterList.includes(e.toLowerCase());
      filterCategotyContainer.append(filterSet.createCheckboxFiled(`${group}`, i, 'filter', `${e}`, isChecked));
    });

    return filterCategotyContainer;
  }
}
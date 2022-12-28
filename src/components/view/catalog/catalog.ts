import { IFilter, IProduct, View } from "../../../type";
import { ProductList } from "../../element/productList";
import { FilterList } from "../../element/filterList";
import { ProductsHeadline } from "../../element/productListHeader";

import './catalog.scss'

class CatalogView implements View {  
  private _productList: ProductList;
  private _filterList: FilterList | null;
  private _prodHeadline: ProductsHeadline;
  constructor(){
    this._productList = new ProductList();
    this._filterList = null;
    this._prodHeadline = new ProductsHeadline();
  }

  draw(data: Array<IProduct>, options?: IFilter): void { 
    if(!this._filterList){
      this.createView(data, options);
    } else {
      this.updateView(data);
    }
    this._prodHeadline.shownCount(data.length);
  } 

  private async createView(data: Array<IProduct>, options?: IFilter): Promise<void>{
    this._filterList = new FilterList(); 
    
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).append(
      this._prodHeadline.createProdHeader(options),
      this._productList.createProductList(data),
      await this._filterList.createFilterList(options),
    );
  }  

  private updateView(data: Array<IProduct>): void{
    const main = <HTMLElement>document.querySelector('.main');
    main.childNodes[1].replaceWith(this._productList.createProductList(data));
  }  
}

export default CatalogView;
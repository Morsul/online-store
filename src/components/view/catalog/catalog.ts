import { IProduct, View } from "../../../basic";
import { ProductList } from "../../element/productList";
import { FilterList } from "../../element/filterList";

import './index.css'

class CatalogView implements View {  
  draw(data: Array<IProduct>): void {  
    const productList = new ProductList();
    const filterList = new FilterList();
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).append(
      productList.createProductList(data),
      filterList.createFilterList(),
    );
  }
}

export default CatalogView;
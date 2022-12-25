import { IProduct, View } from "../../../basic";
import { ProductList } from "../../element/productList";
import { FilterList } from "../../element/filterList";

import './index.scss'

class CatalogView implements View {  
  async draw(data: Array<IProduct>): Promise<void> {  
    const productList = new ProductList();
    const filterList = new FilterList();
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).append(
      productList.createProductList(data),
      await filterList.createFilterList(),
    );
  }
}

export default CatalogView;
import { ICatalog, IFilter, IProduct, SortType } from "../../basic";

class FilterProduct {

  getSingleProduct(options: IFilter, catalog: ICatalog) : IProduct | null {
    if (options.product) {
      const idProduct = +options.product;
      if (idProduct) {
        const cat = catalog.products.find((value) => +value.id === idProduct);
        return cat ? cat : null;
      }
    }
    return null;
  }

  getFilterList(options: IFilter, catalog: Array<IProduct>): Array<IProduct> | null {
    let listFilter: Array<IProduct> = catalog;
    if (options.brand) {
      const brandList: Array<string> = options.brand.split('|');
      listFilter = listFilter.filter((value) => brandList.includes(value.brand.toLocaleLowerCase()));
    }
    if (listFilter && options.category) {
      const categoryList: Array<string> = options.category.split('|');
      listFilter = listFilter.filter((value) => categoryList.includes(value.category.toLocaleLowerCase()));
    }
    if (options.price) {
      const priceFilter: Array<string> = options.price.split('|');
      if(priceFilter) {
        listFilter = listFilter.filter((value) => value.price >= +priceFilter[0] && value.price <= +priceFilter[1]);
      }
    }
    if (options.stock) {
      const priceFilter: Array<string> = options.stock.split('|');
      if(priceFilter) {
        listFilter = listFilter.filter((value) => value.stock >= +priceFilter[0] && value.stock <= +priceFilter[1]);
      }
    }
    if (listFilter) {
      listFilter = this.getSortList(options, listFilter);
    }
    return listFilter;
  }

  getSortList(options: IFilter, catalog: Array<IProduct>): Array<IProduct> {
    if (options.sort) {
      const sort = options.sort.split('-');
      if (sort.length === 2) {
        if (sort[1] === SortType.DESC) {
          catalog.sort((a, b) => (+b[<keyof typeof b>sort[0]] - +a[<keyof typeof a>sort[0]]));
        }
        else if (sort[1] === SortType.ASC) {
          catalog.sort((a, b) => (+a[<keyof typeof a>sort[0]] - +b[<keyof typeof b>sort[0]]));
        }
      }
    }
    return catalog;
  }

}

export default FilterProduct;
import { IProduct } from "../../basic";
import { elementGenerator } from "../controller/taggenerator";
import { SingleProduct } from "./singleProduct";  

export class ProductList {
  createProductList(data: Array<IProduct>):HTMLElement{
    const mainArticle = elementGenerator.createHTMLElement('article', {className: "product_list"});

    data.forEach((item) => {
      const product = new SingleProduct();
      mainArticle.append(product.createProduct(item));
    });

    return mainArticle;
  }
}
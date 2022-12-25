import { IProduct } from "../../basic";
import { elementGenerator } from "../controller/taggenerator";
import { SingleProduct } from "./singleProduct";  

export class ProductList {
  createProductList(data: Array<IProduct>, classBlock: string, isShowButton: boolean):DocumentFragment {
    const fragment = new DocumentFragment();
    const mainArticle = elementGenerator.createHTMLElement('article', {className: classBlock});

    data.forEach((item, index) => {
      const product = new SingleProduct();
      mainArticle.append(product.createProduct(item, index + 1, isShowButton));
    });

    fragment.append(mainArticle);

    return fragment;
  }
}
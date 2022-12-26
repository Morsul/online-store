import { IProduct } from "../../type";
import { elementGenerator } from "../controller/taggenerator";
import { SingleProduct } from "./singleProduct";  

export class ProductList {
  createProductList(data: Array<IProduct>):DocumentFragment {
    const fragment = new DocumentFragment();
    const mainArticle = elementGenerator.createHTMLElement('article', {className: 'product-list'});

    data.forEach((item) => {
      const product = new SingleProduct();
      mainArticle.append(product.createProduct(item));
    });

    fragment.append(mainArticle);

    return fragment;
  }

  createCartProductList(data: Array<IProduct>, classBlock: string, isShowButton: boolean):DocumentFragment {
    const fragment = new DocumentFragment();
    const mainArticle = elementGenerator.createHTMLElement('article', {className: classBlock});

    data.forEach((item, index) => {
      const product = new SingleProduct();
      mainArticle.append(product.createProductInCart(item, index + 1, isShowButton));
    });

    fragment.append(mainArticle);

    return fragment;
  }
}
import { IProduct } from '../../type';
import { elementGenerator } from '../controller/taggenerator';
import { SingleProductCart } from '../view/cart/templates/singleProductCart';
import { SingleProductCatalog } from '../view/catalog/singleProductCatalog';

export class ProductList {
  createProductList(data: Array<IProduct>): DocumentFragment {
    const fragment = new DocumentFragment();
    if (data.length > 0) {
      const mainArticle = elementGenerator.createHTMLElement('article', { className: 'product-list' });

      data.forEach((item) => {
        const product = new SingleProductCatalog(item, false);
        mainArticle.append(product.createProduct());
      });

      fragment.append(mainArticle);
    } else {
      const text = elementGenerator.createParagraph({ text: 'Sorry cant find anything', className: 'nothing-found' });
      fragment.append(text);
    }

    return fragment;
  }

  createCartProductList(data: Array<IProduct>, indexStart = 0): DocumentFragment {
    const fragment = new DocumentFragment();
    const mainArticle = elementGenerator.createHTMLElement('article', { className: '' });

    data.forEach((item, index) => {
      const product = new SingleProductCart(item, true);
      mainArticle.append(product.createProduct(indexStart + index + 1));
    });

    fragment.append(mainArticle);

    return fragment;
  }
}

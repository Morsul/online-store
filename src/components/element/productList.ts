import { IProduct } from '../../type';
import { elementGenerator } from '../controller/taggenerator';
import { SingleProductCart } from '../view/cart/templates/singleProductCart';
import { SingleProductCatalog } from '../view/catalog/singleProductCatalog';
import { FilterControler } from '../controller/filterController';

export class ProductList {
  createProductList(data: Array<IProduct>, optionView?: string | undefined): DocumentFragment {
    const fragment = new DocumentFragment();
    const filterController = new FilterControler();
    console.log(optionView);
    if (data.length > 0) {
      const mainArticle = elementGenerator.createHTMLElement('article', { className: `product-list` });
      const viewSwitch = elementGenerator.createDiv({ className: 'view-switcher' });
      const fullSwitch = elementGenerator.createDiv({ className: 'view-switcher__full' });
      const partialSwitch = elementGenerator.createDiv({ className: 'view-switcher__partial' });

      if (optionView === 'partialview') {
        partialSwitch.classList.add('active');
        mainArticle.classList.add('partial-view');
      } else {
        fullSwitch.classList.add('active');
      }

      viewSwitch.append(fullSwitch, partialSwitch);

      viewSwitch.addEventListener('click', (e) => {
        if (e.target === fullSwitch && !fullSwitch.classList.contains('active')) {
          fullSwitch.classList.add('active');
          partialSwitch.classList.remove('active');
          mainArticle.classList.remove('partial-view');
          filterController.removeFilter('view', '*');
        }
        if (e.target === partialSwitch && !partialSwitch.classList.contains('active')) {
          fullSwitch.classList.remove('active');
          partialSwitch.classList.add('active');
          mainArticle.classList.add('partial-view');
          filterController.addFilter('view', 'partialview', true);
        }
      });

      mainArticle.append(viewSwitch);

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

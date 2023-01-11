import { IProduct } from '../../../type';
import Router from '../../controller/router';
import { elementGenerator } from '../../controller/taggenerator';
import { SingleProduct } from '../../element/singleProduct';

export class SingleProductCatalog extends SingleProduct {
  constructor(item: IProduct, isIncrease: boolean) {
    super(item, isIncrease);
  }

  createProduct(): HTMLDivElement {
    const cartLS = this._localStorage.getLSCart().find((e) => e.id === this.item.id);
    this._productAdded = cartLS ? true : false;
    const className: string = this._productAdded ? 'in-cart' : '';

    const product = elementGenerator.createDiv({ className: `single-product ${className}` });
    const prodInfoWrap = elementGenerator.createDiv({ className: 'single-product__info' });

    const blockAddRemove = elementGenerator.createDiv({ className: 'block-add-remove' });
    blockAddRemove.append(this.tagList.addToCart, this.tagList.removeFromCart);

    product.addEventListener('click', (e) => {
      if (e.target === this.tagList.removeFromCart) {
        if (!this._isIncrease) {
          product.classList.toggle('in-cart');
        }
        this.removeProduct(this.item.id);
      } else if (e.target === this.tagList.addToCart) {
        if (!this._isIncrease) {
          product.classList.toggle('in-cart');
        }
        this.addProduct(this.item);
      } else {
        Router.getInstance().route(e, `/product/${this.item.id}`);
      }
    });

    prodInfoWrap.append(
      this.tagList.title,
      this.tagList.category,
      this.tagList.brand,
      this.tagList.rating,
      this.tagList.stock,
      this.tagList.price,
      this.tagList.discount,
      blockAddRemove,
      this.tagList.goToSingle
    );

    product.append(this.tagList.image, prodInfoWrap);
    return product;
  }
}

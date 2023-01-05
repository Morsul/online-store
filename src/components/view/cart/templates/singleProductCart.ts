import Router from '../../../controller/router';
import { elementGenerator } from '../../../controller/taggenerator';
import { SingleProduct } from '../../../element/singleProduct';
import { IProduct } from '../../../../type';

export class SingleProductCart extends SingleProduct {
  constructor(item: IProduct, isIncrease: boolean) {
    super(item, isIncrease);
    this._productAdded = true;
  }

  createProduct(index?: number) {
    const cartLS = this._localStorage.getLSCart().find((e) => e.id === this.item.id);

    const product = elementGenerator.createDiv({ className: `single-product in-cart` });
    const prodInfoWrap = elementGenerator.createDiv({ className: 'single-product__info' });
    const productNumber = elementGenerator.createDiv({ text: index?.toString(), className: 'single-product_number' });

    const blockAddRemove = elementGenerator.createDiv({ className: 'block-add-remove' });
    const productCount = elementGenerator.createParagraph({
      text: `${cartLS ? cartLS.count : 0}`,
      className: 'product-count',
    });

    blockAddRemove.append(this.tagList.addToCart, productCount, this.tagList.removeFromCart);

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
    /*
    window.addEventListener('storage', () => {
      // todo multiple calls ?!
      console.log('dkf');
      const f = this._localStorage.getLSCart().find((e) => e.id === this.item.id);
      productCount.innerText = `${f ? f.count : '0'}`;
    });
    */
    prodInfoWrap.append(
      this.tagList.title,
      this.tagList.description,
      this.tagList.category,
      this.tagList.brand,
      this.tagList.rating,
      this.tagList.stock,
      this.tagList.price,
      this.tagList.discount,
      blockAddRemove,
      this.tagList.goToSingle
    );

    product.append(productNumber, this.tagList.image, prodInfoWrap);
    return product;
  }
}

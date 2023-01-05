import Router from '../../controller/router';
import { elementGenerator } from '../../controller/taggenerator';
import { SingleProduct } from '../../element/singleProduct';
import { IProduct } from '../../../type';

export class SingleProductView extends SingleProduct {
  constructor(item: IProduct, isIncrease: boolean) {
    super(item, isIncrease);
    this._productAdded = false;
  }

  createProduct() {
    const cartLS = this._localStorage.getLSCart().find((e) => e.id === this.item.id);
    this._productAdded = cartLS ? true : false;
    const className: string = this._productAdded ? 'in-cart' : '';
    const product = elementGenerator.createDiv({ className: `product-view ${className}` });
    const prodInfoWrap = elementGenerator.createDiv({ className: 'product-view__info' });

    const blockAddRemove = elementGenerator.createDiv({ className: 'block-add-remove' });

    blockAddRemove.append(this.tagList.addToCart, this.tagList.removeFromCart);

    blockAddRemove.addEventListener('click', (e) => {
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
      }
    });

    const buyButton = elementGenerator.createParagraph({ className: `button button-to-cart`, text: 'Buy product' });

    buyButton.addEventListener('click', () => {
      this.addProduct(this.item);
      Router.getInstance().routeDefault('/cart', 'modal=1');
    });

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
      buyButton
    );

    const imageBlock = elementGenerator.createDiv({ className: 'product-view__images' });
    const imageList = elementGenerator.createDiv({ className: 'product-view__images-list' });
    this.tagList.image.classList.add('produc-view__main-image');

    this.item.images.forEach((e) => {
      const image = elementGenerator.createImg(`${e}`, {});
      imageList.append(image);
    });
    imageBlock.append(imageList, this.tagList.image);
    imageList.addEventListener('click', (e) => this.updateImage(e.target));

    const breadcrumbs = elementGenerator.createParagraph({ className: 'breadcrumbs' });
    const homebc = elementGenerator.createSpan({ text: `Store` });
    const otherbc = elementGenerator.createSpan({
      text: ` / ${this.item.category}  / ${this.item.category} / ${this.item.title}`,
    });
    homebc.addEventListener('click', (e: Event): void => Router.getInstance().route(e, '/'));
    breadcrumbs.append(homebc, otherbc);

    product.append(breadcrumbs, imageBlock, prodInfoWrap);
    return product;
  }

  private updateImage(sourceTarget: EventTarget | null) {
    if (sourceTarget instanceof HTMLImageElement) {
      this.tagList.image.src = sourceTarget.src;
    }
  }
}

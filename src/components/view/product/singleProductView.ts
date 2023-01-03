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

    const product = elementGenerator.createDiv({ className: `product-view` });
    const prodInfoWrap = elementGenerator.createDiv({ className: 'product-view__info' });

    const blockAddRemove = elementGenerator.createDiv({ className: 'block-add-remove' });
    const productCount = elementGenerator.createParagraph({
      text: `${cartLS ? cartLS.count : 0}`,
      className: 'product-count',
    });

    blockAddRemove.append(this.tagList.addToCart, productCount, this.tagList.removeFromCart);

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

    window.addEventListener('storage', () => {
      const f = this._localStorage.getLSCart().find((e) => e.id === this.item.id);
      productCount.innerText = `${f ? f.count : '0'}`;
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

    product.append(imageBlock, prodInfoWrap);
    return product;
  }

  private updateImage(sourceTarget: EventTarget | null) {
    if (sourceTarget instanceof HTMLImageElement) {
      this.tagList.image.src = sourceTarget.src;
    }
  }
}
// присутствует кнопка быстрой покупки товара. При клике, если товара нет в корзине, происходит автоматическое добавление в корзину и переход на страницу корзины, с уже открытым модальным окном. Если товар уже был в корзине, повторное добавление не требуется +5
// Router.getInstance().routeDefault('/cart', 'modal=1');

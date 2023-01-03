import { IProduct } from '../../type';
import { elementGenerator } from '../controller/taggenerator';
import Router from '../controller/router';
import { ILocalStorageproduct, ISingleProductTag } from '../../type';
import { LocalStorageManager } from '../controller/localStorage';

export class SingleProduct {
  protected _productAdded: boolean;
  protected _localStorage;
  protected _isIncrease: boolean;
  private _tagList: ISingleProductTag;
  private _item: IProduct;

  constructor(item: IProduct, isIncrease: boolean) {
    this._productAdded = false;
    this._localStorage = new LocalStorageManager();
    this._isIncrease = isIncrease;
    this._item = item;

    this._tagList = {
      image: elementGenerator.createImg(item.thumbnail, { alt: item.title }),
      title: elementGenerator.createParagraph({ text: `${item.title}`, className: 'product-title' }),
      description: elementGenerator.createParagraph({
        text: `${item.description}`,
        className: 'cart_list-description',
      }),
      category: elementGenerator.createParagraph({ text: `Category: ${item.category}` }),
      brand: elementGenerator.createParagraph({ text: `Brand: ${item.brand}` }),
      rating: elementGenerator.createParagraph({ text: `Rating: ${item.rating} ` }),
      stock: elementGenerator.createParagraph({ text: `Stock: ${item.stock} ` }),
      price: elementGenerator.createParagraph({ text: `Price: ${item.price} `, className: 'product-price' }),
      discount: elementGenerator.createParagraph({ text: `Discount: ${item.discount} %` }),
      addToCart: elementGenerator.createParagraph({
        className: 'button add-to-cart',
        text: this._isIncrease ? '+' : 'Add to cart',
      }),
      removeFromCart: elementGenerator.createParagraph({
        className: 'button remove-from-cart',
        text: this._isIncrease ? '-' : 'Remove from cart',
      }),
      goToSingle: elementGenerator.createParagraph({
        className: 'button button_view',
        text: 'View Product',
      }),
    };
  }

  get tagList() {
    return this._tagList;
  }

  get item() {
    return this._item;
  }

  protected addProduct(arg: IProduct): void {
    const cartLocal: Array<ILocalStorageproduct> = this._localStorage.getLSCart();

    if (this._productAdded) {
      cartLocal.forEach((e) => {
        if (e.id === arg.id && e.count < arg.stock) {
          e.count += 1;
        }
      });
    } else {
      cartLocal.push({
        id: arg.id,
        count: 1,
        price: arg.price,
        discount: arg.discount,
      });
    }
    this._productAdded = true;
    localStorage.setItem('SACart', JSON.stringify(cartLocal));
    window.dispatchEvent(new Event('storage'));
  }
  protected removeProduct(id: string): void {
    //todo remove return
    const cartLocal: Array<ILocalStorageproduct> = this._localStorage.getLSCart();
    let t = -1;

    if (cartLocal.length > 0) {
      cartLocal.forEach((e, i) => {
        if (e.id === id) {
          e.count -= 1;
          if (!this._isIncrease) {
            e.count = 0;
          }
        }
        if (e.count <= 0) {
          t = i;
        }
      });
    }

    if (t >= 0) {
      cartLocal.splice(t, 1);
      this._productAdded = false;
    }

    localStorage.setItem('SACart', JSON.stringify(cartLocal));
    window.dispatchEvent(new Event('storage'));
    if (!this._productAdded && this._isIncrease) {
      Router.getInstance().routeDefault(`/cart`);
    }
  }

  public createProduct(): HTMLDivElement {
    const product = elementGenerator.createDiv({});
    product.append(
      this.tagList.title,
      this.tagList.description,
      this.tagList.category,
      this.tagList.brand,
      this.tagList.rating,
      this.tagList.stock,
      this.tagList.price,
      this.tagList.discount,
      this.tagList.goToSingle
    );
    return product;
  }
}

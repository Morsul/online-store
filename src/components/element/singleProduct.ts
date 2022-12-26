import { IProduct } from "../../basic";
import { elementGenerator } from "../controller/taggenerator";
import Router from "../controller/router";
import { ILocalStorageproduct } from "../../basic";
import { LocalStorageManager } from "../controller/localStorage";

export class SingleProduct {
  private _productAdded: boolean ;
  private _localStorage;
  private _isIncrease: boolean;
  constructor() {
    this._productAdded = false;
    this._localStorage = new LocalStorageManager();
    this._isIncrease = false;
  }

  createProduct(item: IProduct, index: number, isIncrease: boolean): HTMLDivElement {
    this._isIncrease = isIncrease;
    const cartLS: ILocalStorageproduct | undefined = this._localStorage.getLSCart().find((e: ILocalStorageproduct) => e.id === item.id);
    this._productAdded = cartLS ? true : false;
    const className: string = this._productAdded ? "in-cart" : "";

    const product = elementGenerator.createDiv({className: `single-product ${className}`});
    const productNumber = elementGenerator.createDiv({text: index.toString(),className: 'single-product_number'});
    const productImage = elementGenerator.createImg(item.thumbnail, {alt: item.title});
    const prodInfoWrap = elementGenerator.createDiv({className: "single-product__info"});

    const productTitle = elementGenerator.createParagraph({text: `${item.title}`, className: 'product-title'});
    const productDescription = elementGenerator.createParagraph({text: `${item.description}`, className: 'cart_list-description'});
    const productCategory = elementGenerator.createParagraph({text: `Category: ${item.category}`});
    const productBrand = elementGenerator.createParagraph({text: `Brand: ${item.brand}`});
    const productRating = elementGenerator.createParagraph({text: `Rating: ${item.rating} `});
    const productStock = elementGenerator.createParagraph({text: `Stock: ${item.stock} `});
    const productPrice = elementGenerator.createParagraph({text: `Price: ${item.price} `, className: 'product-price'});
    const productDiscount = elementGenerator.createParagraph({text: `Discount: ${item.discount} %`}); 
    
    const addToCart = elementGenerator.createParagraph({className: 'button add-to-cart',text: this._isIncrease ? '+' : 'Add to cart'});
    const countLS = cartLS?.count;
    const productCount = elementGenerator.createParagraph({text: `${countLS ? countLS : 0}`, className: 'product-count'});
    const removeFromCart = elementGenerator.createParagraph({className: 'button remove-from-cart', text: this._isIncrease ? '-' : 'Remove from cart'});
    const blockAddRemove = elementGenerator.createDiv({className: 'block-add-remove'});
    blockAddRemove.append(addToCart, productCount, removeFromCart);
    const goToSingle = elementGenerator.createParagraph({className: 'button button_view', text: 'View Product'});
    
    product.addEventListener('click', (e)=> {
      if (e.target === removeFromCart){
        if (!this._isIncrease) {
          product.classList.toggle('in-cart');
        }
        productCount.innerHTML = this.removeProduct(item.id).toString();
      } else if (e.target === addToCart){
        if (!this._isIncrease) {
          product.classList.toggle('in-cart');
        }
        productCount.innerHTML = this.addProduct({id: item.id, price: item.price, discount: item.discount}).toString();
      }else {
        Router.getInstance().route(e, `/product/${item.id}`)
      }
    });

    prodInfoWrap.append(productTitle, productDescription, productCategory, productBrand, productRating, productStock, productPrice, productDiscount, blockAddRemove, goToSingle);

    product.append(productNumber, productImage, prodInfoWrap)
    return product;
  }

  private addProduct(arg: Omit<ILocalStorageproduct, "count">): number {
    const cartLocal: Array<ILocalStorageproduct> = this._localStorage.getLSCart();
    let countProduct = 0;
    if (this._productAdded) {
      cartLocal.forEach(e=> {
        if(e.id === arg.id) {
          e.count += 1;
          countProduct = e.count;
        }
      });
    } else {
      countProduct = 1;
      cartLocal.push({
        id: arg.id,
        count: 1,
        price: arg.price,
        discount: arg.discount
      })
    }

    localStorage.setItem("SACart", JSON.stringify(cartLocal));
    window.dispatchEvent( new Event('storage') );
    return countProduct;
  }
  
  private removeProduct(id: string): number {
    const cartLocal: Array<ILocalStorageproduct> = this._localStorage.getLSCart();
    let t = -1;
    let countProduct = 1;

    if (cartLocal.length > 0) {
      cartLocal.forEach((e, i) => {
        if(e.id === id) {
          e.count -= 1;
          if (!this._isIncrease) {
            e.count = 0;
          }
          countProduct = e.count;
        }
        if(e.count <= 0) {
          t = i;
        }
      });
    }

    if (t >= 0){
      cartLocal.splice(t,1);
      this._productAdded = false;
    }

    localStorage.setItem("SACart", JSON.stringify(cartLocal));
    window.dispatchEvent( new Event('storage') );
    if (!this._productAdded && this._isIncrease) {
      Router.getInstance().routeDefault(`/cart`);
    }
    return countProduct;
  }

}
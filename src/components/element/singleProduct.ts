import { IProduct } from "../../basic";
import { elementGenerator } from "../controller/taggenerator";
import Router from "../controller/router";
import { ILocalStorageproduct, ISingleProductTag} from "../../basic";
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

  private createProductTags=(item: IProduct, isIncrease?: boolean): ISingleProductTag =>{
    const tagList: ISingleProductTag = {
      image: elementGenerator.createImg(item.thumbnail, {alt: item.title}),

      title: elementGenerator.createParagraph({text: `${item.title}`, className: 'product-title'}),
      description:  elementGenerator.createParagraph({text: `${item.description}`, className: 'cart_list-description'}),
      category: elementGenerator.createParagraph({text: `Category: ${item.category}`}),
      brand: elementGenerator.createParagraph({text: `Brand: ${item.brand}`}),
      rating: elementGenerator.createParagraph({text: `Rating: ${item.rating} `}),
      stock: elementGenerator.createParagraph({text: `Stock: ${item.stock} `}),
      price: elementGenerator.createParagraph({text: `Price: ${item.price} `, className: 'product-price'}),
      discount: elementGenerator.createParagraph({text: `Discount: ${item.discount} %`}),

      addToCart: elementGenerator.createParagraph({className: 'button add-to-cart',text: isIncrease ? '+' : 'Add to cart'}),
      removeFromCart: elementGenerator.createParagraph({className: 'button remove-from-cart', text: isIncrease ? '-' : 'Remove from cart'}),
      goToSingle: elementGenerator.createParagraph({className: 'button button_view', text: 'View Product'}),
    };    
    return tagList;
  }

  createProductInCart(item: IProduct, index: number, isIncrease: boolean){
    const tagList = this.createProductTags(item, isIncrease);
    this._productAdded = true;
    this._isIncrease = isIncrease;
    const cartLS = this._localStorage.getLSCart().find((e)=> e.id === item.id);

    const product = elementGenerator.createDiv({className: `single-product in-cart`});
    const prodInfoWrap = elementGenerator.createDiv({className: "single-product__info"});
    const productNumber = elementGenerator.createDiv({text: index.toString(), className: 'single-product_number'});

    const blockAddRemove = elementGenerator.createDiv({className: 'block-add-remove'});
    const productCount = elementGenerator.createParagraph({text: `${cartLS ? cartLS.count: 0}` ,className: 'product-count'});

    blockAddRemove.append(tagList.addToCart, productCount, tagList.removeFromCart); 
    
    product.addEventListener('click', (e)=> {
      if (e.target === tagList.removeFromCart){
        if (!this._isIncrease) {
          product.classList.toggle('in-cart');
        }
        this.removeProduct(item.id)
      } else if (e.target === tagList.addToCart){
        if (!this._isIncrease) {
          product.classList.toggle('in-cart');
        }
        this.addProduct({id: item.id, price: item.price, discount: item.discount})
      }else {
        Router.getInstance().route(e, `/product/${item.id}`)
      }
    });

    window.addEventListener('storage', ()=> { // todo multiple calls ?!
      const f = this._localStorage.getLSCart().find((e)=> e.id === item.id)
      productCount.innerText = `${f ? f.count : '0'}`
    });

    prodInfoWrap.append(tagList.title, tagList.description, tagList.category, tagList.brand, tagList.rating, tagList.stock, tagList.price, tagList.discount, blockAddRemove, tagList.goToSingle);

    product.append(productNumber, tagList.image, prodInfoWrap)
    return product;
  }

  createProduct(item: IProduct): HTMLDivElement {
    const tagList = this.createProductTags(item);
    const cartLS = this._localStorage.getLSCart().find((e)=> e.id === item.id);
    this._productAdded = cartLS ? true : false;
    const className: string = this._productAdded ? "in-cart" : "";

    const product = elementGenerator.createDiv({className: `single-product ${className}`});
    const prodInfoWrap = elementGenerator.createDiv({className: "single-product__info"});

    const blockAddRemove = elementGenerator.createDiv({className: 'block-add-remove'});
    blockAddRemove.append(tagList.addToCart, tagList.removeFromCart);

    
    product.addEventListener('click', (e)=> {
      if (e.target === tagList.removeFromCart){
        if (!this._isIncrease) {
          product.classList.toggle('in-cart');
        }
        this.removeProduct(item.id)
      } else if (e.target === tagList.addToCart){
        if (!this._isIncrease) {
          product.classList.toggle('in-cart');
        }
        this.addProduct({id: item.id, price: item.price, discount: item.discount})
      }else {
        Router.getInstance().route(e, `/product/${item.id}`)
      }
    });

    prodInfoWrap.append(tagList.title, tagList.description, tagList.category, tagList.brand, tagList.rating, tagList.stock, tagList.price, tagList.discount, blockAddRemove, tagList.goToSingle);

    product.append(tagList.image, prodInfoWrap)
    return product;
  }

  private addProduct(arg: Omit<ILocalStorageproduct, "count">): void {
    const cartLocal: Array<ILocalStorageproduct> = this._localStorage.getLSCart();
    if (this._productAdded) {
      cartLocal.forEach(e=> {
        if(e.id === arg.id) {
          e.count += 1;
        }
      });
    } else {
      // countProduct = 1;
      cartLocal.push({
        id: arg.id,
        count: 1,
        price: arg.price,
        discount: arg.discount
      })
    }

    localStorage.setItem("SACart", JSON.stringify(cartLocal));
    window.dispatchEvent( new Event('storage') );
  }
  
  private removeProduct(id: string): void { //todo remove return
    const cartLocal: Array<ILocalStorageproduct> = this._localStorage.getLSCart();
    let t = -1;

    if (cartLocal.length > 0) {
      cartLocal.forEach((e, i) => {
        if(e.id === id) {
          e.count -= 1;
          if (!this._isIncrease) {
            e.count = 0;
          }
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
  }

}
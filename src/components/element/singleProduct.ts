import { IProduct } from "../../basic";
import { elementGenerator } from "../controller/taggenerator";
import Router from "../controller/router";
import { ILocalStorageproduct } from "../../basic";
import { localStorageManager } from "../controller/localStorage";

export class SingleProduct {
  private _productAdded: boolean ;
  private _localStorage;
  constructor(){
    this._productAdded = false;
    this._localStorage = new localStorageManager();
  }

  createProduct(item: IProduct):HTMLDivElement{
    this._productAdded = this._localStorage.getLSCart().find((e)=>{return e.id === item.id}) === undefined ? false : true;
    const className: string = this._productAdded? "in_cart": "";

    const product = elementGenerator.createDiv({className: `single_product ${className}`});
    const productImage = elementGenerator.createImg(item.thumbnail,{alt: item.title});
    const prodInfoWrap = elementGenerator.createDiv({className: "single_product__info"});

    const productTitle = elementGenerator.createParagraph({text: `Title: ${item.title}`});
    const productRating = elementGenerator.createParagraph({text: `Rating: ${item.rating} `});
    const productStock = elementGenerator.createParagraph({text: `Stock: ${item.stock} `});
    const productPrice = elementGenerator.createParagraph({text: `Price: ${item.price} `});
    const productDiscount = elementGenerator.createParagraph({text: `Discount: ${item.discountPercentage} %`});
    
    const addToCart = elementGenerator.createParagraph({className: 'button add_to_cart',text: 'Add to cart'});
    const removeFromCart = elementGenerator.createParagraph({className: 'button remove_from_cart', text: 'Remove from cart'});
    const goToSingle = elementGenerator.createParagraph({className: 'button', text: 'View Product'});
    
    product.addEventListener('click', (e)=>{
      if (e.target === removeFromCart){
        product.classList.toggle('in_cart');
        this._removeProduct(item.id)
      } else if (e.target === addToCart){
        product.classList.toggle('in_cart');
        this._addProduct({id: item.id, price: item.price, discountPercentage: item.discountPercentage});
      }else {
        Router.getInstance().route(e, `/products/${item.id}`)
      }
    });

    prodInfoWrap.append(productTitle, productRating, productStock, productPrice, productDiscount, addToCart, removeFromCart, goToSingle);

    product.append(productImage, prodInfoWrap)
    return product;
  }

  private _addProduct(arg: Omit<ILocalStorageproduct, "count">): void{
    const cartLocal: Array<ILocalStorageproduct> = this._localStorage.getLSCart();   
    if (this._productAdded){
      cartLocal.forEach(e=>{
        if(e.id === arg.id){
          e.count += 1;
        }
      })
    } 

    if (!this._productAdded){
      cartLocal.push({
        id: arg.id,
        count: 1,
        price: arg.price,
        discountPercentage: arg.discountPercentage
      })
    }

    localStorage.setItem("SACart", JSON.stringify(cartLocal));
    window.dispatchEvent( new Event('storage') )
  }
  
  private _removeProduct(id: string): void{
    const cartLocal: Array<ILocalStorageproduct> = this._localStorage.getLSCart();
    let t = -1;
    if (cartLocal.length>0){
      cartLocal.forEach((e, i)=>{
        if(e.id === id){
          e.count -= 1;
        }
        if(e.count <= 0){
          t = i;
        }
      })
    }
    if (t >= 0){
      cartLocal.splice(t,1);
      this._productAdded = false;
    }
    localStorage.setItem("SACart", JSON.stringify(cartLocal));
    window.dispatchEvent( new Event('storage') )
  }

}
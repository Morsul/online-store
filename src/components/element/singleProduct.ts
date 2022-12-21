import { IProduct } from "../../basic";
import { elementGenerator } from "../controller/taggenerator";
import Router from "../controller/router";

export class SingleProduct {
  createProduct(item: IProduct):HTMLDivElement{
    const product = elementGenerator.createDiv({className: "single_product"});
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
        console.log("remove from cart");
      } else if (e.target === addToCart){
        product.classList.toggle('in_cart');
        console.log("add to cart");
      }else {
        Router.getInstance().route(e, `/products/${item.id}`)
      }
    });

    prodInfoWrap.append(productTitle, productRating, productStock, productPrice, productDiscount, addToCart, removeFromCart, goToSingle);

    product.append(productImage, prodInfoWrap)

    return product;
  }
    
}
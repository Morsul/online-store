import { IProduct, View } from "../../../type";
import Router from "../../controller/router";
import { elementGenerator } from "../../controller/taggenerator";

class Product implements View {
  draw(data: IProduct): void {
    const div:HTMLDivElement = elementGenerator.createDiv({ text: data.title});
    const addCartBtn: HTMLDivElement = elementGenerator.createDiv({ text: 'add to cart', className: 'button' });
    addCartBtn.addEventListener('click', () => this.addCart());
    div.append(addCartBtn);
    data.images.forEach((value) => {
      const img: HTMLImageElement = elementGenerator.createImg(value, { alt: data.title });
      div.appendChild(img);
    });
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(div);
  }

  private addCart() {
    Router.getInstance().routeDefault('/cart', 'modal=1');
  }
}

export default Product;
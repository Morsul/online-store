import { View } from "../../../basic";

class Product implements View {
  draw(): void {
    const div:HTMLDivElement = document.createElement('div');
    div.innerHTML = 'Product';
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(div);
  }
}

export default Product;
import { IProduct, View } from "../../../basic";

class Product implements View {
  draw(data: IProduct): void {
    const div:HTMLDivElement = document.createElement('div');
    div.innerHTML = 'Product' + data;
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(div);
  }
}

export default Product;
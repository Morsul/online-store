import { IProduct, View } from '../../../type';

class Product implements View {
  draw(data: IProduct): void {
    const div: HTMLDivElement = document.createElement('div');
    div.innerHTML = `${data.title}`;
    data.images.forEach((value) => {
      const img: HTMLImageElement = document.createElement('img');
      img.src = value;
      img.alt = data.title;
      div.appendChild(img);
    });
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(div);
  }
}

export default Product;

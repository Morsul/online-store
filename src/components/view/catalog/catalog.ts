import { IProduct, View } from "../../../basic";
import Router from "../../controller/router";

class CatalogView implements View {
  draw(data: Array<IProduct>): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    
    data.forEach((item) => {
      const divprod:HTMLDivElement = document.createElement('div');

      divprod.innerHTML = `${item.id} - ${item.title} - ${item.category} - ${item.brand}`;
      divprod.addEventListener('click', (e) => Router.getInstance().route(e, `/product/${item.id}`));
      fragment.append(divprod);
  });
    (<HTMLElement>document.querySelector('.main')).innerHTML = 'Catalog';
    (<HTMLElement>document.querySelector('.main')).appendChild(fragment);
  }
}

export default CatalogView;
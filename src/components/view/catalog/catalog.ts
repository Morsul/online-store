import { IProduct, View } from "../../../basic";

class CatalogView implements View {
  draw(data: Array<IProduct>): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    
    data.forEach((item) => {
      const divprod:HTMLDivElement = document.createElement('div');

      divprod.innerHTML = `${item.id} - ${item.brand} - ${item.category}`;

      fragment.append(divprod);
  });
    (<HTMLElement>document.querySelector('.main')).innerHTML = 'Catalog';
    (<HTMLElement>document.querySelector('.main')).appendChild(fragment);
  }
}

export default CatalogView;
import { elementGenerator } from '../controller/taggenerator';
import { FilterControler } from '../controller/filterController';
import { IFilter } from '../../type';

export class ProductsHeadline {
  private _filtredProductCount: HTMLParagraphElement;
  private _search: HTMLInputElement;
  private _filterController: FilterControler;
  constructor() {
    this._filtredProductCount = elementGenerator.createParagraph({
      className: 'shown-count',
      text: 'Found 0 products',
    });
    this._search = elementGenerator.createInput('text', {
      className: 'search',
      placeholder: 'Type category or brand name',
    });
    this._filterController = new FilterControler();
  }

  createProdHeader(options?: IFilter): HTMLDivElement {
    const prodHeaderWrap = elementGenerator.createDiv({ className: 'products-headline' });

    if (options?.allsearch) {
      this._search.value = options.allsearch;
    }
    prodHeaderWrap.append(this._filtredProductCount, this.searchComponent());
    return prodHeaderWrap;
  }
  shownCount(number: number): void {
    this._filtredProductCount.innerText = `Found ${number} products`;
  }

  private overalSearch(): void {
    const val = this._search.value;
    if (val.length === 0) {
      this._filterController.removeFilter('allsearch', '*');
    } else {
      this._filterController.addFilter('allsearch', this._search.value, true);
    }
  }

  private searchComponent(): HTMLDivElement {
    const searchWrap = elementGenerator.createDiv({ className: 'search-wrap' });
    const searchLabel = elementGenerator.createLabel({ className: 'search-label' });

    searchLabel.addEventListener('click', () => {
      this._search.value = '';
      this.overalSearch();
    });

    this._search.addEventListener('keyup', () => this.overalSearch());

    searchWrap.append(this._search, searchLabel);

    return searchWrap;
  }
}

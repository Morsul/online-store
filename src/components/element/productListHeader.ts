import { elementGenerator } from '../controller/taggenerator';
import { FilterControler } from '../controller/filterController';
import { IFilter, SortType } from '../../type';

export class ProductsHeadline {
  private _filtredProductCount: HTMLParagraphElement;
  private _search: HTMLInputElement;
  private _filterController: FilterControler;
  private _sortPrice: HTMLParagraphElement;
  private _sortStock: HTMLParagraphElement;
  constructor() {
    this._sortPrice = elementGenerator.createParagraph({ className: 'sorting__price', text: 'Sort by price' });
    this._sortStock = elementGenerator.createParagraph({ className: 'sorting__count', text: 'Sort by stock' });
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
    if (options?.sort) {
      const s = options?.sort.split('-');
      if (s[0] === 'stock') {
        this._sortStock.classList.add(s[1]);
      }
      if (s[0] === 'price') {
        this._sortPrice.classList.add(s[1]);
      }
    }
    const sortWrap = elementGenerator.createDiv({ className: 'sorting sorting-wrap' });
    sortWrap.addEventListener('click', (e) => {
      this.updateSorting(e.target);
    });

    sortWrap.append(this._sortPrice, this._sortStock);

    prodHeaderWrap.append(sortWrap, this._filtredProductCount, this.searchComponent());
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

    this._search.addEventListener('keyup', () => {
      this.overalSearch();
    });

    searchWrap.append(this._search, searchLabel);

    return searchWrap;
  }

  private updateSorting(e: EventTarget | null) {
    if (e === this._sortPrice) {
      if (this._sortPrice.classList.contains(SortType.DESC)) {
        this._sortPrice.className = `sorting__price`;
        this._filterController.removeFilter('sort', '*');
      } else if (this._sortPrice.classList.contains(SortType.ASC)) {
        this._sortPrice.className = `sorting__price ${SortType.DESC}`;
        this._filterController.addFilter('sort', `price-${SortType.DESC}`, true);
      } else {
        this._sortPrice.className = `sorting__price ${SortType.ASC}`;
        this._filterController.addFilter('sort', `price-${SortType.ASC}`, true);
      }

      this._sortStock.className = 'sorting__count';
    }
    if (e === this._sortStock) {
      if (this._sortStock.classList.contains(SortType.DESC)) {
        this._sortStock.className = `sorting__count`;
        this._filterController.removeFilter('sort', '*');
      } else if (this._sortStock.classList.contains(SortType.ASC)) {
        this._sortStock.className = `sorting__count ${SortType.DESC}`;
        this._filterController.addFilter('sort', `stock-${SortType.DESC}`, true);
      } else {
        this._sortStock.className = `sorting__count ${SortType.ASC}`;
        this._filterController.addFilter('sort', `stock-${SortType.ASC}`, true);
      }
      this._sortPrice.className = 'sorting__price';
    }
  }
}

export interface View {
  draw(date: Array<IProduct> | IProduct): void;
}

export interface Callback<T> {
  (data: T, options?: IFilter): void;
}
export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}

export interface ICatalog {
  products: Array<IProduct>;
}

export interface ISearchProducts {
  category?: Array<string>;
}

export interface IFilter {
  product?: string;
  category?: string;
  brand?: string;
  price?: string;
  stock?: string;
  sort?: string;
  allsearch?: string;
}

export enum SortType {
  DESC = 'desc',
  ASC = 'asc',
}

export interface ILocalStorageproduct extends Pick<IProduct, 'id' | 'price' | 'discount'> {
  count: number;
}

export interface IPromoCode {
  id: string;
  title: string;
  discount: number;
}
export interface ISingleProductTag {
  image: HTMLImageElement;
  title: HTMLParagraphElement;
  description: HTMLParagraphElement;
  category: HTMLParagraphElement;
  brand: HTMLParagraphElement;
  rating: HTMLParagraphElement;
  stock: HTMLParagraphElement;
  price: HTMLParagraphElement;
  discount: HTMLParagraphElement;
  addToCart: HTMLParagraphElement;
  removeFromCart: HTMLParagraphElement;
  goToSingle: HTMLParagraphElement;
}

export interface IFilterInfo {
  brandFilter: string[];
  categoryFilter: string[];
}

export interface ISaticData {
  price: number[];
  stock: number[];
  avalaiblePrice: number[];
  abalaibleStock: number[];
  categoryInfo: Map<string, number[]>;
  brandInfo: Map<string, number[]>;
}

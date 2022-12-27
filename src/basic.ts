export interface View {
  draw(date: Array<IProduct> | IProduct): void;
}

export interface Callback<T> {
  (data: T, options?: IFilter): void;
}
export interface IProduct {
  id: string,
  title: string,
  description: string,
  price: number,
  discount: number,
  rating: number,
  stock: number,
  brand: string,
  category: string,
  thumbnail: string,
  images: Array<string>
}

export interface ICatalog {
  products: Array<IProduct>
}

export interface ISearchProducts {
  category?: Array<string>
}

export interface IFilter {
  product?: string,
  category?: string,
  brand?: string;
  price?: string,
  stock?: string
  sort?: string,
  allsearch?: string,
}

export enum SortType { DESC = 'DESC', ASC = 'ASC'}

export interface ILocalStorageproduct extends Pick<IProduct, "id" | "price" | "discount"> {
  count: number; 
}

export interface IFilterInfo{
  brandFilter: string[];
  categoryFilter: string[]
}

export interface ISaticData{
  price: number[],
  stock: number[]
}
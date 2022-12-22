// import { IProduct } from "../../basic";
import { elementGenerator } from "../controller/taggenerator";
// import { SingleProduct } from "./singleproduct";  

export class FilterList {
  createFilterList(): DocumentFragment {
  const fragment = new DocumentFragment();
  const filterAside = elementGenerator.createHTMLElement('aside', {className: "filter_list"});

  // data.forEach((item) => {
  //   filterAside.append(SingleProduct(item));
  // });

  fragment.append(filterAside)
  return fragment;
  }
}
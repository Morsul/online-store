import { elementGenerator } from "../controller/taggenerator";

export class SummaryCart {
  createSummeryCart(): DocumentFragment {
    const fragment = new DocumentFragment();
    const filterAside = elementGenerator.createHTMLElement('aside', {className: "summary_cart"});
  
    fragment.append(filterAside)
    return fragment;
    }

}
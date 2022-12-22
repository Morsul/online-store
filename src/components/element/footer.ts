import { elementGenerator } from "../controller/taggenerator";

export class Footer{
  createFooter(): DocumentFragment{    
    const fragment = new DocumentFragment();

    const footer = elementGenerator.createHTMLElement('footer',{});

    fragment.append(footer)
    return fragment;
  }
}
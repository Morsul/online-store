import { elementGenerator } from "../controller/taggenerator";

export class Footer{
  createFooter(): HTMLElement{
    const footer = elementGenerator.createHTMLElement('footer',{});
    return footer;
  }
}
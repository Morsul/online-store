import { LocalStorageManager } from "../../controller/localStorage";
import Router from "../../controller/router";
import { elementGenerator } from "../../controller/taggenerator";

export class PurchaseDone {

  createWindow(): DocumentFragment {
    (new LocalStorageManager()).clearLSCart();
    const msg: DocumentFragment = new DocumentFragment();
    window.dispatchEvent( new Event('storage') );
    const thankMsg = elementGenerator.createHeading('h2', { text: 'Thanks for your order', className: 'window_title' });
    const redirectMsg = elementGenerator.createParagraph({ text: 'Redirect to the store after 3 sec'});
    setTimeout(() => {
      Router.getInstance().routeDefault('/');
    }, 3000);
    msg.append(thankMsg, redirectMsg);
    return msg;
  }

}
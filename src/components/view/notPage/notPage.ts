import { View } from "../../../type";
import { elementGenerator } from "../../controller/taggenerator";

class NotPage implements View {
  draw(): void {
    const title:HTMLDivElement = elementGenerator.createHeading('h2', { text: 'Error: 404', className: 'title-page' });
    (<HTMLElement>document.querySelector('.main')).innerHTML = '';
    (<HTMLElement>document.querySelector('.main')).appendChild(title);
  }
}

export default NotPage;
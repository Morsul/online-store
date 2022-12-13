import './index.css'
import {divClassName} from './basic'
function component() {
  const element = document.createElement('div');
  const elementClass:divClassName = {className: "hello"};

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = "test"
  element.classList.add(elementClass.className);

  return element;
}

document.body.appendChild(component());
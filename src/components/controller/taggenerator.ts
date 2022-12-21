interface optional {
  id?: string;
  className?: string;
  text?: string;
  alt?: string;
  for?: string;
}

interface inputOptions extends Omit<optional, "for" | "alt">{
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
  value?: string;
  disabled?: string;
}

const applySelector = (element: HTMLElement, options: Pick<optional, "className" | "id">): void => {
  if (options.className) {
    element.className = options.className;
  }
  if (options.id) {
    element.setAttribute('id', options.id);
  }
}

const createImg = (src: string, options: Pick<optional, "className" | "id" | "alt">): HTMLImageElement => {
  const img = document.createElement('img');
  applySelector(img, {className: options.className, id: options.id});

  img.src = src;

  if (options.alt) {
    img.setAttribute('alt', options.alt);
  }

  return img;
}

const createLink = (href: string, options: Pick<optional, "className" | "id">): HTMLAnchorElement => {
  const link = document.createElement('a');
  applySelector(link, {className: options.className, id: options.id});
  link.setAttribute('href', href);
  return link;
}

const createDiv = (options: Pick<optional, "className" | "id" | "text">): HTMLDivElement =>{
  const divTag = document.createElement(`div`);
  applySelector(divTag, {className: options.className, id: options.id});
  if(options.text){
    divTag.innerHTML = options.text;
  }  
  return divTag;
}

const createParagraph = (options: Pick<optional, "className" | "id" | "text">): HTMLParagraphElement =>{
  const paragraphTag = document.createElement(`p`);
  applySelector(paragraphTag, {className: options.className, id: options.id});
  if(options.text){
    paragraphTag.innerHTML = options.text;
  }  
  return paragraphTag;
}

const createLabel = (options: Pick<optional, "className" | "id" | "text" | "for">): HTMLLabelElement =>{
  const labelTag = document.createElement(`label`); 
  applySelector(labelTag, {className: options.className, id: options.id});
  if(options.for){
    labelTag.setAttribute('for', options.for);
  }
  if(options.text){
    labelTag.innerHTML = options.text;
  }  
  return labelTag;
}

const createInput = (type: string, options: inputOptions):HTMLInputElement =>{
  const input = document.createElement(`input`); 
  input.type = type;
  applySelector(input, {className: options.className, id: options.id});
  if(options.disabled){
    input.setAttribute('disabled', options.disabled);
  }
  if(options.placeholder){
    input.setAttribute('placeholder', options.placeholder);
  }
  if(options.min && options.max && options.value){
    input.setAttribute('min', options.min);
    input.setAttribute('max', options.max);
    input.setAttribute('value', options.value);
    if(options.step){
      input.setAttribute('step', options.step);
    }
  }

  return input;
}

const createHTMLElement = (tagName: string ,options: Pick<optional, "className" | "id">): HTMLElement =>{
  const HTMLElement = document.createElement(tagName);
  applySelector(HTMLElement, {className: options.className, id: options.id});
  return HTMLElement;
}

export const elementGenerator = {
  createImg,
  createLink,
  createDiv,
  createParagraph,
  createLabel,
  createInput,
  createHTMLElement,
}

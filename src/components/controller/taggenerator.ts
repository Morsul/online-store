interface IOptional {
  id?: string;
  className?: string;
  text?: string;
  alt?: string;
  for?: string;
}

interface IInputOptions extends Omit<IOptional, "for" | "alt"> {
  placeholder?: string;
  min?: string;
  max?: string;
  step?: string;
  value?: string;
  disabled?: string;
}

const applySelector = (element: HTMLElement, options: Pick<IOptional, "className" | "id">): void => {
  if (options.className) {
    element.className = options.className;
  }
  if (options.id) {
    element.setAttribute('id', options.id);
  }
}

const createImg = (src: string, options: Pick<IOptional, "className" | "id" | "alt">): HTMLImageElement => {
  const img = document.createElement('img');
  applySelector(img, {className: options.className, id: options.id});

  img.src = src;

  if (options.alt) {
    img.setAttribute('alt', options.alt);
  }

  return img;
}

const createLink = (href: string, options: Pick<IOptional, "className" | "id">): HTMLAnchorElement => {
  const link = document.createElement('a');
  applySelector(link, {className: options.className, id: options.id});
  link.setAttribute('href', href);
  return link;
}

const createDiv = (options: Pick<IOptional, "className" | "id" | "text">): HTMLDivElement => {
  const divTag = document.createElement(`div`);
  applySelector(divTag, {className: options.className, id: options.id});
  if(options.text){
    divTag.innerHTML = options.text;
  }  
  return divTag;
}

const createSpan = (options: Pick<IOptional, "className" | "id" | "text">): HTMLSpanElement => {
  const spanTag = document.createElement(`span`);
  applySelector(spanTag, {className: options.className, id: options.id});
  if(options.text){
    spanTag.innerHTML = options.text;
  }  
  return spanTag;
}

const createParagraph = (options: Pick<IOptional, "className" | "id" | "text">): HTMLParagraphElement => {
  const paragraphTag = document.createElement(`p`);
  applySelector(paragraphTag, {className: options.className, id: options.id});
  if(options.text){
    paragraphTag.innerHTML = options.text;
  }  
  return paragraphTag;
}

const createLabel = (options: Pick<IOptional, "className" | "id" | "text" | "for">): HTMLLabelElement => {
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

const createInput = (type: string, options: IInputOptions):HTMLInputElement => {
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

const createHTMLElement = (tagName: string, options: Pick<IOptional, "className" | "id">): HTMLElement => {
  const HTMLElement = document.createElement(tagName);
  applySelector(HTMLElement, {className: options.className, id: options.id});
  return HTMLElement;
}

export const elementGenerator = {
  createImg,
  createLink,
  createDiv,
  createSpan,
  createParagraph,
  createLabel,
  createInput,
  createHTMLElement,
}

import { elementGenerator } from "../controller/taggenerator";
import { FilterControler } from '../controller/filterController'


export class CheckboxFilter{
  createCheckboxFiled(group: string, number: number, wrapName: string, labelText: string): HTMLDivElement{
    const filterControler = new FilterControler();
    const checkboxInput = elementGenerator.createInput('checkbox', {id: `${group}${number}`});
    const checkboxLabel = elementGenerator.createLabel({for: `${group}${number}`, className: "filter-label__check-box", text: labelText});
    const groupWrap = elementGenerator.createDiv({className: `${wrapName}`});
    checkboxInput.addEventListener('change',()=>{
      if(checkboxInput.checked){
        filterControler.addFilter(group, labelText);
      } else {
        filterControler.removeFilter(group, labelText);
      }
    })
    groupWrap.append(checkboxInput, checkboxLabel);

    return groupWrap;
  }
}

export class DoubleSliderFilter{
    private upperSlider: HTMLInputElement;
    private lowerSlider: HTMLInputElement;
    private lowerText: HTMLParagraphElement;
    private upperText: HTMLParagraphElement;
    private lowerVal: number;
    private upperVal: number;
    constructor(aLowerVal: string, aUpperVal: string, groupName: string){
      this.upperSlider = elementGenerator.createInput('range', {id: `upper-${groupName}`, min: aLowerVal, max: aUpperVal, value: aUpperVal});
      this.lowerSlider = elementGenerator.createInput('range', {id: `lower-${groupName}`, min: aLowerVal, max: aUpperVal, value: aLowerVal});
      this.lowerText = elementGenerator.createParagraph({text: aLowerVal, className: 'price price_min'});
      this.upperText = elementGenerator.createParagraph({text: aUpperVal, className: 'price price_max'});
      this.lowerVal = parseInt(aLowerVal);
      this.upperVal = parseInt(aUpperVal);
      this.upperSlider.addEventListener("input", this.onUpperChange);
      this.lowerSlider.addEventListener("input", this.onLowerChange);
    }
    
    private onUpperChange=():void=>{
      this.lowerVal = parseInt(this.lowerSlider.value);
      this.upperVal = parseInt(this.upperSlider.value);    
      this.upperText.innerText = this.upperSlider.value   
        if (this.upperVal < this.lowerVal + 1) {
          this.lowerSlider.value = String(this.upperVal );
          this.lowerText.innerText = String(this.upperVal );
          if (this.lowerVal == parseInt(this.lowerSlider.min)) {
            this.upperSlider.value = String(1);
            this.upperText.innerText = String(1);
          }
        }
    };
  
    private onLowerChange=():void=>{
      this.lowerVal = parseInt(this.lowerSlider.value);
      this.upperVal = parseInt(this.upperSlider.value); 
      this.lowerText.innerText = this.lowerSlider.value;
        if (this.lowerVal > this.upperVal - 1) {
          this.upperSlider.value = String(this.lowerVal );
          this.upperText.innerText = String(this.lowerVal );

          if (this.upperVal == parseInt(this.upperSlider.max)) {
            this.lowerSlider.value = String(parseInt(this.upperSlider.max) );
            this.lowerText.innerText = String(parseInt(this.upperSlider.max) );
          }    
        }
    };

    getElements(){
      const sliderWrap = elementGenerator.createDiv({className: 'filter filter__multi-range'});
      sliderWrap.append(this.lowerSlider, this.upperSlider, this.lowerText, this.upperText);
      return sliderWrap;
    }

}



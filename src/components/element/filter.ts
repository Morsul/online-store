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
    private _upperSlider: HTMLInputElement;
    private _lowerSlider: HTMLInputElement;
    private _lowerText: HTMLParagraphElement;
    private _upperText: HTMLParagraphElement;
    private _lowerVal: number;
    private _upperVal: number;
    private _groupName: string;
    private _filterControler: FilterControler;
    constructor(aLowerVal: string, aUpperVal: string, groupName: string){
      this._upperSlider = elementGenerator.createInput('range', {id: `upper-${groupName}`, min: aLowerVal, max: aUpperVal, value: aUpperVal});
      this._lowerSlider = elementGenerator.createInput('range', {id: `lower-${groupName}`, min: aLowerVal, max: aUpperVal, value: aLowerVal});
      this._lowerText = elementGenerator.createParagraph({text: aLowerVal, className: 'price price_min'});
      this._upperText = elementGenerator.createParagraph({text: aUpperVal, className: 'price price_max'});
      this._lowerVal = parseInt(aLowerVal);
      this._upperVal = parseInt(aUpperVal);
      this._upperSlider.addEventListener("input", this.onUpperChange);
      this._lowerSlider.addEventListener("input", this.onLowerChange);
      this._groupName = groupName;
      this._filterControler = new FilterControler();
    }
    
    private onUpperChange=():void=>{
      this._lowerVal = parseInt(this._lowerSlider.value);
      this._upperVal = parseInt(this._upperSlider.value);    
      this._upperText.innerText = this._upperSlider.value   
        if (this._upperVal < this._lowerVal + 1) {
          this._lowerSlider.value = String(this._upperVal );
          this._lowerText.innerText = String(this._upperVal );
          if (this._lowerVal == parseInt(this._lowerSlider.min)) {
            this._upperSlider.value = String(1);
            this._upperText.innerText = String(1);
          }
        }
      this.setFilter();
    };
  
    private onLowerChange=():void=>{
      this._lowerVal = parseInt(this._lowerSlider.value);
      this._upperVal = parseInt(this._upperSlider.value); 
      this._lowerText.innerText = this._lowerSlider.value;
        if (this._lowerVal > this._upperVal - 1) {
          this._upperSlider.value = String(this._lowerVal );
          this._upperText.innerText = String(this._lowerVal );

          if (this._upperVal == parseInt(this._upperSlider.max)) {
            this._lowerSlider.value = String(parseInt(this._upperSlider.max) );
            this._lowerText.innerText = String(parseInt(this._upperSlider.max) );
          }    
        }
      this.setFilter(); 
    };

    private setFilter(): void{
      this._filterControler.addRangeFilter(this._groupName, `${this._lowerVal}`,`${this._upperVal}`);
    }

    getElements(){
      const sliderWrap = elementGenerator.createDiv({className: 'filter filter__multi-range'});
      sliderWrap.append(this._lowerSlider, this._upperSlider, this._lowerText, this._upperText);
      return sliderWrap;
    }

}



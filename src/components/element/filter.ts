import { elementGenerator } from '../controller/taggenerator';
import { FilterControler } from '../controller/filterController';
// import { ISaticData } from '../../type';

export class CheckboxFilter {
  private _spanAmountFound: HTMLSpanElement;
  private _spanAmountTotal: HTMLSpanElement;
  private _checkboxLabel: HTMLLabelElement;
  constructor() {
    this._spanAmountFound = elementGenerator.createSpan({ className: 'filter-amount__found' });
    this._spanAmountTotal = elementGenerator.createSpan({ className: 'filter-amount__found' });
    this._checkboxLabel = elementGenerator.createLabel({ className: 'filter-label__check-box' });
  }
  createCheckboxFiled(
    staticData: Map<string, number[]>,
    group: string,
    number: number,
    wrapName: string,
    labelText: string,
    isChecked: boolean
  ): HTMLDivElement {
    const filterControler = new FilterControler();
    const checkboxInput = elementGenerator.createInput('checkbox', { id: `${group}${number}`, checked: isChecked });
    this._checkboxLabel.innerText = labelText;
    this._checkboxLabel.dataset.name = labelText;
    this._checkboxLabel.setAttribute('for', `${group}${number}`);

    const groupWrap = elementGenerator.createDiv({ className: `${wrapName}` });
    const spanAmountWrap = elementGenerator.createSpan({ className: 'filter-amount' });

    this.updateStatistic(staticData);

    spanAmountWrap.append(this._spanAmountFound, this._spanAmountTotal);
    this._checkboxLabel.append(spanAmountWrap);
    checkboxInput.addEventListener('change', () => {
      if (checkboxInput.checked) {
        filterControler.addFilter(group, labelText);
      } else {
        filterControler.removeFilter(group, labelText);
      }
    });
    groupWrap.append(checkboxInput, this._checkboxLabel);

    return groupWrap;
  }

  updateStatistic(staticData: Map<string, number[]>) {
    const name = this._checkboxLabel.dataset.name;
    let val: number[] = [0, 0];

    if (name) {
      val = staticData.get(name) || [0, 0];
    }

    this._spanAmountFound.innerText = `${val[0]}`;
    this._spanAmountTotal.innerText = ` / ${val[1]}`;
  }
}

export class DoubleSliderFilter {
  private _upperSlider: HTMLInputElement;
  private _lowerSlider: HTMLInputElement;
  private _lowerText: HTMLParagraphElement;
  private _upperText: HTMLParagraphElement;
  private _lowerVal: number;
  private _upperVal: number;
  private _groupName: string;
  private _filterControler: FilterControler;
  private _activeMinVal: string;
  private _activeMaxVal: string;
  constructor(aLowerVal: string, aUpperVal: string, groupName: string, activeValue?: string) {
    this._lowerVal = parseInt(aLowerVal);
    this._upperVal = parseInt(aUpperVal);
    this._groupName = groupName;
    this._filterControler = new FilterControler();
    this._activeMinVal = activeValue?.split('|')[0] || String(this._lowerVal);
    this._activeMaxVal = activeValue?.split('|')[1] || String(this._upperVal);

    this._upperSlider = elementGenerator.createInput('range', {
      id: `upper-${groupName}`,
      min: aLowerVal,
      max: aUpperVal,
      value: this._activeMaxVal,
    });
    this._lowerSlider = elementGenerator.createInput('range', {
      id: `lower-${groupName}`,
      min: aLowerVal,
      max: aUpperVal,
      value: this._activeMinVal,
    });
    this._upperSlider.addEventListener('input', this.onUpperChange);
    this._lowerSlider.addEventListener('input', this.onLowerChange);

    this._lowerText = elementGenerator.createParagraph({ text: this._activeMinVal, className: 'price price_min' });
    this._upperText = elementGenerator.createParagraph({ text: this._activeMaxVal, className: 'price price_max' });
  }

  private onUpperChange = (): void => {
    this._lowerVal = parseInt(this._lowerSlider.value);
    this._upperVal = parseInt(this._upperSlider.value);
    this._upperText.innerText = this._upperSlider.value;
    if (this._upperVal < this._lowerVal + 1) {
      this._lowerSlider.value = String(this._upperVal);
      this._lowerText.innerText = String(this._upperVal);
      if (this._lowerVal == parseInt(this._lowerSlider.min)) {
        this._upperSlider.value = String(this._lowerVal + 1);
        this._upperText.innerText = String(this._lowerVal + 1);
      }
    }
    this.setFilter();
  };

  private onLowerChange = (): void => {
    this._lowerVal = parseInt(this._lowerSlider.value);
    this._upperVal = parseInt(this._upperSlider.value);
    this._lowerText.innerText = this._lowerSlider.value;
    if (this._lowerVal > this._upperVal - 1) {
      this._upperSlider.value = String(this._lowerVal);
      this._upperText.innerText = String(this._lowerVal);

      if (this._upperVal == parseInt(this._upperSlider.max)) {
        this._lowerSlider.value = String(parseInt(this._upperSlider.max) - 1);
        this._lowerText.innerText = String(parseInt(this._upperSlider.max) - 1);
      }
    }
    this.setFilter();
  };

  private setFilter(): void {
    this._filterControler.addRangeFilter(this._groupName, `${this._lowerVal}`, `${this._upperVal}`);
  }

  getElements() {
    const sliderWrap = elementGenerator.createDiv({ className: 'filter filter__multi-range' });
    sliderWrap.append(this._lowerSlider, this._upperSlider, this._lowerText, this._upperText);
    return sliderWrap;
  }

  updateValues(up: number, low: number) {
    this._upperVal = up;
    this._lowerVal = low;
    this._lowerSlider.value = String(this._upperVal - 1);
    this._lowerText.innerText = String(this._upperVal - 1);
    this._upperSlider.value = String(this._lowerVal + 1);
    this._upperText.innerText = String(this._lowerVal + 1);
  }
}

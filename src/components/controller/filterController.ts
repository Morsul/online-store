import Router from "./router";

export class FilterControler{
  addFilter(type: string, value: string): void {
    let href = '';
    value = value.toUpperCase();
    const locationQuery = window.location.search;
    if (!locationQuery) {
      href = `?${type}=${value}`;
    }
    else if (locationQuery.indexOf(type) === -1) {
      href = `${locationQuery}&${type}=${value}`;
    }
    else {
      const categoryArr = locationQuery.split(type);
      const valueArr = categoryArr[1].split('&');
      const newStr = `${valueArr[0]}|${value}`;
      valueArr.shift();
      href = categoryArr[0] + type + newStr + (valueArr.length ? '&' + valueArr.join('&') : '');
    }
    Router.getInstance().routeDefault(href);
  }

  removeFilter(type: string, value: string): void {
    let href = '';
    const locationQuery: string = window.location.search.replace('%20', ' ');
    value = value.toLowerCase();
    const categoryArr = locationQuery.split(type);
    const valueArr = categoryArr[1].split('&');
    const newStr = valueArr[0].replace('|' + value, '').replace(value + '|', '').replace(value, '');
    valueArr.shift();
    if(newStr === '=') {
      href = categoryArr[0].slice(0, -1) + (valueArr.length ? '&' + valueArr.join('&') : '');
    }
    else {
      href = categoryArr[0] + type + newStr + (valueArr.length ? '&' + valueArr.join('&') : '');
    }
    href = href.length === 0 ? '' : '?' + href.slice(1);
    Router.getInstance().routeDefault(href);
  }

  addRangeFilter(type: string, valueStart: string, valueEnd: string) {
    const locationQuery = window.location.search;
    const indexStart = locationQuery.indexOf(type);
    const newFilter = `${type}=${valueStart}|${valueEnd}`;
    let href = '';
    if (indexStart === -1) {
      href = locationQuery ? `${locationQuery}&${newFilter}` : `?${newFilter}`;
    }
    else {
      let indexEnd = locationQuery.indexOf('&', indexStart);
      indexEnd = indexEnd === -1 ? locationQuery.length : indexEnd;
      href = locationQuery.slice(0, indexStart) + newFilter + locationQuery.slice(indexEnd, locationQuery.length);
    }
    Router.getInstance().routeDefault(href);
  }
}

import { IFilter } from "./common.interfaces";

export default class Filter {
  constructor(public value: IFilter) {}

  public key() {
    let filterKey = "";
    if (this.value && this.value.items) {
      this.value.items.forEach((item) => {
        filterKey = filterKey.concat(`${item.columnField}-${item.value}`);
      });
    }
    return filterKey;
  }
}

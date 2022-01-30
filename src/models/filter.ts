import { isEqual } from "lodash-es";
import { IFilter } from "./types";

export default class Filter {
  constructor(public value?: IFilter) {}

  public key() {
    let filterKey = "";
    if (this.value && this.value.items) {
      this.value.items.forEach((item) => {
        filterKey = filterKey.concat(`${item.columnField}-${item.value}`);
      });
    }
    return filterKey;
  }

  public get isEmpty() {
    if (this.value && this.value.items) {
      return !this.value.items.some((item) => {
        return item.value != null;
      });
    }
    return true;
  }

  public isEqual(filter: Filter) {
    if (this.isEmpty && filter.isEmpty) {
      return true;
    }
    return isEqual(this.value, filter.value);
  }
}

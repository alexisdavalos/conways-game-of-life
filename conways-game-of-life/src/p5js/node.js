export default class Node {
  constructor(val) {
    if (val) {
      this.value = val;
    } else {
      this.value = 0;
    }
  }
  changeValue(val) {
    this.value = val;
  }
  clicked() {
    if (this.value === 1) {
      this.value = 0;
    } else {
      this.value = 1;
    }
  }
}

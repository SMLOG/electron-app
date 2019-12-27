function createTech(arr) {
  function init(arr) {
    this.arr = arr;
    this.ma = function(num) {
      let arr1 = arr.slice(arr.length - num - 1);
      let sum2 = arr1.map(a => a.close).reduce((a, b) => a + b);
      return sum2 / num;
    };
  }
  return new init(arr);
}

// 对于configuration的对象的处理
export function unique(array) {
  var obj = {};
  return array.filter(item => {
    const key = item.state + "" + item.stack.contents;
    return obj[key] ? false : (obj[key] = true);
  });
}

// 判断arr2是否包含arr1数组
export function include(arr1, arr2) {
  return arr1.every(element => {
    const el = element.state + "" + element.stack.contents;
    return arr2.find(item => {
      const key = item.state + "" + item.stack.contents;
      return el === key;
    });
  });
}

// 去重组合两个对象数组
export function concat(arr1, arr2) {
  return unique(arr1.concat(arr2));
}

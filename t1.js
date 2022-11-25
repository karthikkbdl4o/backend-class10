const createArray = (n) => {
  let array = [];
  let count = 1;
  for (let i = 0; i < n; i++) {
    const iArray = [];
    for (let j = 0; j < n; j++) {
      const jArray = [];
      for (let k = 0; k < n; k++) {
        jArray.push(count++);
      }
      iArray.push(jArray);
    }
    array.push(iArray);
  }
  return array;
};

console.log(createArray(2));

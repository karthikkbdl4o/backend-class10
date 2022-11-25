const products = [
  "Tomato",
  "Apple",
  "Orange",
  "Potato",
  "Chilli",
  "Radish",
  "Kiwi",
  "Mango",
];
const search = (query) => {
  return products.filter((item) => {
    return item.toLowerCase().includes(query.toLowerCase());
  });
};
console.log(search("to"));

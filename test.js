const string = "This is a sample";

const encodedString = btoa(string);

console.log(encodedString);

const decodedString = atob(encodedString);
console.log(decodedString);

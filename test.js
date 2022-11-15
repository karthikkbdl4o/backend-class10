const bcrypt = require("bcrypt");

// const password = "Ashok+1+Kumar";

// const checkPassord = "Ashok+1+Kumar1";

// const test = async () => {
//   const hash = await bcrypt.hash(password, 10).then((result) => result);
//   console.log(hash);

//   bcrypt.compare(checkPassord, hash).then((result) => console.log(result));
// };

// test();

// const obj = { a: "asfa", b: "Helo" };

// console.log(obj);

// delete obj.a;

// console.log(obj);

// var jwt = require("jsonwebtoken");
// var token = jwt.sign({ userId: "s" }, "shhhhh");

// console.log(token);

// jwt.verify(token, "shhhhh", function (err, decoded) {
//   console.log(decoded); // bar
// });

const password = "1234";

const test = async () => {
  const hash = await bcrypt.hash(password, 10).then((result) => {
    return result;
  });
  console.log(hash);
};

test();

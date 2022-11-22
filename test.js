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

// const password = "1234";

// const test = async () => {
//   const hash = await bcrypt.hash(password, 10).then((result) => {
//     return result;
//   });
//   console.log(hash);
// };

// test();

const hash = "$2b$10$GO5LNvcV8f4ihg7ef5utz.qbzktQPPQau.xh9hO2jcdJmh1i3GIpC";

const hack = async () => {
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      for (let k = 0; k <= 9; k++) {
        for (let l = 0; l <= 9; l++) {
          const passcode =
            i.toString() + j.toString() + k.toString() + l.toString();
          console.log(passcode);
          const isValid = await bcrypt
            .compare(passcode, hash)
            .then((result) => {
              return result;
            });
          if (isValid) return passcode;
        }
      }
    }
  }
};
const main = async () => {
  const passcode = await hack();
  console.log("Password:" + passcode);
};
main();

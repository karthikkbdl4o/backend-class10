const bcrypt = require("bcrypt");

const password = "Ashok+1+Kumar";

const checkPassord = "Ashok+1+Kumar1";

const test = async () => {
  const hash = await bcrypt.hash(password, 10).then((result) => result);
  console.log(hash);

  bcrypt.compare(checkPassord, hash).then((result) => console.log(result));
};

test();

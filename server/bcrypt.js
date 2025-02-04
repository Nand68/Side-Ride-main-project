const bcrypt = require("bcrypt");

(async () => {
  const password = "1234567890";
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
})();

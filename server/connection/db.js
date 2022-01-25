const mongoose = require("mongoose");

main()
  .then(() => console.log("Database Connected Successfully "))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
}

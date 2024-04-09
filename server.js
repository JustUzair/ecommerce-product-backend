//entry point
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const os = require("os");

process.on("uncaughtException", err => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({
  path: "./config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const app = require("./app");
const port = process.env.PORT || 3000;

/*
  |--------------------------------------------------------|
  |  We pass the useNewUrlParser: true                     |
  |  useCreateIndex: true                                  |
  |  useFindAndModify: true                                |
  |  useUnifiedTopology: true, etc                         |
  |  to mongoose.connect() to avoid the DeprecationWarning.|
  |--------------------------------------------------------|
*/
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(con => {
    console.log("Database Connected!!");
  });
/*
|-------------------------------------------------------------------------|
|Listen for requests on port number indicated by env variable PORT or 3000|
|-------------------------------------------------------------------------|

*/
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

/*
  |---------------------------------------------------------------------------------------|
  |   The 'unhandledRejection' event is useful for detecting and keeping track of promises|
  |   that were rejected whose rejections have not yet been handled.                      |
  |---------------------------------------------------------------------------------------|
*/
process.on("unhandledRejection", err => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

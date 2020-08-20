require("dotenv").config();
const express = require("express");
const path = require('path')
const contactsRouter = require("./router/index");
const cors = require("cors");
const userRouter = require('./router/userRouter')
const ContactsDatabase = require("./server");
const auth = require('./middleware/auth')

async function main() {

  const app = express();

  await ContactsDatabase.init()

  app.use(express.json());
  app.use(cors());

  app.use("/contacts", auth, contactsRouter);
  app.use('/auth',  userRouter);

  app.use("/images", express.static(path.join(process.cwd(), "public", "images")))

  app.use((req, res) => {
    res.status(404).send({ message: "information not found" });
  });

  app.listen(process.env.PORT, (err) =>
    err
      ? console.error(err)
      : console.log("Server started on port", process.env.PORT)
  );
}

main().catch(console.error);

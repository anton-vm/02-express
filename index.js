require("dotenv").config();
const express = require("express");
const contactsRouter = require("./router/index");
const cors = require("cors");
const ContactsDatabase = require("./server");

async function main() {

  const app = express();

  await ContactsDatabase.init()

  app.use(express.json());
  app.use(cors());

  app.use("/contacts", contactsRouter);

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

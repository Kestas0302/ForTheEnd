const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const { port } = require("./config");
const { auth } = require("./routes/v1");
const { dbConfig } = require("./config");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/v1/auth/", auth);

app.get("/", (req, res) => {
  res.send({ msg: "Server is running" });
});
app.get("/participants", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const responce = await con.execute(
      "Select * From participants_db.participants;"
    );
    console.log("Success: " + con);

    res.send(responce[0]);
  } catch (e) {
    console.log(e);
  }
});
app.get("/participants/:id?", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isInteger(id) || !req.params.id) {
      const con = await mysql.createConnection(dbConfig);
      const selectAll = "SELECT * FROM participants";
      const selectOne = `${selectAll} WHERE id=${id}`;
      const response = await con.execute(id ? selectOne : selectAll);
      res.send(response[0]);
      await con.end();
    } else {
      res.status(400).send([]);
    }
  } catch (e) {
    if (e.code === "ER_ACCESS_DENIED_ERROR") {
      res.status(401).send("Unauthorized");
    }
    console.log(e);
  }
});

app.delete("/participants/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const responce = await con.execute(
      `Delete  From participants_db.participants Where id=${req.params.id};`
    );
    await con.end();
    res.send(responce[0]);
  } catch (e) {
    console.log(e);
  }
});

app.all("*", (req, res) => {
  res.status(404).send({ error: "Page not found" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

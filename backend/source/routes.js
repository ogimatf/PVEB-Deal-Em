const express = require("express");
const router = express.Router();
const db = require("./db");

class Player {
  constructor({ name, winNum, loseNum }) {
    this.obj = {
      name,
      winNum: 0,
      loseNum: 0,
      points: 0,
    };
  }

  getPlayer() {
    return this.obj;
  }
}

router.post("/regist", async (req, res) => {
  const name = req.headers.name;

  const database = await db.getDatabase();
  const player = new Player({ name });

  database
    .collection("user")
    .findOne({ name })
    .then((result) => {
      if (result !== null) {
        res.status(406).json({ msg: "Exist" });
      } else {
        database
          .collection("user")
          .insertOne(player.getPlayer())
          .then(() => {
            res.status(200).json({ msg: "OK" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: "Failed" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Failed" });
    });
});

router.get("/log", async (req, res) => {
  const name = req.headers.name;

  const database = await db.getDatabase();

  database
    .collection("user")
    .findOne({ name })
    .then((result) => {
      if (result === null) {
        res.status(406).json({ msg: "Not Found" });
      } else {
        res.status(200).json({ msg: "OK" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Failed" });
    });
});

router.get("/all", async (req, res) => {
  const database = await db.getDatabase();

  database
    .collection("user")
    .find()
    .sort({ winNum: -1 })
    .toArray(function (err, result) {
      if (err) {
        res.status(500).json({ msg: "DB Failed" });
        throw err;
      }

      res.status(200).send({ result });
    });
});

module.exports = router;

const router = require("express").Router();
const connection = require(global.rootDir + "/scripts/database.js");
const User = connection.models.users;

/* GET https://site212222.tw.cs.unibo.it/api/users */
router.get("/", (req, res) => {
  User.find((err, data) => {
    try {
      if (err) {
        throw err;
      } else {
        if (data) {
          res.send(data);
        } else {
          throw "Nessun risultato";
        }
      }
    } catch (error) {
      res.status(401).send(error);
    }
  });
});

/* GET https://site212222.tw.cs.unibo.it/api/users/{emailUtente} */
router.get("/:email", (req, res) => {
  const email = req.params.email;
  User.findOne({ email: email }, (err, data) => {
    try {
      if (err) {
        throw err;
      } else {
        if (data) {
          res.send(data);
        } else {
          throw "Nessun risultato";
        }
      }
    } catch (error) {
      res.status(401).send(error);
    }
  });
});

/* POST https://site212222.tw.cs.unibo.it/api/users/register */
router.post("/register", (req, res) => {
  let errors = [];
  const validPass = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  if (req.body.password.length < 8) {
    errors.push("La password deve avere almeno 8 caratteri");
  }
  if (!validPass.test(req.body.password)) {
    errors.push(
      "La password deve contenere almeno una lettera maiuscola, una minuscola, una cifra e un carattere speciale"
    );
  }
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    try {
      User.findOne({ email: req.body.email }, (err, data) => {
        try {
          if (data) {
            errors.push("Email già registrata");
          }
          if (errors.length > 0) {
            throw errors;
          } else {
            req.body.password = hash;
            req.body.admin = false;
            const newuser = new User(req.body);
            newuser.save();
            res.send(newuser);
          }
        } catch (error) {
          res.status(401).send(error);
        }
      });
    } catch (error) {
      res.status(401).send(error);
    }
  });
});

router.delete("/:email", (req, res) => {
  const email = req.params.email;
  User.findOne({ email: email }, (err, data) => {
    try {
      if (err) {
        throw err;
      } else {
        if (data) {
          User.deleteOne({ email: email }, (err) => {
            try {
              if (err) {
                throw err;
              }
            } catch (error) {
              res.status(401).send(error);
            }
          });
        } else {
          throw "Nessun risultato trovato";
        }
      }
    } catch (error) {
      res.status(401).send(error);
    }
  });
});

module.exports = router;

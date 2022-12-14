const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require('bcrypt');
const saltRound = 10;

const jwt = require('jsonwebtoken');

app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use (
    session ({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);


const db = mysql.createPool({
    host: "127.0.0.1",
    user: "organize",
    password: "organizer1!",
    database: "organizatoriai",
});

 
const verifyJWT = (role) => {
    return (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];  
        let authorized = false;
        const decoded = jwt.verify(token, 'SECRETKEY' );
        
        req.userData = decoded;
        
        if(req.userData.role == role)
            authorized = true;

        if (authorized == false)
            throw Error("Unauthorized");
        
        next();

      } catch (err) {
          console.log(err.message);
          let msg = "";

          if(err.message == "Unauthorized"){
            msg = "User needs to have role: " + role + " to access this endpoint";
          } else {
           msg = "Your token is incorrect or have expired";
          }
        return res.status(401).send({
          msg: msg
        });
      }
    }
};

const role = require('./role.js');

app.get("/api/getAttenders/:id",  ( req, res) => {
    const { id } = req.params;

    const sqlGet = "SELECT * FROM Attender WHERE organized_by = ?";

    db.query(sqlGet,id, (error, result) => {
        res.send(result);
    })
})

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;

    const sqlGet = "SELECT * FROM Attender WHERE id = ?";

    db.query(sqlGet,id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    })
})

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { namesurname, email, age } = req.body;
    const sqlPut = "UPDATE Attender SET namesurname = ?, email = ?, age = ? WHERE id = ?";

    db.query(sqlPut, [namesurname, email, age, id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
})

app.post("/api/addAttender", (req, res) => {
    const { namesurname, email, age, userId } = req.body;
    const sqlInsert = 
    "INSERT INTO Attender (namesurname, email, age, organized_by) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [namesurname, email, age, userId], (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlDelete = 
    "DELETE FROM Attender where id = ?";
    db.query(sqlDelete, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

const validateRegister = (req, res, next) => {
    // username min length 3
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        msg: 'Please enter a username with min. 3 chars'
      });
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }
    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
    }
    next();
}


app.post('/api/register',  (req, res, next)=> {
    db.query(
        `SELECT * FROM User WHERE LOWER(username) = LOWER(${db.escape(
          req.body.username
        )});`,
        (err, result) => {
          if (result.length) {
            return res.status(409).send({
              msg: 'This username is already in use!'
            });
          } else {
            // username is available
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).send({
                  msg: err
                });
              } else {
                // has hashed pw => add to database
                db.query(
                  `INSERT INTO User (username, password, role, registered) VALUES ( ${db.escape(
                    req.body.username
                  )}, ${db.escape(hash)}, ${db.escape(req.body.role)}, now())`,
                  (err, result) => {
                    if (err) {
                      throw err;
                      return res.status(400).send({
                        msg: err
                      });
                    }
                    return res.status(201).send({
                      msg: 'Registered!'
                    });
                  }
                );
              }
            });
          }
        }
      );
});

app.get('/isUserAuth', (req, res) => {
    res.send("You are authenticated Congrats:")
})

app.post('/login', (req, res) => {
    db.query(
        `SELECT * FROM User WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
          // user does not exists
          if (err) {
            throw err;
            return res.status(400).send({
              msg: err
            });
          }
          if (!result.length) {
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
          // check password
          bcrypt.compare(
            req.body.password,
            result[0]['password'],
            (bErr, bResult) => {
              // wrong password
              if (bErr) {
                  console.log(req.body.password,
                    result[0]['password']);
                  console.log(bErr);
                throw bErr;
                return res.status(401).send({
                  msg: 'Username or password is incorrect!'
                });
              }
              if (bResult) {
                const token = jwt.sign({
                    username: result[0].username,
                    userId: result[0].id,
                    role: result[0].role,
                  },
                  'SECRETKEY', {
                    expiresIn: '7d'
                  }
                );
                db.query(
                  `UPDATE User SET last_login = now() WHERE id = '${result[0].id}'`
                );
                return res.status(200).send({
                  msg: 'Logged in!',
                  token,
                  user: result[0]
                });
              }
              return res.status(401).send({
                msg: 'Username or password is incorrect!'
              });
            }
          );
        }
      );
});


app.get("/api/getUsers", ( req, res) => {
    const sqlGet = "SELECT * FROM User";

    db.query(sqlGet, (error, result) => {
        res.send(result);
    })
})

app.get("/api/getUser/:id", (req, res) => {
    const { id } = req.params;

    const sqlGet = "SELECT * FROM User WHERE id = ?";

    db.query(sqlGet,id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    })
})

app.put("/api/updateUser/:id", (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
   
    db.query(
        `SELECT * FROM User WHERE LOWER(username) = LOWER(${db.escape(
          req.body.username
        )});`,
        (err, result) => {
            console.log(result[0].id == req.params.id);
          if ((result.length>0) && !(result[0].id !== req.params.id)) {
            return res.status(409).send({
              msg: 'This username is already in use!'
            });
          } else {
            // username is available
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                console.log(err);
                return res.status(500).send({
                  msg: err
                });
                
              } else {
                // has hashed pw => add to database
                db.query(
                  `UPDATE User set username="${req.body.username}", password=${db.escape(hash)}, role="${req.body.role}" WHERE id=${id}`,
                  (err, result) => {
                    if (err) {
                      throw err;
                      return res.status(400).send({
                        msg: err
                      });
                    }
                    return res.status(201).send({
                      msg: 'User have been updated!'
                    });
                  }
                );
              }
            });
          }
        }
      );
})


app.delete("/api/removeUser/:id", (req, res) => {
    const { id } = req.params;
    const sqlDelete = 
    "DELETE FROM User where id = ?";
    db.query(sqlDelete, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});


app.get("/", (req, res) => {
});

app.listen(8083, () => 
console.log("Server is running on port 8083"));
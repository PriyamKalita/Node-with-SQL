const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Create a pool of connections to the database
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'delta_App',
  password: '1234',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password()
  ];
};

// Home Page
app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) AS count FROM user`;
  pool.query(q, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send("Some Error In Database");
      return;
    }
    let count = results[0].count;
    res.render("home", { count });
  });
});

// Show Route
app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  pool.query(q, (err, users) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send("Some Error In Database");
      return;
    }
    res.render("showuser", { users });
  });
});

// Edit Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  pool.query(q, (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send("Some Error In Database");
      return;
    }
    let user = result[0];
    res.render("edit", { user });
  });
});

// UPDATE (DB) Route
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: forPass, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  pool.query(q, (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send("Some Error In Database");
      return;
    }
    let user = result[0];
    if (forPass != user.password) {
      res.send("Wrong Password");
    } else {
      let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
      pool.query(q2, (err, result) => {
        if (err) {
          console.error('Database query error:', err);
          res.status(500).send("Some Error In Database");
          return;
        }
        res.redirect("/user");
      });
    }
  });
});

app.listen(8080, () => {
  console.log("Server is listening on PORT 8080");
});

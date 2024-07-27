const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();

// Create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_App',
  password: '1234'
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password()
  ];
};

// Insert Data In Bulk
// let q = "INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES ?";
// let data = [];
// for(let i = 1; i <= 100; i++){
//   data.push(getRandomUser());
// }

// try {
//   connection.query(q, [data], (err, result) => {
//     if (err) throw err;
//     console.log(result);
//     connection.end(); // Close the connection after the query completes
//   });
// } catch (err) {
//   console.log(err);
// }

app.get("/", (req, res) => {
  let q = `SELECT COUNT(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result[0]["count(*)"]);
      res.send("Success");
      connection.end(); // Close the connection after the query completes
    });
  } catch (err) {
    console.log(err);
    res.send("Some Error In DataBase");
  }
});

app.listen("8080", () => {
  console.log("Server is listening to PORT 8080");
});

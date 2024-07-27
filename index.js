// console.log(getRandomUser());
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

// Create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_App',
  password: '1234'
});

let q = "INSERT INTO `user` (`id`, `username`, `email`, `password`) VALUES ?";
let user = [
  ["123a", "123_newuserA", "abc@gmail.com", "abc"],
  ["123b", "123_newuserB", "abcd@gmail.com", "abcd"]
];

try {
  connection.query(q, [user], (err, result) => {
    if (err) throw err;
    console.log(result);
    connection.end(); // Close the connection after the query completes
  });
} catch (err) {
  console.log(err);
}

let getRandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

console.log(getRandomUser());

const Responses = require('../API_Responses');
const mysql2 = require('mysql2/promise');
const AWS = require('aws-sdk');

// db params
let endpoint = "";
let username = "";
let password = "";
let database_name = "";


exports.handler = async (event, context, callback) => {
  console.log('event!: ', event);

  // get username
  let student_name = event.userName;

  await mysql2
    .createConnection({
      host: endpoint,
      user: username,
      password: password,
      database: database_name,
    })
    .then((conn) => {
      const res = conn.query(
        "INSERT INTO Students (student_name) VALUES (?)",
        student_name
      );
      conn.end();
      return res;
    })
    .then(([rows, fields]) => console.log(rows))
    .catch((err) => console.log(err));

    console.log(event.request.userAttributes)

    callback(null, event);
};


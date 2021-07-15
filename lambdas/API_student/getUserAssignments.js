const Responses = require('../../API_Responses');
const mysql2 = require('mysql2/promise');
const RDS = require('../config/RDS');
const AWS = require('aws-sdk');

// db params
let endpoint = RDS.endpoint;
let username = RDS.username;
let password = RDS.password;
let database_name = RDS.database_name;
let userPool = "ap-southeast-2_R4DNLJ6Jx";


exports.handler = async event => {
  console.log('event: ', event);
  console.log(event.requestContext.authorizer.claims);
  
  const student_id = event.requestContext.authorizer.claims['custom:student_id'];
  console.log("username: " + student_id);
  
  let result = null;
  
  await mysql2
  .createConnection({
    host: endpoint,
    user: username,
    password: password,
    database: database_name,
  })
  .then((conn) => {
    const res = conn.query(
      "SELECT * FROM StudentAssignments WHERE student_id = ?",
      student_id
    );
    conn.end();
    return res;
  })
  .then(([rows, fields]) => {
      console.log(rows);
      result = rows;
      return rows;
  })
  .catch((err) => console.log(err));
  
  if (result == null) {
      Responses._400({message: "Error in getting assignments"});
  } 
  
  return Responses._200({ "assignments": JSON.stringify(result) });
};
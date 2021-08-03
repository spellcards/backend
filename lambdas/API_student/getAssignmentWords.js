const Responses = require('../../API_Responses');
const mysql2 = require('mysql2/promise');
const RDS = require('../config/RDS');
const AWS = require('aws-sdk');

// db params
let endpoint = RDS.endpoint;
let username = RDS.username;
let password = RDS.password;
let database_name = RDS.database_name;


exports.handler = async event => {
  console.log('event: ', event);
  
  const student_id = event.requestContext.authorizer.claims['custom:student_id'];

    // get user passed day
    if (!event.pathParameters || !event.pathParameters.assignment_id) {
      // failed without an assignment_id
      return Responses._400({message: 'Missing assignment_id from path.'});
    }
    let assignment_id = event.pathParameters.assignment_id;
  
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
      [student_id, assignment_id]
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
      Responses._400({message: "Error in getting assignment words"});
  } 
  
  return Responses._200({ "assignments": JSON.stringify(result) });
};
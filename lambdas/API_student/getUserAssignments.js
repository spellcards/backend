const Responses = require('../../API_Responses');
const mysql2 = require('mysql2/promise');
// const AWS = require('aws-sdk');


exports.handler = async event => {
    console.log('event: ', event);

    const student_id = event.requestContext.authorizer.claims['custom:student_id'];

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
      result = res;
      return res;
    })
    .then(([rows, fields]) => {
        console.log(rows);
        return rows;
    })
    .catch((err) => console.log(err));

    if (result == null) {
        Responses._400({message: "no assignments found"});
    } 

    return Responses._200(JSON.stringify(result));
};
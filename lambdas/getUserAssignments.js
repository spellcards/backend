const Responses = require('../API_Responses');


exports.handler = async event => {
    console.log('event: ', event);


    if (!event.pathParameters || !event.pathParameters.student_id ) {
        // failed without an ID.
        return Responses._400({message: 'Missing student_id parameter'})
    }

    let student_id = event.pathParameters.student_id;

    // data exists
    if (data[student_id]) {
        return Responses._200(data[student_id])
    }

    // failed as not in the data
    return Responses._400({message: "no such student_id exists"})

};

const data = {
    1: { assignment_id: 1, assignment_name: "Colours", due_date: "30-10-2021" },
    2: { assignment_id: 2, assignment_name: "Numbers 1", due_date: "30-10-2021" },
    3: { assignment_id: 3, assignment_name: "Numbers 2", due_date: "30-10-2021" }
};
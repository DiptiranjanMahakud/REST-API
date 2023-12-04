const pool = require('../../db');
const queries = require('./queries');



// Function to get all students
const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results.rows);
        }
    });
};





// Function to get a student by ID
const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results.rows);
        }
    });
};



// Function to add a new student
const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    // Check if email already exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.rows.length) {
            res.status(400).send("Email already exists");
            return;
        }

        // Add the student to the database
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.status(201).send("Student created successfully!");
            }
        });
    });
};


// Function to remove a student by ID
const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    // Check if the student exists
    pool.query(queries.removeStudent, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student does not exist in the database.");
        }

        // Remove the student
        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student removed successfully.");
        });
    });
};

// Function to update a student by ID
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    // Check if the student exists
    pool.query(queries.getStudentById, [id], (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const noStudentFound = !result.rows.length;
        if (noStudentFound) {
            res.status(404).send("Student does not exist in the database");
        } else {
            // Update the student's information
            pool.query(queries.updateStudent, [name, id], (error, results) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.status(200).send("Student updated successfully");
                }
            });
        }
    });
};

// Exporting all the functions
module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
};



//previous update function


// const updateStudent = (req, res) => {
//     const id = parseInt(req.params.id);
//     const { name } = req.body;

//     pool.query(queries.getStudentById, [id], (error, result) => {
//         const noStudentFound = !results.row.length;
//         if (noStudentFound) {
//             res.send("Student does not exist in db");
//         }
//         pool.query(queries.updateStudent, [name, id], (error, results) => {
//             if (error) throw error;
//             res.status(200).send("sudent updated successfully");
//         });
//     });
// };





//this error was occur bcz can't set headers after sent response ...

// // Importing the 'pool' object from the '../../db' file
// const pool = require('../../db');

// // Importing the 'queries' object from the './queries' file
// const queries = require('./queries');

// // Defining a function called 'getStudents' that handles GET requests
// const getStudents = (req, res) => {
//     // Using the 'query' method on the 'pool' object to execute a SQL query
//     // The SQL query is obtained from the 'queries' object
//     pool.query(queries.getStudents, (error, results) => {
//         // Handling errors, if any
//         if (error) throw error;

//         // Sending a JSON response with the results from the query
//         res.status(200).json(results.rows);
//     });
// };


// const getStudentById=(req,res)=>{
//     const id=parseInt(req.params.id);
//     pool.query(queries.getStudentById, [id] ,(error,results)=>{
//         if(error) throw error;
//         res.status(200).json(results.rows);
//     });
// };


// const addStudent=(req,res)=>{
//     const {name, email , age, dob}=req.body;
//     //check if email exists
//     pool.query(queries.checkEmailExists, [email],(error,results)=>{
//         if(results.rows.length)//if length is 0 it will falsy.
//         {
//             res.send("Email already exists");
//         }

//         //add student to db
//         pool.query(queries.addStudent,[name,email,age,dob],(error,results)=>{
//             if(error) throw error;
//             res.status(201).send("student created succsess fully!");

//         });
//     } );

// };

// // Exporting the 'getStudents' function to make it accessible in other files
// module.exports = {
//     getStudents,
//     getStudentById,
//     addStudent,
// };

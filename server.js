// Importing the express library
const express = require("express");

// Importing the 'studentRoutes' object from the './src/student/routes' file
const studentRoutes = require("./src/student/routes");

// Creating an instance of the Express application
const app = express();

// Specifying the port number to listen on
const port = 3000;

// Adding middleware to parse incoming JSON requests
app.use(express.json());

// Defining a route for handling HTTP GET requests at the root path ("/")
// The callback function sends the response "Hello world!"
app.get("/", (req, res) => {
    res.send("Hello world!");
});

// Mounting the student routes under the "/api/v1/students" path
app.use("/api/v1/students", studentRoutes);

// Starting the Express application, listening on the specified port
app.listen(port, () => console.log(`app listening on port ${port}`));

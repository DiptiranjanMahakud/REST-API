// Importing the Router class from the express library
const { Router } = require("express");

// Importing the 'controller' object from the './controller' file
const controller = require('./controller');

// Creating a new instance of the Router class
const router = Router();

// Defining a route for handling HTTP GET requests at the root path ("/")
router.get("/", controller.getStudents);

// Defining a route for handling HTTP GET requests with a dynamic parameter ":id"
router.get("/:id", controller.getStudentById);

// Defining a route for handling HTTP POST requests at the root path ("/")
router.post("/", controller.addStudent);

// Defining a route for handling HTTP DELETE requests with a dynamic parameter ":id"
router.delete("/:id", controller.removeStudent);

// Defining a route for handling HTTP PUT requests with a dynamic parameter ":id"
router.put("/:id", controller.removeStudent);

// Exporting the router object to be used in other parts of the application
module.exports = router;

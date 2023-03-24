const express = require("express");
const router = express.Router();
const employeesController = require('../../controlers/employeesControler')

router
  .route("/")
  .get(employeesController.getAllEmployee) 
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;

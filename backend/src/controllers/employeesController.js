const employeeController = {};

//importo el Schema de la colección que voy a utilizar
import employeesModel from "../models/employees.js";

//SELECT
employeeController.getEmployees = async (req, res) => {
  const employees = await employeesModel.find();
  res.json(employees);
};

//INSERT
employeeController.insertEmployee = async (req, res) => {
  //#1-SOlicto los datos
  const { name, email, phone, hireDate, birthday, rol, user, password, status } =
    req.body;

  //#2- lleno mi modelo con los datos que acabo de pedir
  const newEmployee = new employeesModel({
    name,
    email, 
    phone, 
    hireDate, 
    birthday, 
    rol, 
    user, 
    password, 
    status,
  });

  //#3- Guardo todo en la base de datos
  await newEmployee.save();

  res.json({ message: "Employee saved" });
};

//ELIMINAR
employeeController.deleteEmployee = async (req, res) => {
  await employeesModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
};

//ACTUALIZAR
employeeController.updateEmployee = async (req, res) => {
  //#1- Solicito los nuevos datos
  const { name, email, phone, hireDate, birthday, rol, user, password, status } =
    req.body;
  //#2- Actualizo
  await employeesModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email, 
      phone, 
      hireDate, 
      birthday, 
      rol, 
      user, 
      password, 
      status,
    },
    { new: true },
  );

  res.json({ message: "Employee updated" });
};

export default employeeController;
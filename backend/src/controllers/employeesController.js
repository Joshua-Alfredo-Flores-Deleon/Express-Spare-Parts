import employeerModel from "../models/employees.js";

//Array de funciones
const employeerModelController = {};

//SELECT
employeerModelController.getEmployeer = async (req, res) => {
  try {
    const employeer = await employeerModel.find();
    return res.status(200).json(employeer);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//UPDATE
employeerModelController.updateEmployeer = async (req, res) => {
  try {
    //#1- solicitamos los nuevos datos
    let {
      email, 
        phone, 
        hireDate, 
        birthday, 
        rol, 
        user,
        password,
        status,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;

    //Validaciones
    name = name?.trim();
    email = email?.trim();

    //valores requires
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fields required" });
    }

    //validación de fechas
    if (birthdate > new Date() || birthdate < new Date("1901-01-01")) {
      return res.status(400).json({ message: "invalid date" });
    }

    const employeerUpdated = await employeerModel.findByIdAndUpdate(
      req.params.id,
      {
        email, 
        phone, 
        hireDate, 
        birthday, 
        rol, 
        user,
        password,
        status,
        isVerified,
        loginAttemps,
        timeOut,
      },
      { new: true },
    );

    if (!employeerUpdated) {
      return res.status(404).json({ message: "Employeer not found" });
    }

    return res.status(200).json({ message: "employeer updated" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//ELIMINAR
employeerModelController.deleteEmployeer = async (req, res) => {
  try {
    const deleteEmployeer = employeerModel.findByIdAndDelete(req.params.id);

    //Si no se elimina es por que no encontró el id
    if (!deleteEmployeer) {
      return res.status(404).json({ message: "Employeer not found" });
    }

    return res.status(200).json({ message: "employeer deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default employeerModelController;
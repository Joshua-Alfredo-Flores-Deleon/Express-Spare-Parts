import customerModel from "../models/customers.js";

const customerController = {};

// GET ALL Obtener todos los clientes
customerController.getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find().select("-password");
    return res.status(200).json(customers);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET BY ID  Obtener cliente por id
customerController.getCustomerById = async (req, res) => {
  try {
    const customer = await customerModel.findById(req.params.id).select("-password");
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    return res.status(200).json(customer);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST Crear cliente
customerController.createCustomer = async (req, res) => {
  try {
    const { full_name, email, phone_number, user, password, status } = req.body;

    // Validacione
    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "Fields full_name, email and password are required" });
    }

    // Verificar que el email no exista
    const exists = await customerModel.findOne({ email: email.trim() });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newCustomer = new customerModel({
      full_name: full_name.trim(),
      email: email.trim(),
      phone_number,
      user,
      password,
      status: status !== undefined ? status : true,
    });

    await newCustomer.save();
    return res.status(201).json({ message: "Customer created successfully" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// PUT - Actualizar cliente
customerController.updateCustomer = async (req, res) => {
  try {
    const { full_name, email, phone_number, user, status } = req.body;

    if (!full_name || !email) {
      return res.status(400).json({ message: "Fields full_name and email are required" });
    }

    const customerUpdated = await customerModel.findByIdAndUpdate(
      req.params.id,
      { full_name, email, phone_number, user, status },
      { new: true }
    );

    if (!customerUpdated) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE - Eliminar cliente 
customerController.deleteCustomer = async (req, res) => {
  try {
    const customerDeleted = await customerModel.findByIdAndUpdate(
      req.params.id,
      { status: false },
      { new: true }
    );

    if (!customerDeleted) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer deactivated successfully" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


customerController.countCustomers = async (req, res) => {
  try {
    const count = await customerModel.countDocuments({ status: true });
    return res.status(200).json({ count });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default customerController;
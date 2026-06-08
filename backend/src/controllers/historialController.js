import historialModel from "../models/historial.js";

const historialController = {};

historialController.getHistorial = async (req, res) => {
  try {
    const historial = await historialModel
      .find()
      .populate("id_cliente", "full_name email phone_number")
      .populate("id_venta")
      .sort({ date: -1 });
    return res.status(200).json(historial);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET - Historial por cliente
historialController.getHistorialByCustomer = async (req, res) => {
  try {
    const historial = await historialModel
      .find({ id_cliente: req.params.id_cliente })
      .populate("id_venta")
      .sort({ date: -1 });

    if (!historial.length) {
      return res.status(404).json({ message: "No history found for this customer" });
    }

    return res.status(200).json(historial);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET BY ID
historialController.getHistorialById = async (req, res) => {
  try {
    const record = await historialModel
      .findById(req.params.id)
      .populate("id_cliente", "full_name email phone_number")
      .populate("id_venta");

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json(record);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

historialController.createHistorial = async (req, res) => {
  try {
    const { id_cliente, id_venta, date, status } = req.body;

    if (!id_cliente || !id_venta) {
      return res.status(400).json({ message: "Fields id_cliente and id_venta are required" });
    }

    const newRecord = new historialModel({
      id_cliente,
      id_venta,
      date: date || new Date(),
      status: status || "Completado",
    });

    await newRecord.save();
    return res.status(201).json({ message: "Historial record created successfully" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// PUT - Actualizar estado del historial
historialController.updateHistorial = async (req, res) => {
  try {
    const { status } = req.body;

    const recordUpdated = await historialModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!recordUpdated) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({ message: "Historial record updated successfully" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

historialController.deleteHistorial = async (req, res) => {
  try {
    const recordDeleted = await historialModel.findByIdAndDelete(req.params.id);

    if (!recordDeleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({ message: "Historial record deleted successfully" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default historialController;

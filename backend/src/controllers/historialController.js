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
    const { id_cliente, id_venta, customerId, ventaId, date, status } = req.body;

    const cliente = id_cliente || customerId;
    const venta = id_venta || ventaId;

    if (!cliente || !venta) {
      return res.status(400).json({ message: "Fields id_cliente/customerId and id_venta/ventaId are required" });
    }

    const newRecord = new historialModel({
      id_cliente: cliente,
      id_venta: venta,
      customerId: cliente,
      ventaId: venta,
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

// Alias por compatibilidad
historialController.insertHistorial = historialController.createHistorial;

// PUT - Actualizar estado del historial
historialController.updateHistorial = async (req, res) => {
  try {
    const { status, customerId, ventaId, date } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (customerId) updateData.customerId = customerId;
    if (ventaId) updateData.ventaId = ventaId;
    if (date) updateData.date = date;

    const recordUpdated = await historialModel.findByIdAndUpdate(
      req.params.id,
      updateData,
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

// select con filtro por rango de precio (por compatibilidad si alguien lo llama)
historialController.getHistoralByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.body;
    const historial = await historialModel.find({
      price: { $gte: min, $lte: max }
    });
    return res.status(200).json(historial);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default historialController;

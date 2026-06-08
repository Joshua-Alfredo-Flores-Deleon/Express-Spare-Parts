const historialController = {};

//Import el Schema de la colección que
import historialModel from "../models/historial.js";

//SELECT
historialController.getHistorial = async (req, res) => {
  const historial = await historialModel.find();
  res.json(historial);
};

//INSERT
historialController.insertHistorial = async (req, res) => {
  //#1- Solicito los datos a guardar
  const { customerId, ventaId, date, status } = req.body;
  //#2- Lleno una instacia de mi Schema
  const newHistorial = new historialModel({ customerId, ventaId, date, status });
  //#3- guardo en la base de datos
  await newHistorial.save();

  res.json({ message: "Historial saved" });
};

//ELIMINAR
historialController.deleteHistorial = async (req, res) => {
  await historialModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Historial deleted" });
};

//ACTUALIZAR
historialController.updateHistorial = async (req, res) => {
  //#1- pido los nuevos datos
  const { customerId, ventaId, date, status } = req.body;
  //#2- actualizo los datos
  await historialModel.findByIdAndUpdate(
    req.params.id,
    {
     customerId, 
     ventaId, 
     date, 
     status
    },
    { new: true },
  );

  res.json({ message: "historial updated" });
};

//select por id
historialController.getHistorialById = async (req, res) => {
  try {
    const historial = await historialModel.findById(req.params.id)
    if(!historial){
      return res.status(404).json({message: "historial not found"})
    }
    return res.status(200).json(historial);
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "internal server error"})
  }
};

//select con diltro
historialController.getHistoralByPriceRange = async (req, res) => {
  try {
    //solicitar datos
    const {min, max} = req.body;

    const historial = await historialModel.find({
      price: {$gte: min, $lte: max}
    })

    if(!historial){
      return res.status(404).json({message: "not historial with this price range"})
    }

    return res.status(200).json(historial)
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "internal server error"})
  }
};

export default historialController;
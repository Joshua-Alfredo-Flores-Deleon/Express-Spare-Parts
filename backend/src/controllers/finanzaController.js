const finanzaController = {};

//Import el Schema de la colección que
import finanzaModel from "../models/finanza.js";

//SELECT
finanzaController.getFinanza = async (req, res) => {
  const finanza = await finanzaModel.find();
  res.json(finanza);
};

//INSERT
finanzaController.insertFinanza = async (req, res) => {
  //#1- Solicito los datos a guardar
  const { monthlyEarnings, monthlyLosses, monthlyPnl } = req.body;
  //#2- Lleno una instacia de mi Schema
  const newFinanza = new finanzaModel({ monthlyEarnings, monthlyLosses, monthlyPnl });
  //#3- guardo en la base de datos
  await newFinanza.save();

  res.json({ message: "Product saved" });
};

//ELIMINAR
finanzaController.deleteFinanza = async (req, res) => {
  await finanzaModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Finanza deleted" });
};

//ACTUALIZAR
finanzaController.updateFinanza = async (req, res) => {
  //#1- pido los nuevos datos
  const { monthlyEarnings, monthlyLosses, monthlyPnl } = req.body;
  //#2- actualizo los datos
  await finanzaModel.findByIdAndUpdate(
    req.params.id,
    {
      monthlyEarnings, 
      monthlyLosses, 
      monthlyPnl
    },
    { new: true },
  );

  res.json({ message: "finanza updated" });
};

//select por id
finanzaController.getFinanzaById = async (req, res) => {
  try {
    const finanza = await finanzaModel.findById(req.params.id)
    if(!finanza){
      return res.status(404).json({message: "finanza not found"})
    }
    return res.status(200).json(finanza);
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "internal server error"})
  }
};

//select con diltro
finanzaController.getFinanzaByPriceRange = async (req, res) => {
  try {
    //solicitar datos
    const {min, max} = req.body;

    const finanza = await finanzaModel.find({
      price: {$gte: min, $lte: max}
    })

    if(!finanza){
      return res.status(404).json({message: "not finanza with this price range"})
    }

    return res.status(200).json(finanza)
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "internal server error"})
  }
};

export default finanzaController;
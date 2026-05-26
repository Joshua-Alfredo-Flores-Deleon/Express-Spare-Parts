import ventaModel from "../models/ventas.js";

import { v2 as cloudinary } from "cloudinary";

//Array de funciones
const ventaController = {};

//SELECT
ventaController.getAllVentas = async (req, res) => {
  try {
    const ventas = await ventaModel.find();
    return res.status(200).json(ventas);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//INSERT
ventaController.insertVenta = async (req, res) => {
  try {
    //Solicito los datos
    const { name, phone } = req.body;

    const newVenta = new ventaModel({
      name,
      phone,
      image: req.file.path,
      public_id: req.file.filename,
    });

    await newVenta.save();

    return res.status(200).json({ message: "Venta saved" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

//UPDATE
ventaController.updateVenta = async (req, res) => {
  try {
    //Solicitamos los datos
    const { name, phone } = req.body;

    const ventaFound = await ventaModel.findById(req.params.id);

    const updatedData = {
      name,
      phone,
    };

    //Si viene alguna imagen nueva
    if (req.file) {
      //Eliminar la imagen anterior
      await cloudinary.uploader.destroy(ventaFound.public_id);

      //Guardo la nueva imagen
      updatedData.image = req.file.path;
      updatedData.public_id = req.file.filename;
    }

    await ventaModel.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    return res.status(200).json({ message: "Venta updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

ventaController.deleteVenta = async (req, res) => {
  try {
    const ventaFound = await ventaModel.findById(req.params.id);

    //Elimino la imagen de Cloudinary
    await cloudinary.uploader.destroy(ventaFound.public_id);

    //Elimino al usuario de la base de datos
    await ventaModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Venta deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default ventaController;

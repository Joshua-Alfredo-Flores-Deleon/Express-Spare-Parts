import carritoModel from "../models/carritos.js";

import { v2 as cloudinary } from "cloudinary";

//Array de funciones
const carritoController = {};

//SELECT
carritoController.getAllCarritos = async (req, res) => {
  try {
    const carritos = await carritoModel.find();
    return res.status(200).json(carritos);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//INSERT
carritoController.insertCarrito = async (req, res) => {
  try {
    //Solicito los datos
    const { name, phone } = req.body;

    const newCarrito = new carritoModel({
      name,
      phone,
      image: req.file.path,
      public_id: req.file.filename,
    });

    await newCarrito.save();

    return res.status(200).json({ message: "Carrito saved" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "internal server error" });
  }
};

//UPDATE
carritoController.updateCarrito = async (req, res) => {
  try {
    //Solicitamos los datos
    const { name, phone } = req.body;

    const carritoFound = await carritoModel.findById(req.params.id);

    const updatedData = {
      name,
      phone,
    };

    //Si viene alguna imagen nueva
    if (req.file) {
      //Eliminar la imagen anterior
      await cloudinary.uploader.destroy(carritoFound.public_id);

      //Guardo la nueva imagen
      updatedData.image = req.file.path;
      updatedData.public_id = req.file.filename;
    }

    await carritoModel.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    return res.status(200).json({ message: "Carrito updated" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

carritoController.deleteCarrito = async (req, res) => {
  try {
    const carritoFound = await carritoModel.findById(req.params.id);

    //Elimino la imagen de Cloudinary
    await cloudinary.uploader.destroy(carritoFound.public_id);

    //Elimino al usuario de la base de datos
    await carritoModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Carrito deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default carritoController;

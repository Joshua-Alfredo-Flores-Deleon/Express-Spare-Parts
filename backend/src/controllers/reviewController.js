const reviewController = {};

//Import el Schema de la colección que
import reviewModel from "../models/review.js";

//SELECT
reviewController.getReview = async (req, res) => {
  const review = await reviewModel.find();
  res.json(review);
};

//INSERT
reviewController.insertReview = async (req, res) => {
  //#1- Solicito los datos a guardar
  const { ranking, title, experence, details, customerId, status } = req.body;
  //#2- Lleno una instacia de mi Schema
  const newReview = new reviewModel({ ranking, title, experence, details, customerId, status });
  //#3- guardo en la base de datos
  await newReview.save();

  res.json({ message: "review saved" });
};

//ELIMINAR
reviewController.deleteReview = async (req, res) => {
  await reviewModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};

//ACTUALIZAR
reviewController.updateReview = async (req, res) => {
  //#1- pido los nuevos datos
  const { ranking, title, experence, details, customerId, status } = req.body;
  //#2- actualizo los datos
  await reviewModel.findByIdAndUpdate(
    req.params.id,
    {
      ranking, 
      title, 
      experence, 
      details, 
      customerId, 
      status
    },
    { new: true },
  );

  res.json({ message: "review updated" });
};

//select por id
reviewController.getReviewById = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id)
    if(!review){
      return res.status(404).json({message: "review not found"})
    }
    return res.status(200).json(review);
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "internal server error"})
  }
};

//select con diltro
reviewController.getReviewByPriceRange = async (req, res) => {
  try {
    //solicitar datos
    const {min, max} = req.body;

    const review = await reviewModel.find({
      price: {$gte: min, $lte: max}
    })

    if(!review){
      return res.status(404).json({message: "not review with this price range"})
    }

    return res.status(200).json(review)
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({message: "internal server error"})
  }
};

export default reviewController;
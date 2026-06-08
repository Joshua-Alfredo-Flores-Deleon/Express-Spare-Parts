import express from "express";
import reviewController from "../controllers/reviewController.js";

//Router() nos ayuda a colocar los métodos
// que tendrá el endpoint
const router = express.Router();

router.route("/")
.get(reviewController.getReview)
.post(reviewController.insertReview);

router.route("/price-range")
.post(reviewController.getReviewByPriceRange);

router.route("/:id")
.put(reviewController.updateReview) 
.delete(reviewController.deleteReview)
.get(reviewController.getReviewById);


export default router;
import express from "express";
import generalReviewController from "../controllers/generalReviewController.js";

const router = express.Router();


router.get("/active", generalReviewController.getActiveReviews);
router.get("/stats", generalReviewController.getReviewStats);

router
  .route("/")
  .get(generalReviewController.getReviews)
  .post(generalReviewController.createReview);

router
  .route("/:id")
  .get(generalReviewController.getReviewById)
  .put(generalReviewController.updateReview)
  .delete(generalReviewController.deleteReview);

export default router;

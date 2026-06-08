import generalReviewModel from "../models/general_review.js";

const generalReviewController = {};

// GET ALL Obtener todas las reseñas
generalReviewController.getReviews = async (req, res) => {
  try {
    const reviews = await generalReviewModel
      .find()
      .populate("id_customer", "full_name email");
    return res.status(200).json(reviews);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


generalReviewController.getActiveReviews = async (req, res) => {
  try {
    const reviews = await generalReviewModel
      .find({ status: "Activo" })
      .populate("id_customer", "full_name");
    return res.status(200).json(reviews);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET BY ID
generalReviewController.getReviewById = async (req, res) => {
  try {
    const review = await generalReviewModel
      .findById(req.params.id)
      .populate("id_customer", "full_name email");
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST 
generalReviewController.createReview = async (req, res) => {
  try {
    const { ranking, title, experience_type, details, id_customer, status } = req.body;

    if (!ranking || !title || !details) {
      return res
        .status(400)
        .json({ message: "Fields ranking, title and details are required" });
    }

    if (ranking < 1 || ranking > 5) {
      return res.status(400).json({ message: "Ranking must be between 1 and 5" });
    }

    const newReview = new generalReviewModel({
      ranking,
      title,
      experience_type,
      details,
      id_customer,
      status: status || "Activo",
    });

    await newReview.save();
    return res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Actualizar reseña
generalReviewController.updateReview = async (req, res) => {
  try {
    const { ranking, title, experience_type, details, status } = req.body;

    if (ranking && (ranking < 1 || ranking > 5)) {
      return res.status(400).json({ message: "Ranking must be between 1 and 5" });
    }

    const reviewUpdated = await generalReviewModel.findByIdAndUpdate(
      req.params.id,
      { ranking, title, experience_type, details, status },
      { new: true }
    );

    if (!reviewUpdated) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE
generalReviewController.deleteReview = async (req, res) => {
  try {
    const reviewDeleted = await generalReviewModel.findByIdAndDelete(req.params.id);

    if (!reviewDeleted) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


generalReviewController.getReviewStats = async (req, res) => {
  try {
    const stats = await generalReviewModel.aggregate([
      { $match: { status: "Activo" } },
      {
        $group: {
          _id: null,
          totalReviews: { $sum: 1 },
          averageRanking: { $avg: "$ranking" },
          rankingDistribution: {
            $push: "$ranking"
          }
        }
      }
    ]);

    if (!stats.length) {
      return res.status(200).json({ totalReviews: 0, averageRanking: 0, distribution: {} });
    }

    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    stats[0].rankingDistribution.forEach((r) => {
      dist[r] = (dist[r] || 0) + 1;
    });

    return res.status(200).json({
      totalReviews: stats[0].totalReviews,
      averageRanking: stats[0].averageRanking.toFixed(1),
      distribution: dist,
    });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default generalReviewController;

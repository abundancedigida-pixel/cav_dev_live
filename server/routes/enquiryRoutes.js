import express from "express";
import * as enquiryController from "../controllers/enquiryController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public API - Customer submits enquiry
router.post("/create", enquiryController.createEnquiryController);

// Login required - contains customer personal data
router.get("/view-all", verifyToken, enquiryController.getAllEnquiriesController);

router.get("/view-one/:id", verifyToken, enquiryController.getEnquiryByIdController);

// Login required - Update enquiry details
router.put("/update/:id", verifyToken, enquiryController.updateEnquiryController);

// Login required - Update enquiry status
router.patch(
  "/status/:id",
  verifyToken,
  enquiryController.updateEnquiryStatusController
);

// Login required - Permanently delete enquiry
router.delete("/delete/:id", verifyToken, enquiryController.deleteEnquiryController);

// Login required - Send email to customer
router.post(
  "/send-email/:id",
  verifyToken,
  enquiryController.sendEnquiryEmailController
);

export default router;
import { Router } from "express";
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js";

const router = Router();
router.use("/auth", authRoutes);

router.use("/property",propertyRoutes);

router.use("/project",projectRoutes);

router.use("/enquiry",enquiryRoutes);

router.use("/blogs",blogRoutes);

router.use("/dashboard",dashboardRoutes);

router.use("/notification", notificationRoutes);


export default router;
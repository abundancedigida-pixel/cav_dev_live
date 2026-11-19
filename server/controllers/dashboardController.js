
import * as websiteDashboardService from "../services/dashboardService.js";

export const getWebsiteDashboardController = async (req, res) => {
  try {
    const result =
      await websiteDashboardService.getWebsiteDashboardService();

    return res.status(200).json({
      success: true,
      message: "Website dashboard fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error("Website dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch website dashboard",
    });
  }
};

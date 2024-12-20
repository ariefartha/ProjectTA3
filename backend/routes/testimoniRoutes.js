import express from "express";
import { postTestimoni, getTestimoni, deleteTestimoni, getMyPost } from "../controllers/testimoniController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();
router.post("/posttestimoni", protectRoute, postTestimoni);
router.get("/getmypost/:id", protectRoute, getMyPost);
router.get("/gettestimoni", getTestimoni);
router.delete("/deletetestimoni/:id", protectRoute, deleteTestimoni);

export default router;
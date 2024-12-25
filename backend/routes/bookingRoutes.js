import express  from "express";
import { createPacket, deleteMyOrder, deletePacket, getPacket, getUserOrder, orderPacket } from "../controllers/bookingController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();
router.post("/order/", orderPacket); //
router.post("/packet", createPacket);
router.post("/orders/", getUserOrder);
router.get("/getpacket", getPacket); //
router.delete("/deleteorder/", deleteMyOrder);
router.delete("/packet/:id", deletePacket);  //

export default router;
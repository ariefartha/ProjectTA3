import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { deleteSchedulArray, getAllUserScheduleById, getMySchedule, addSchedule, getAllSchedule, updatedScheduleFromAdmin, updatedScheduleFromInstructure } from "../controllers/scheduleController.js";

const router = express.Router();

router.delete("/schedule/:id/:scheduleId", protectRoute, deleteSchedulArray);
router.put("/schedule/:id", protectRoute, addSchedule);
router.put("/updatestatusbyadmin/:id", protectRoute, updatedScheduleFromAdmin);
router.put("/updatestatusbyinstructure/:id", protectRoute, updatedScheduleFromInstructure);
router.get("/schedule/:id", getAllUserScheduleById);
router.get("/byuserid/:id", protectRoute , getMySchedule); 
router.get("/allschedule", protectRoute, getAllSchedule);


export default router;
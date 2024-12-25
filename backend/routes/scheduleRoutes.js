import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { deleteSchedulArray, getAllUserScheduleById, getMySchedule, addSchedule, getAllSchedule, updatedScheduleFromAdmin, updatedScheduleFromInstructure } from "../controllers/scheduleController.js";

const router = express.Router();

router.delete("/schedule/:id/:scheduleId", deleteSchedulArray); //
router.put("/schedule/:id", addSchedule); //
router.put("/updatestatusbyadmin/:id", updatedScheduleFromAdmin); //
router.put("/updatestatusbyinstructure/:id", updatedScheduleFromInstructure); //
router.get("/schedule/:id", getAllUserScheduleById);
router.get("/byuserid/:id", getMySchedule);  //
router.get("/allschedule", getAllSchedule); //


export default router;
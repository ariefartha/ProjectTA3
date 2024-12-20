import express from 'express'
import { Success, manualPayment, midtransPayment, getAllPayment, deletePayment, getMyPayment, updatePaymentStatus } from '../controllers/paymentController.js';
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router();

router.post("/manualpayment", protectRoute, manualPayment);
router.post("/midtranspayment", protectRoute, midtransPayment);
router.post("/success", protectRoute, Success);
router.post("/mypaymentdetail", protectRoute, getMyPayment);
router.get("/paymentlist", protectRoute, getAllPayment);
router.delete("/deletepayment/:id", protectRoute, deletePayment);
router.put("/status/:id", protectRoute, updatePaymentStatus);

export default router;
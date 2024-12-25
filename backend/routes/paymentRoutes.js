import express from 'express'
import { Success, manualPayment, midtransPayment, getAllPayment, deletePayment, getMyPayment, updatePaymentStatus } from '../controllers/paymentController.js';
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router();

router.post("/manualpayment", manualPayment); //
router.post("/midtranspayment", midtransPayment); //
router.post("/success", Success); //
router.post("/mypaymentdetail", getMyPayment);  //
router.get("/paymentlist", getAllPayment); //
router.delete("/deletepayment/:id", deletePayment); //
router.put("/status/:id", updatePaymentStatus); //

export default router;
import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  payment_status: {
    type: String,
    default: "",
  },
  manualPaymentImg: {
    type: String,
    default: "",
  },
  typePayment: {
    type: String,
    default: "",
  },
  bookingBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  username: {
    type: String,
  },
  packetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Packet",
  },
  packetName: {
    type: String,
  },
  price: {
    type: Number,
  },
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;

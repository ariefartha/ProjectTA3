import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    bookingBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    packetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Packet",
      required: true,
    },
    packetName: {
      type: String,
    },
    price: {
      type: Number,
    },
    paymentImg: {
      type: String,
      default: "",
    },
    packetCategory: {
      type: String,
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

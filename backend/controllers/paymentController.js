import Booking from "../models/bookingModel.js";
import cloudinary from "cloudinary";
import Payment from "../models/paymentModel.js";
import midtransClient from 'midtrans-client';
import User from "../models/userModel.js";

const manualPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    let { manualPaymentImg } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Order detail tidak ditemukan" });
    }

    if (!manualPaymentImg) {
      return res
        .status(404)
        .json({ error: "Silahkan Upload Bukti Pembayaran" });
    }

    if (manualPaymentImg) {
      if (booking.manualPaymentImg) {
        await cloudinary.uploader.destroy(
          booking.manualPaymentImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(manualPaymentImg);
      manualPaymentImg = uploadedResponse.secure_url;
    }

    const newPayment = new Payment({
      bookingId: booking._id,
      bookingBy: booking.bookingBy,
      username: booking.username,
      packetId: booking.packetId,
      packetName: booking.packetName,
      price: booking.price,
      payment_status: "menunggu verifikasi",
      typePayment: "manual",
      manualPaymentImg: manualPaymentImg,
    });
    
    await newPayment.save();
    await Booking.findByIdAndDelete(bookingId);

    res.status(201).json({message: "Pembayaran Berhasil"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const midtransPayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Order detail tidak ditemukan" });
    }

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: booking._id,
        gross_amount: booking.price,
      },
      customer_details: {
        first_name: booking.username,
      },
      callbacks: {
        finish_redirect_url: "/success",
      },
    };

    snap.createTransaction(parameter)
      .then(async (transaction) => {
        const newPayment = new Payment({
          bookingId: booking._id,
          bookingBy: booking.bookingBy,
          username: booking.username,
          packetId: booking.packetId,
          packetName: booking.packetName,
          price: booking.price,
          payment_status: "sukses",
          typePayment: "virtual",
          midtransResponse: JSON.stringify(transaction),
        });

        await newPayment.save();
        await Booking.findByIdAndDelete(bookingId);

        const token = transaction.token;
        res.status(200).json({
          message: "Pembayaran berhasil",
          token: token,
          redirect_url: transaction.redirect_url,
        });
      })
      .catch((error) => {
        res.status(400).json({ error: error.message });
      });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Success = async (req, res) => {
  const { bookingId, midtransResult } = req.body;
  try {
    // Update status pembayaran di database
    const payment = await Payment.findOneAndUpdate(
      { bookingId: bookingId },
      { payment_status: "settlement", midtransResponse: midtransResult }
    );
    
    if (!payment) {
      return res.status(404).json({ error: "Pembayaran tidak di temukan" });
    }

    res.status(200).json({ message: "Pembayaran Telah Berhasil" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//admin
const getAllPayment = async (req, res) => {
  try {
    const payment = await Payment.find({}).sort({ createAt: -1 });
    if( !payment) {
      return res.status(404).json({ error: "Tidak ada data pembayaran"})
    } else {
      res.status(200).json(payment);
    }
  } catch (err) {
    res.status(500).json({error: err.message})
  }
} 

//admin
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
    if(!payment) {
      return res.status(404).json({error: "Id pembayaran tidak di temukan"});
    }
    await Payment.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Data pembayaran berhasil di hapus"})
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

const getMyPayment = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan." });
    }

    const payments = await Payment.find({ bookingBy: userId }).sort({ createdAt: -1 });
    if (payments.length === 0) {
      return res.status(404).json({ error: "Tidak ada pembayaran" });
    }

    res.status(200).json(payments); 
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    const {payment_status} = req.body;

    if(!payment) {
      return res.status(404).json({error: "Id pembayaran tidak di temukan"});
    }

    if(payment_status) {
      payment.payment_status = payment_status;
    }
    await payment.save();
    res.status(200).json({ message: "Status Pembayaran berhasil di perbaharui" });
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
}

export { manualPayment, midtransPayment, Success, getAllPayment, deletePayment, getMyPayment, updatePaymentStatus };

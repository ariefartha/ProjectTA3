import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js"
import Packet from "../models/PacketsModel.js"

const createPacket = async (req, res) => {
  try {
    const { packetName, price, text1, text2, text3, category } = req.body;

    if (!packetName || !price || !category || !text1 || !text2 || !text3) {
      return res.status(400).json({ message: "Form belum di isi" });
    }

    const newPacket = new Packet({
      packetName,
      price,
      text1,
      text2,
      text3,
      category,
    });
    await newPacket.save();
    res.status(201).json({ message: "Paket berhasil di tambahkan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

const deletePacket = async(req,res) => {
  try {
    const packet = await Packet.findById(req.params.id);
    if(!packet) {
      return res.status(404).json({error: "id paket tidak di temukan"});
    }
    await Packet.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Paket berhasil di hapus"});
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

const getPacket = async (req, res) => {
  try {
    const data = await Packet.find().lean();
    if (!data || data.length === 0) {
      res.status(404).json({ error: "tidak ada testimoni" });
    } else {
      res.status(200).json(data); 
    }
  } catch (err) {
    res.status(500).json({ error: err.message }); 
    console.log(err);
  }
};

const orderPacket = async (req, res) => {
  try {
    const { userId, packetId, paymentImg } = req.body;

    if (!userId || !packetId) {
      return res.status(400).json({ error: "User ID atau Packet ID diperlukan." });
    }

    const packet = await Packet.findById(packetId);
    if (!packet) {
      return res.status(404).json({ error: "Paket tidak ditemukan." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan." });
    }

    if (!user.username) {
      return res.status(400).json({ error: "Username tidak valid." });
    }

    const existingBooking = await Booking.findOne({ bookingBy: user._id });
    if (existingBooking) {
      return res.status(400).json({ error: `Anda sudah melakukan Booking dengan paket ${packet.packetName}` });
    }

    const newBooking = new Booking({
      bookingBy: user._id,
      username: user.username,
      email: user.email,
      packetId: packet._id,
      packetName: packet.packetName,
      packetCategory: packet.category,
      price: packet.price,
      paymentImg: paymentImg || "",
    });

    await newBooking.save();
    res.status(201).json({ message: "Pemesanan berhasil dibuat.", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: err.message });

  }
};

const getUserOrder = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID diperlukan." });
    }

    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ error: "Pengguna tidak ditemukan." });
    }

    const booking = await Booking.findOne({ bookingBy: user._id }); 
    if (!booking) {
      return res.status(404).json({ error: "Order tidak ditemukan." });
    }
    res.status(200).json(booking); 
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
};

const deleteMyOrder = async (req, res) => {
  try {
    const userId = req.body.userId;
    if(!userId) {
      return res.status(404).json({error: "User tidak di temukan"});
    }
    
    const user = await User.findById(userId);
    if(!user) {
      return res.status(404).json({error: "User tidak di temukan"});
    }

    await Booking.findOneAndDelete({bookingBy: user._id});
    res.status(200).json({message: "Pemesanan Berhasil di Hapus"});
  } catch (err) {
    res.status(500).json({error: err.message});
  }
}


export { createPacket, getPacket, orderPacket, getUserOrder, deleteMyOrder, deletePacket };

import { text } from "express";
import User from "../models/userModel.js";
import Testimoni from "../models/testimoniModel.js";

const postTestimoni = async (req, res) => {
  try {
    const { postedBy, comments } = req.body;

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ error: "User tidak di temukan" });
    }

    if (!postedBy || !comments) {
      return res
        .status(400)
        .json({ error: "Form Perlu di isi terlebih dahulu" });
    }

    if (user._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({error: "Unautorized"});
    }

    const maxLength = 150;
    if (text.length > maxLength) {
      return res
        .status(400)
        .json({ error: `kalimat harus kurang dari ${maxLength} kata` });
    }

    if (user.graduated === false) {
      return res.status(400).json({ error: "Anda hanya bisa melakukan testimoni setelah lulus mengikuti kursus mengemudi" });
    }

    const checkTestimoni = await Testimoni.findOne({ postedBy: user._id });
    if (checkTestimoni) {
      return res.status(400).json({ error: "Anda sudah melakukan testimoni sebelumnya" });
    }

    const newTestimoni = new Testimoni({ postedBy, comments});

    await newTestimoni.save();
    res.status(201).json({ message: "Testimoni anda berhasil di kirim" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

const deleteTestimoni = async (req, res) => {
  try {
    const testimoni = await Testimoni.findById(req.params.id);
    if(!testimoni) {
      return res.status(404).json({error: "Id Testimoni tidak di temukan"});
    }
    await Testimoni.findByIdAndDelete(req.params.id);
    res.status(201).json({message: "Testimoni berhasil di hapus"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getTestimoni = async (req, res) => {
  try {
    const data = await Testimoni.find({}).sort({createdAt: -1})
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

const getMyPost = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }
    const testimoni = await Testimoni.findOne({ postedBy: userId });
    if (!testimoni) {
      return res.status(404).json({ error: "Anda tidak memiliki postingan testimoni" });
    } else {
      res.status(200).json(testimoni); 
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export { postTestimoni, getTestimoni, deleteTestimoni, getMyPost };

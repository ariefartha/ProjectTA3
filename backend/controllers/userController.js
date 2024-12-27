import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Testimoni from "../models/testimoniModel.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";

const signupUser = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!username || !email || !password || !address || !phone) {
      return res.status(400).json({ error: "Silahkan lengkapi form" });
    }

    if (user) {
      return res
        .status(400)
        .json({ error: "Nama pengguna atau email telah di gunakan" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
      role: "user",
    });
    await newUser.save();

    // if (newUser) {
    //   generateTokenAndSetCookie(newUser._id, res);
    //   res.status(201).json({
    //     _id: newUser._id,
    //     username: newUser.username,
    //     email: newUser.email,
    //     password: newUser.password,
    //     address: newUser.address,
    //     phone: newUser.phone,
    //   });
    if (newUser) {
      res
        .status(201)
        .json({ message: "Pendaftaran anda berhasil, Silahkan Login " });
    } else {
      res.status(400).json({ error: "data tidak valid" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in signupUser", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "username atau password salah" });
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      schedule: user.schedule,
      address: user.address,
      certificate: user.certificate,
      graduated: user.graduated,
      totalStudy: user.totalStudy,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in LoginUser", err.message);
  }
};

const loginWithGoogle = async (req, res) => {
  const { username, email, phone} = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      // If user exists, generate token and set cookie
      const { password, ...rest } = user._doc;
      generateTokenAndSetCookie(user._id, res);
      res.status(200).json(rest);
    } else {
      // If user doesn't exist, create a new user
      const generatedPassword = Math.random().toString(36).slice(-8);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(generatedPassword, salt);

      const newUser = new User({
        username:
          username.toLowerCase().split(" ").join("") +
          Math.floor(Math.random() * 10000).toString(),
        email,
        password: hashedPassword,
        phone,
      });

      user = await newUser.save();

      const { password: _, ...rest } = user._doc;
      generateTokenAndSetCookie(user._id, res);
      res.status(201).json(rest);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Anda berhasil keluar" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in LogoutUser", err.message);
  }
};

const updateUser = async (req, res) => {
  const { username, email, password, address, phone } = req.body;
  let paymentImg = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User tidak di temukan" });

    // if (req.params.id !== userId.toString())
    //   return res
    //     .status(400)
    //     .json({ error: " You can't updates other user profile" });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (paymentImg) {
      if (user.paymentImg) {
        await cloudinary.uploader.destroy(
          user.paymentImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await claudinary.uploader.upload(paymentImg);
      paymentImg = uploadedResponse.secure_url;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.paymentImg = paymentImg || user.paymentImg;
    user.address = address || user.address;
    user.phone = phone || user.phone;

    user = await user.save();
    res.status(200).json({ message: "profile berhasil di perbaharui", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in updatedUser", err.message);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { username, email, address, phone, schedule, graduated } = req.body;
    let { certificate } = req.body;
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User tidak di temukan" });
    }

    if (certificate) {
      if (user.certificate) {
        await cloudinary.uploader.destroy(
          user.certificate.split("/").pop().split(".")[0]
        );
      }
      // const uploadedResponse = await claudinary.uploader.upload(paymentImg);
      const uploadedResponse = await cloudinary.uploader.upload(certificate);
      certificate = uploadedResponse.secure_url;
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.address = address || user.address;
    user.certificate = certificate || user.certificate;
    user.schedule = schedule || user.schedule;
    user.phone = phone || user.phone;
    user.graduated = graduated || user.graduated;

    user = await user.save();
    res
      .status(200)
      .json({ message: "User profile berhasil di perbaharui", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in updateUserById", err.message);
  }
};

const uploadUserCertificate = async (req, res) => {
  try {
    let { certificate } = req.body;
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User tidak di temukan" });
    }

    if (certificate) {
      if (user.certificate) {
        await cloudinary.uploader.destroy(
          user.certificate.split("/").pop().split(".")[0]
        );
      }
      // const uploadedResponse = await claudinary.uploader.upload(paymentImg);
      const uploadedResponse = await cloudinary.uploader.upload(certificate);
      certificate = uploadedResponse.secure_url;
    }
    user.certificate = certificate || user.certificate;
    user = await user.save();
    res.status(200).json({ message: "Sertifikat berhasil di upload" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (!user) {
      return res.status(404).json({ error: "User tidak di temukan" }); 
    }
    if (user.certificate) {
      await cloudinary.uploader.destroy(
        user.certificate.split("/").pop().split(".")[0]
      );
      user.certificate = null;
      await user.save(); 
    } else {
      return res.status(404).json({ error: "Sertifikat tidak di temukan" }); 
    }
    res.status(200).json({ message: "Sertifikat berhasil dihapus" }); 
  } catch (err) {
    res.status(500).json({ error: err.message }); 
  }
};

const updateMyProfile = async (req, res) => {
  const userId = req.body;
  try {
    const { username, email, address, phone } = req.body;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User tidak di temukan" });
    }

    // Update data user dengan data baru atau pertahankan data lama jika tidak ada perubahan
    user.username = username || user.username;
    user.email = email || user.email;
    user.address = address || user.address;
    user.phone = phone || user.phone;

    await user.save();
    res
      .status(200)
      .json({
        message: "User profile berhasil di perbaharui",
        updatedUser: user,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// admin site, get user list by user=role
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).sort({ createAt: -1 });
    if (!users || users.length === 0) {
      res.status(404).json({ error: "Tidak ada data user ditemukan" });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// admin site, get user list by instructure=role
const getAllInstructure = async (req, res) => {
  try {
    const users = await User.find({ role: "instructure" }).sort({
      createAt: -1,
    });
    if (!users || users.length === 0) {
      res.status(404).json({ error: "Tidak ada data user ditemukan" });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user tidak di temukan" });
    }
    if (user.paymentImg) {
      const payImg = user.paymentImg.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(payImg);
    }
    const schedules = user.schedule;
    for (const schedule of schedules) {
      const instructor = await User.findOne({
        username: schedule.instructure,
        role: "instructure",
      });
      if (instructor) {
        instructor.schedule = instructor.schedule.filter(
          (instSchedule) =>
            instSchedule.student !== user.username ||
            instSchedule.startDate.toString() !== schedule.startDate.toString()
        );
        await instructor.save();
      }
    }
    await Testimoni.deleteMany({ postedBy: user._id });
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User berhasil di hapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).jon({ error: "user tidak di temukan" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const AddInstructure = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (!username || !email || !password || !phone) {
      return res.status(400).json({ error: "Silahkan lengkapi form" });
    }

    if (user) {
      return res
        .status(400)
        .json({ error: "Nama pengguna atau email telah di gunakan" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      role: "instructure",
    });
    await newUser.save();
    if (newUser) {
      res
        .status(201)
        .json({ message: "Instruktur berhasil di tambahkan" });
    } else {
      res.status(400).json({ error: "data tidak valid" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in AddInstructure", err.message);
  }
};

export {
  uploadUserCertificate,
  getAllInstructure,
  AddInstructure,
  updateUserById,
  updateMyProfile,
  signupUser,
  loginUser,
  logoutUser,
  updateUser,
  getAllUser,
  deleteUser,
  getUserById,
  loginWithGoogle,
  deleteCertificate
};

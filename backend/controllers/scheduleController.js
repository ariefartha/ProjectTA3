import User from "../models/userModel.js";
import Payment from "../models/paymentModel.js"

// admin site -> input new schedule untuk user
const addSchedule = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { startDate, endDate, instructure } = req.body;

    if (!user) {
      return res.status(404).json({ error: "User tidak di temukan" });
    }

    if (!startDate || !endDate || !instructure) {
      return res.status(400).json({ error: "Silahkan lengkapi form" });
    }

    const instructor = await User.findOne({ username: instructure, role: "instructure" });
    if (!instructor) {
      return res.status(404).json({ error: "Instruktur Tidak di temukan" });
    }

    const payment = await Payment.findOne({ bookingBy: user._id });
    if (!payment || payment.payment_status === null || payment.payment_status === "menunggu verifikasi") {
      return res.status(400).json({ error: "Siswa ini belum melakukan pembayaran atau sedang menunggu verifikasi." });
    }

    const existingSchedule = instructor.schedule.find(
      (schedule) => new Date(schedule.startDate).getTime() === new Date(startDate).getTime()
    );

    if (existingSchedule) {
      return res.status(400).json({ error: "Instruktur ini sudah memiliki jadwal dengan siswa lain" });
    }

    const inputScheduleForStudent = {
      startDate,
      endDate,
      status: "Terjadwal",
      instructure: instructor.username,
    };
    user.schedule.push(inputScheduleForStudent);
    const inputScheduleForInstructure = {
      startDate,
      endDate,
      status: "Terjadwal",
      student: user.username,
    };
    instructor.schedule.push(inputScheduleForInstructure);

    await user.save();
    await instructor.save();
    res.status(200).json({ message: "Jadwal telah berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatedScheduleFromAdmin = async (req, res) => {
  try {
    const { scheduleId, status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status tidak boleh kosong" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    // Cari jadwal user berdasarkan scheduleId
    const schedule = user.schedule.find((sch) => sch._id.toString() === scheduleId);
    if (!schedule) {
      return res.status(404).json({ error: "Jadwal tidak ditemukan" });
    }

    // MODIFIKASI: Simpan status awal sebelum di-update
    const initialStatus = schedule.status;
    schedule.status = status;
    await user.save();


    if (initialStatus !== "Selesai" && status === "Selesai") {
      user.totalStudy += 1; 
    } else if (initialStatus === "Selesai" && (status === "Terjadwal" || status === "Cancel")) {
      user.totalStudy -= 1; 
    }
    await user.save(); 

    // Cari instruktur 
    const instructor = await User.findOne({
      username: schedule.instructure,
      role: "instructure",
    });

    if (instructor) {
      const instructorSchedule = instructor.schedule.find(
        (searchSchedule) =>
          searchSchedule.startDate.toString() === schedule.startDate.toString() &&
          searchSchedule.student === user.username
      );

      if (instructorSchedule) {
        instructorSchedule.status = status;
        await instructor.save();
      }
    }

    res.status(200).json({ message: "Status Belajar telah berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updatedScheduleFromInstructure = async (req, res) => {
  try {
    const { scheduleId, status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "Status tidak boleh kosong" });
    }

    const instructor = await User.findById(req.params.id);
    if (!instructor || instructor.role !== "instructure") {
      return res.status(404).json({ error: "Instruktur tidak ditemukan" });
    }
    const instructorSchedule = instructor.schedule.find(
      (schedule) => schedule._id.toString() === scheduleId
    );

    if (!instructorSchedule) {
      return res.status(404).json({ error: "Jadwal tidak ditemukan pada instruktur" });
    }
    const initialStatus = instructorSchedule.status;
    instructorSchedule.status = status;
    await instructor.save();

    const user = await User.findOne({
      username: instructorSchedule.student,
      "schedule.startDate": instructorSchedule.startDate
    });

    if (user) {
      // Temukan jadwal siswa berdasarkan startDate dan nama instruktur
      const userSchedule = user.schedule.find(
        (schedule) =>
          schedule.startDate.toString() === instructorSchedule.startDate.toString() &&
          schedule.instructure === instructor.username
      );

      if (userSchedule) {
        // Perbarui status pada jadwal siswa
        userSchedule.status = status;
        if (initialStatus !== "Selesai" && status === "Selesai") {
          user.totalStudy += 1; 
        } else if (initialStatus === "Selesai" && (status === "Terjadwal" || status === "Cancel")) {
          user.totalStudy -= 1; 
        }
        await user.save(); 
      }
    }
    res.status(200).json({ message: "Status telah berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//untuk admin site => get all user uschedule by id
const getAllUserScheduleById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("schedule");

    if (!user) {
      return res.status(404).json({ error: "User tidak di temukan" });
    }
    res.json(user.schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//untuk user site => get my uschedule by id
const getMySchedule = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("schedule");
    if (!user) {
      return res.status(404).json({ error: "User tidak di temukan" });
    }

    if(req.params.id !== user._id.toString())
    return res.status(400).json({error: "Bukan Jadwal Anda"})
  
    const sortedSchedule = user.schedule.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    res.json({ schedule: sortedSchedule });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//untuk admin site => delete uschedule by id
const deleteSchedulArray = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }
    const scheduleIndex = user.schedule.findIndex(
      (schedule) => schedule._id.toString() === req.params.scheduleId
    );
    if (scheduleIndex === -1) {
      return res.status(404).json({ error: "Jadwal tidak ditemukan" });
    }
    const scheduleToDelete = user.schedule[scheduleIndex];
    // Hapus jadwal pada instruktur yang memiliki jadwal yang sama
    const instructor = await User.findOne({
      username: scheduleToDelete.instructure,
      role: "instructure",
    });
    if (instructor) {
      instructor.schedule = instructor.schedule.filter(
        (instSchedule) =>
          instSchedule.student !== user.username ||
          instSchedule.startDate.toString() !== scheduleToDelete.startDate.toString()
      );
      await instructor.save();
    }
    user.schedule.splice(scheduleIndex, 1);
    await user.save();
    res.status(200).json({ message: "Jadwal berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// fetch jadwal untuk role = user
const getAllSchedule = async (req, res) => {
  try {
    const users = await User.find({
      role: 'user',
      "schedule.startDate": { $exists: true },
      "schedule.endDate": { $exists: true },
    });

    if (!users.length) {
      return res.status(404).json({ error: "Tidak ada jadwal yang tersedia" });
    }

    const allSchedules = users.map(user => {
      return {
        userId: user._id,
        username: user.username,
        phone: user.phone,
        schedules: user.schedule.map(schedule => ({
          startDate: schedule.startDate,
          endDate: schedule.endDate,
          status: schedule.status,
          instructure: schedule.instructure,
          _id: schedule._id
        }))
      };
    });

    res.status(200).json(allSchedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { addSchedule, updatedScheduleFromInstructure, getAllUserScheduleById, deleteSchedulArray, getMySchedule, getAllSchedule, updatedScheduleFromAdmin};
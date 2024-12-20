import mongoose, { Schema } from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true, 
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 6,
    },
    role: {
      type: String,
      require: true,
      default: "user",
    },
    schedule: [
      {
        startDate: {
          type: String,
          require: true,
        },
        endDate: {
          type: String,
          require: true,
        },
        status: {
          type: String,
          default: "",
        },
        instructure: {
          type: String,
          require: true,
        },
        student: {
          type: String,
          require: true,
        }
      },
    ],
    address: {
      type: String,
      require: true,
    },
    graduated: {
      type: Boolean,
      default: "false",
    },
    phone: {
      type: String,
      require: true,
    },
    certificate: {
      type: String,
      default: "",
    },
    totalStudy: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

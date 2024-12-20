import mongoose from "mongoose";

const testimoniSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    comments: {
      type: String,
      required: true,
      maxLength: 150,
    },
    username: {
      type: "String",
    },
  },
  { timestamps: true }
);

const Testimoni = mongoose.model("Testimoni", testimoniSchema);
export default Testimoni;

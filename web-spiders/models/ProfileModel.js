const { Schema, model } = require("mongoose");

let ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "auth",
      require: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    city: {
      type: String,
    },
    photo: {
      type: [""],
      defult:
        "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    purchase: {
      type: [""],
    },
  },
  { timestamps: true }
);

module.exports = model("profile", ProfileSchema);

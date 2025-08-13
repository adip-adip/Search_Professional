import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
      default: [],
    },
    activationToken: String,
    activeFor: Date,
    role: {
      type : String,
      enum : ["admin", "user"],
      default : "user"
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
    }
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

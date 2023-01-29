import mongoose, { Schema } from "mongoose";

const parroquiaSchema: Schema = new mongoose.Schema({
  descripcion: String,
  ciudad: {
    ref: "Ciudad",
    type: mongoose.Types.ObjectId,
  },
});

const Parroquia =
  mongoose.models.Parroquia || mongoose.model("Parroquia", parroquiaSchema);

export default Parroquia;

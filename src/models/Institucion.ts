import mongoose, { Schema } from "mongoose";

const institucionSchema: Schema = new mongoose.Schema({
  descripcion: String,
  direccion: String,
  parroquia: {
    ref: "Parroquia",
    type: mongoose.Types.ObjectId,
  },
});

const Institucion =
  mongoose.models.Institucion ||
  mongoose.model("Institucion", institucionSchema);

export default Institucion;

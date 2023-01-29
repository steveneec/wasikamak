import mongoose, { Schema } from "mongoose";

const terapiaSchema: Schema = new mongoose.Schema({
  descripcion: String,
});

const Terapia =
  mongoose.models.Terapia || mongoose.model("Terapia", terapiaSchema);

export default Terapia;

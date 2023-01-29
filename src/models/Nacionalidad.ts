import mongoose, { Schema } from "mongoose";

const nacionalidadSchema: Schema = new mongoose.Schema({
  descripcion: String,
});

const Nacionalidad =
  mongoose.models.Nacionalidad ||
  mongoose.model("Nacionalidad", nacionalidadSchema);

export default Nacionalidad;

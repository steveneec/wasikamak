import mongoose, { Schema } from "mongoose";

const especialidadSchema: Schema = new mongoose.Schema({
  descripcion: String,
});

const Especialidad =
  mongoose.models.Especialidad ||
  mongoose.model("Especialidad", especialidadSchema);

export default Especialidad;

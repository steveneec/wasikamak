import mongoose, { Schema } from "mongoose";

const nivelRiesgoSchema: Schema = new mongoose.Schema({
  descripcion: String,
});

const NivelRiesgo =
  mongoose.models.NivelRiesgo ||
  mongoose.model("NivelRiesgo", nivelRiesgoSchema);

export default NivelRiesgo;

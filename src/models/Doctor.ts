import mongoose, { Schema } from "mongoose";

const doctorSchema: Schema = new mongoose.Schema({
  apellidos: String,
  nombres: String,
  cedula: String,
  fechaNacimiento: Date,
  sexo: String,
  direccion: String,
  telefonoFijo: String,
  celular: String,
  disponible: Boolean,
  institucion: {
    ref: "Institucion",
    type: mongoose.Types.ObjectId,
  },
  especialidad: {
    ref: "Especialidad",
    type: mongoose.Types.ObjectId,
  },
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;

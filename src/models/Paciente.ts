import mongoose, { Schema } from "mongoose";

const pacienteSchema: Schema = new mongoose.Schema({
  apellidos: String,
  nombres: String,
  cedula: String,
  fechaNacimiento: Date,
  sexo: String,
  medicinaHabitual: String,
  direccion: String,
  telefonoFijo: String,
  celular: String,
  nacionalidad: {
    ref: "Nacionalidad",
    type: mongoose.Schema.Types.ObjectId,
  },
  riesgo: {
    ref: "NivelRiesgo",
    type: mongoose.Schema.Types.ObjectId,
  },
  contactos: [
    {
      ref: "Contacto",
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Paciente =
  mongoose.models.Paciente || mongoose.model("Paciente", pacienteSchema);

export default Paciente;

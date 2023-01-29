import mongoose, { Schema } from "mongoose";

const citaSchema: Schema = new mongoose.Schema({
  paciente: {
    ref: "Paciente",
    type: mongoose.Types.ObjectId,
  },
  doctor: {
    ref: "Doctor",
    type: mongoose.Types.ObjectId,
  },
  fecha: Date,
  observacion: String,
  proximaVisita: Date,
  estado: {
    type: String,
    enum: {
      values: ["agendado", "ejecutado"],
      message: "{VALUE} no es soportado",
    },
  },
});

const Cita = mongoose.models.Cita || mongoose.model("Cita", citaSchema);

export default Cita;

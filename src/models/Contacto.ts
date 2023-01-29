import mongoose, { Schema } from "mongoose";

const contactoSchema: Schema = new mongoose.Schema({
  apellidos: String,
  nombres: String,
  celular: String,
});

const Contacto =
  mongoose.models.Contacto || mongoose.model("Contacto", contactoSchema);

export default Contacto;

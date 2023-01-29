import mongoose, { Schema } from "mongoose";

const ciudadSchema: Schema = new mongoose.Schema({
  descripcion: String,
});

const Ciudad = mongoose.models.Ciudad || mongoose.model("Ciudad", ciudadSchema);

export default Ciudad;

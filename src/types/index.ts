import { ReactElement } from "react";

export type navOptionType = {
  icon: ReactElement;
  label: string;
  route: string;
};

export type citeType = {
  paciente: string;
  doctor: string;
  institucion: string;
  direccion: string;
  fecha: Date;
  terapia: string;
  estado: string;
};

export type actionHeaderType = {
  icon: ReactElement;
  label: string;
  action: Function;
};

export type selectOptionType = {
  value: string;
  text: string;
};

export type pacienteType = {
  _id?: string;
  apellidos: string;
  nombres: string;
  cedula: string;
  fechaNacimiento: Date;
  sexo: string;
  medicinaHabitual: string;
  direccion: string;
  telefonoFijo: string;
  celular: string;
  contactos: Array<contactoType>;
};

export type doctorType = {
  _id?: string;
  apellidos: string;
  nombres: string;
  cedula: string;
  fechaNacimiento: Date;
  sexo: string;
  direccion: string;
  telefonoFijo: string;
  celular: string;
  institucion: string;
  especialidad: string;
  disponible: boolean;
};

export type contactoType = {
  _id?: string;
  apellidos: string;
  nombres: string;
  celular: string;
};

export type nacionalidadType = {
  _id?: string;
  descripcion: string;
};

export type riesgoType = {
  _id?: string;
  descripcion: string;
};

export type especialidadType = {
  _id?: string;
  descripcion: string;
};

export type institucionType = {
  _id?: string;
  descripcion: string;
  direccion: string;
  parroquia: parroquiaType;
};

export type parroquiaType = {
  _id?: string;
  descripcion: string;
  ciudad: ciudadType;
};

export type ciudadType = {
  _id?: string;
  descripcion: string;
};

export type citaPrew = {
  _id?: string;
  paciente: pacienteType;
  doctor: doctorType;
  fecha: Date;
  observacion: string;
  proximaVisita: Date;
  estado: string;
};

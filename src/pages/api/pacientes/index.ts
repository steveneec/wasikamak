import Contacto from "@/models/Contacto";
import Paciente from "@/models/Paciente";
import connectMongo from "@/utils/connectMongo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo(); //Connect to db

    let result;

    switch (req.method) {
      case "POST":
        result = await savePaciente(req.body);
        break;
      case "GET":
        result = await getAllPacientes();
        break;
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

async function savePaciente(data: any) {
  //Extract contacts and save
  const { contactos }: { contactos: Array<any> } = data;

  console.log(data);

  if (contactos.length > 0) {
    const _contacts = await Contacto.insertMany(contactos);
    const _cids = _contacts.map((_c) => _c._id);
    data.contactos = _cids;
  }

  const result = await Paciente.create(data);
  return result;
}

async function getAllPacientes() {
  const result = await Paciente.find({});
  return result;
}

import Cita from "@/models/Cita";
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
        result = await saveCita(req.body);
        break;
      case "GET":
        result = await getAllCitas();
        break;
      case "PUT":
        result = await setEjecutado(req.body);
        break;
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

async function saveCita(data: any) {
  //Extract contacts and save
  const result = await Cita.create(data);
  return result;
}

async function getAllCitas() {
  const result = await Cita.find({})
    .populate("paciente", ["apellidos", "nombres"])
    .populate({
      path: "doctor",
      select: ["apellidos", "nombres"],
      populate: {
        path: "institucion",
        select: ["descripcion", "direccion"],
      },
    })
    .sort({ fecha: "desc" })
    .exec();
  return result;
}

async function setEjecutado(data: any) {
  const { _id } = data;

  const result = await Cita.findOneAndUpdate(_id, {
    estado: "ejecutado",
  });

  return result;
}

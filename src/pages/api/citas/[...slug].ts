import Cita from "@/models/Doctor";
import connectMongo from "@/utils/connectMongo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo(); //Connect to db

    let result;

    if (req.query.slug) {
      if (req.query.slug[0] === "name") {
        result = await getCitaByName(req.query.slug[1]);
      }
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

async function getCitaByName(name: string) {
  const result = await Cita.find({
    "paciente.nombres": {
      $regex: { $regex: ".*" + name + ".*", $options: "i" },
    },
  })
    .populate("paciente", ["apellidos", "nombres"])
    .populate({
      path: "doctor",
      select: ["apellidos", "nombres"],
      populate: {
        path: "institucion",
        select: ["descripcion", "direccion"],
      },
    })
    .exec();
  return result;
}

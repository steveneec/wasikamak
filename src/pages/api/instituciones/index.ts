import Institucion from "@/models/Institucion";
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
      case "GET":
        result = await getAllInstituciones();
        break;
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

async function getAllInstituciones() {
  const result = await Institucion.find({});
  return result;
}

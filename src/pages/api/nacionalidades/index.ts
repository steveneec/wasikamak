import Nacionalidad from "@/models/Nacionalidad";
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
        result = await saveNacionalidad(req.body);
        break;
      case "GET":
        result = await getAllNacionalidad();
        break;
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

async function getAllNacionalidad() {
  const result = await Nacionalidad.find({});
  return result;
}

async function saveNacionalidad(body: any) {
  const result = await Nacionalidad.create(body);
  return result;
}

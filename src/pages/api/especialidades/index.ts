import Especialidad from "@/models/Especialidad";
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
        result = await getAllEspecialidades();
        break;
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

async function getAllEspecialidades() {
  const result = await Especialidad.find({});
  return result;
}

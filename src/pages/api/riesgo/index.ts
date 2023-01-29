import NivelRiesgo from "../../../models/NivelRiesgo";
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
        result = await saveNivelRiesgo(req.body);
        break;
      case "GET":
        result = await getAllRiesgo();
        break;
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

async function saveNivelRiesgo(body: any) {
  const result = await NivelRiesgo.create(body);
  return result;
}

async function getAllRiesgo() {
  const result = await NivelRiesgo.find({});
  return result;
}

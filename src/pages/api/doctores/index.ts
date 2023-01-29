import Doctor from "@/models/Doctor";
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
        result = await saveDoctor(req.body);
        break;
      case "GET":
        result = await getAllDoctores();
        break;
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

async function saveDoctor(data: any) {
  //Extract contacts and save
  const result = await Doctor.create(data);
  return result;
}

async function getAllDoctores() {
  const result = await Doctor.find({});
  return result;
}

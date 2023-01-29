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

    if (req.query.slug) {
      if (req.query.slug[0] === "name") {
        result = await getDoctorByName(req.query.slug[1]);
      }
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }
}

async function getDoctorByName(name: string) {
  const results = await Doctor.find({
    nombres: { $regex: ".*" + name + ".*", $options: "i" },
  });
  return results;
}

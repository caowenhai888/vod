// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import  db from '../../db'
type Data = {
  name?: string;
  document?:any
  error?:any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
   const data= await db.projects.find({})
   try {
    const document = await db.projects.insert({name:"sss", content:"ssss"});
    res.status(200).json({  document });
} catch (error) {
    res.status(500).json({  error });
}
   res.status(200).json({ name: data });
}

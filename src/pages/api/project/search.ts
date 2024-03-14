// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import  db from '../../../db'
type Data = {
    error?:any
    code?: number
    data?: any
  };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  
    try {
        const { keywords }= req.query;
        
        const document = await db.projects.find({ "list.title": new RegExp(keywords as string, 'i') });
        const data =  document.map((doc:any) => {
            const matchedList = doc.list.filter((item:any) => new RegExp(keywords as string, 'i').test(item.title));
            return {
              ...doc,
              list: matchedList
            };
         }).filter((doc: any) => doc.list.length > 0);;
        res.status(200).json({ code:200, data });

    } catch (error) {
        res.status(500).json({  code:500 });
    }
  
}

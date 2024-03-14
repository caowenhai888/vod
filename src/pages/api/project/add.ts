// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const shortid = require('shortid')
import db from '../../../db'

type Data = {
  error?: any,
  code?: number,
  data?: any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    // 获取请求体中的数据
    const projectsData = req.body || [];

    await db.projects.deleteMany({});

    // 创建一个数组，用来保存返回的文档
    let documents:any = [];

    for (let projectData of projectsData) {
      const { title, content, list = [] } = projectData;
      const listIds = (list as any[]).map(item => ({ ...item, id: shortid.generate() }));
      
      // 插入每一个带有id的项目
      const document = await db.projects.insert({ title, content, list: listIds });
      documents.push(document);
    }

    res.status(200).json({ code: 200, data: documents });
  } catch (error) {
    res.status(500).json({ code: 500, error });
  }
}
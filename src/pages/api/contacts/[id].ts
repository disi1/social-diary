import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query as { id: string };
    res.send(id);
};

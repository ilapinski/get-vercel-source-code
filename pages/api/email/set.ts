// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { newEmailTemplate } from '@/lib/newEmailTemplate';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // get the club name from url
    const { name } = req.query;

    if(!name) {
        res.status(500).json({error: {message: `Es ist ein Fehler aufgetreten.`}} as any)
        return;
    }

    const result = await newEmailTemplate({ name: name as string });

    if(result.error) {
        res.status(500).json({error: {message: `Es ist ein Fehler aufgetreten.`}} as any)
        return;
    }
}

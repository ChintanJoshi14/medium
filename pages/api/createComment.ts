// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sanityClient from '@sanity/client';
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.SANITY_API_TOKEN,    
};

const client = sanityClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const {_id, name, email, comment} = JSON.parse(req.body);

    try {
        await client.create({
            _type: 'comment',
            post: {
                _type: 'reference',
                _ref: _id
            },
            name,
            email,
            comment
        });
    } catch(err) {
        return res.status(500).json({message: "Could not submit comment", err});
    }
    console.log("Commented")
res.status(200).json({message: "Comment added successfully!"});
}
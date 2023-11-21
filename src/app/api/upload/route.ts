import type { NextApiRequest, NextApiResponse } from 'next';
import { SignedPostPolicyV4Output } from '@google-cloud/storage';
import { Storage } from '@google-cloud/storage';
import { NextRequest, NextResponse } from 'next/server';

//REFER: https://medium.com/@scott82anderson/how-to-upload-files-to-a-gcp-bucket-in-next-js-8047358d011d

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY!.split(String.raw`\n`).join('\n'),
  },
});
const BUCKET_NAME = process.env.BUCKET_NAME!;
const SUB_PATH = 'public/';

export async function POST(
  req: NextRequest,
  res: NextResponse<SignedPostPolicyV4Output | string>,
  //   res: NextApiResponse<SignedPostPolicyV4Output | string>,
) {
  const { searchParams } = new URL(req.url!, 'http://localhost:3000');
  const query = searchParams.get('file');

  console.log(query);

  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 5 * 60 * 1000, //  5 minutes,
    fields: { 'x-goog-meta-source': 'tubeplus' },
  } as any;

  const file = storage.bucket(BUCKET_NAME).file(`${SUB_PATH}${query}`);
  const [response]: any = await file.generateSignedPostPolicyV4(options);
  console.log(response);

  // return  res.json({ url: response.url, fields: response.fields });
  return Response.json(response);
}

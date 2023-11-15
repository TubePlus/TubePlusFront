import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function handler(req, res) {
  const s3 = new AWS.S3();
  const { fileName, fileType } = req.query;

  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${Date.now()}_${fileName}`,
    Expires: 60, // 유효 시간
    ContentType: fileType,
    ACL: 'public-read', // 또는 다른 ACL 설정
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Error creating signed URL" });
      return;
    }
    res.status(200).json({ signedRequest: data, url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/uploads/${Date.now()}_${fileName}` });
  });
}

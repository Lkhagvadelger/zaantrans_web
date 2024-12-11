import { S3 } from "aws-sdk";
import { hash } from "bcryptjs";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const bucket = process.env.AWS_BUCKET;

const generateKey = async (fileName: string) => {
  // TODO: Generate unique key
  const id = await hash(fileName, 10);
  return id;
};

export const getUploadKey = async (
  fileName: string,
  fileType: string
): Promise<{ signedRequest: string; url: string }> => {
  const key = await generateKey(fileName);
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: bucket,
        Key: key,
        ContentType: fileType,
      },
      (error, data) => {
        if (error) reject(error);
        resolve({
          signedRequest: data,
          url: `https://s3.amazonaws.com/${bucket}/${key}`,
        });
      }
    );
  });
};

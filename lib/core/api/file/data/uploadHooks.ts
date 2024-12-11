import { API, Method } from "@util/query";
import axios, { CancelTokenSource } from "axios";

const getSignedUrl = async (file: File) => {
  const result = await API._request(Method.GET, `file/upload`, {
    fileName: file.name,
    fileType: file.type,
  }).then((response) => response.json());
  return result;
};

export const uploadToS3 = async ({
  file,
  setProgress,
  cancel,
}: {
  file: File;
  setProgress?: any;
  cancel?: CancelTokenSource;
}) => {
  const { signedRequest, url } = await getSignedUrl(file);
  const cloudFrontCDN =
    process.env.NEXT_PUBLIC_CLOUDFRONT_CDN ||
    "https://d2a12dzgv8sucf.cloudfront.net";

  let returnUrl = url.replace(
    "https://s3.amazonaws.com/file.husut.com",
    cloudFrontCDN
  );

  await axios
    .put(signedRequest, file, {
      headers: {
        "Content-Type": file.type,
      },
      cancelToken: cancel?.token,
      onUploadProgress: (progressEvent) => {
        let percentCompleted = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        setProgress && setProgress(percentCompleted);
      },
    })
    .catch(function (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        returnUrl = "";
      } else {
        console.log("error:", error.message);
      }
    });

  return returnUrl;
};

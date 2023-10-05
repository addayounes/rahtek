import { bucket } from "../lib/firebase";
import { getDownloadURL } from "firebase-admin/storage";

export const uploadPhoto = async (photo: any, fileName?: string) => {
  return new Promise((resolve, reject) => {
    const actualFileName = fileName ?? photo.filename;
    bucket.upload(
      photo.path,
      {
        destination: actualFileName,
        metadata: { contentType: photo.mimetype },
      },
      async (err, file) => {
        if (err || !file) reject({ error: "Error uploading photo" });

        const publicUrl = await getDownloadURL(file as any);

        resolve(publicUrl);
      }
    );
  });
};

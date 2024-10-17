import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the file on the cloudinary server
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // fill has been uploaded successfully

    // console.log("file is uploaded successfully on cloudinary server",response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //{unlink thats means delete} remove the locally saved temporary file as the upload operation got faild
    return null;
  }
};

export { uploadOnCloudinary };

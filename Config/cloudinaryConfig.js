import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "dkpezyd12",
  // process.env.CLOUDINARY_CLOUD_NAME,
  api_key: "462622549377856",
  // process.env.CLOUDINARY_API_KEY,
  api_secret: "_VcuBKRh5oigY9XcwILa9JcwNGo",
  // process.env.CLOUDINARY_SECRET_KEY,
});

cloudinary.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result);
  }
);
//upload file on cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //upload the File on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded on successfull
    console.log("File is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    //remove the locally save temporary file as the upload operation got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };

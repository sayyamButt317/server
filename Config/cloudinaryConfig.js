import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: 'dkpezyd12',
  api_key: '462622549377856',
  api_secret: '_VcuBKRh5oigY9XcwILa9JcwNGo',
});


//upload file on cloudinary

const uploadOnCloudinary = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      resource_type: "auto",
    });

    // Attempt to delete the local file
    try {
      fs.unlinkSync(filePath);
      console.log("Local file deleted successfully.");
    } catch (unlinkError) {
      console.error("Error deleting the file locally:", unlinkError.message);
    }

    console.log("Image uploaded to Cloudinary:", result.secure_url);
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error.message);
    return null; // Return null if upload fails
  }
};

export { uploadOnCloudinary };

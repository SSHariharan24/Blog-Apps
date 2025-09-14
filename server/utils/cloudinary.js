import { useRuntimeConfig } from "#imports";
import { v2 as cloudinary } from "cloudinary";

const config = useRuntimeConfig();

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

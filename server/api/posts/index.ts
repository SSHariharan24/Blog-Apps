import { readFileSync, writeFileSync } from "fs";
import { defineEventHandler, readMultipartFormData, createError } from "h3";
import { join } from "path";
import { nanoid } from "nanoid";
import { v2 as cloudinary } from "cloudinary";

const file = join(process.cwd(), "data", "posts.json");

// 🔹 Cloudinary init with runtimeConfig
function getCloudinary() {
  const config = useRuntimeConfig(); // no import needed in Nitro
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
  });
  return cloudinary;
}

// 🔹 Upload helper
function uploadToCloudinary(buffer: Buffer) {
  const cloud = getCloudinary();
  return new Promise((resolve, reject) => {
    const stream = cloud.uploader.upload_stream(
      { folder: "nuxt-blog" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

export default defineEventHandler(async (event) => {
  try {
    if (event.method === "GET") {
      const posts = JSON.parse(readFileSync(file, "utf-8"));
      return posts;
    }

    if (event.method === "POST") {
      const form = await readMultipartFormData(event);
      if (!form) {
        throw createError({ statusCode: 400, statusMessage: "No form data received" });
      }

      const posts = JSON.parse(readFileSync(file, "utf-8"));
      const id = nanoid();
      const newPost: any = { id };

      for (const field of form) {
        if (field.name === "image" && field.filename) {
          try {
            const result: any = await uploadToCloudinary(field.data);
            newPost.image = result.secure_url;
            newPost.public_id = result.public_id;
          } catch (err) {
            console.error("Cloudinary upload failed:", err);
            throw createError({ statusCode: 500, statusMessage: "Image upload failed" });
          }
        } else {
          newPost[field.name] = field.data.toString();
        }
      }

      posts.push(newPost);
      writeFileSync(file, JSON.stringify(posts, null, 2));
      return { success: true, post: newPost };
    }
  } catch (err) {
    console.error("API Error [POST /api/posts]:", err);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});

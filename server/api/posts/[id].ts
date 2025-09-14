import { readFileSync, writeFileSync } from "fs";
import {
  defineEventHandler,
  readMultipartFormData,
  getRouterParam,
  createError,
} from "h3";
import { join } from "path";
import { v2 as cloudinary } from "cloudinary";

const file = join(process.cwd(), "data", "posts.json");

// 🔹 Cloudinary init (runtimeConfig works without import in Nitro)
function getCloudinary() {
  const config = useRuntimeConfig();
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
    const id = getRouterParam(event, "id");
    let posts = JSON.parse(readFileSync(file, "utf-8"));
    const idx = posts.findIndex((p: any) => p.id === id);

    if (idx === -1) {
      throw createError({ statusCode: 404, statusMessage: "Post not found" });
    }

    if (event.method === "GET") {
      return posts[idx];
    }

    if (event.method === "PUT") {
      const form = await readMultipartFormData(event);
      if (!form) {
        throw createError({ statusCode: 400, statusMessage: "No form data received" });
      }

      const updatedPost = { ...posts[idx] };

      for (const field of form) {
        if (field.name === "image" && field.filename) {
          try {
            // If post already has an image, delete old one
            if (updatedPost.public_id) {
              await getCloudinary().uploader.destroy(updatedPost.public_id);
            }

            const result: any = await uploadToCloudinary(field.data);
            updatedPost.image = result.secure_url;
            updatedPost.public_id = result.public_id;
          } catch (err) {
            console.error("Cloudinary update failed:", err);
            throw createError({ statusCode: 500, statusMessage: "Image update failed" });
          }
        } else {
          updatedPost[field.name] = field.data.toString();
        }
      }

      posts[idx] = updatedPost;
      writeFileSync(file, JSON.stringify(posts, null, 2));
      return { success: true, post: updatedPost };
    }

    if (event.method === "DELETE") {
      try {
        // Delete image from Cloudinary if exists
        if (posts[idx].public_id) {
          await getCloudinary().uploader.destroy(posts[idx].public_id);
        }
      } catch (err) {
        console.error("Cloudinary delete failed:", err);
        // continue anyway, don’t block DB delete
      }

      posts = posts.filter((p: any) => p.id !== id);
      writeFileSync(file, JSON.stringify(posts, null, 2));
      return { success: true };
    }
  } catch (err) {
    console.error("API Error [posts/[id]]:", err);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});

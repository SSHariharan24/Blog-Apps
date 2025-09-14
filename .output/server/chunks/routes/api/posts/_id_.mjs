import { c as defineEventHandler, g as getRouterParam, e as createError, r as readMultipartFormData, u as useRuntimeConfig } from '../../../_/nitro.mjs';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v2 } from 'cloudinary';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const file = join(process.cwd(), "data", "posts.json");
function getCloudinary() {
  const config = useRuntimeConfig();
  v2.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
  });
  return v2;
}
function uploadToCloudinary(buffer) {
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
const _id_ = defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    let posts = JSON.parse(readFileSync(file, "utf-8"));
    const idx = posts.findIndex((p) => p.id === id);
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
            if (updatedPost.public_id) {
              await getCloudinary().uploader.destroy(updatedPost.public_id);
            }
            const result = await uploadToCloudinary(field.data);
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
        if (posts[idx].public_id) {
          await getCloudinary().uploader.destroy(posts[idx].public_id);
        }
      } catch (err) {
        console.error("Cloudinary delete failed:", err);
      }
      posts = posts.filter((p) => p.id !== id);
      writeFileSync(file, JSON.stringify(posts, null, 2));
      return { success: true };
    }
  } catch (err) {
    console.error("API Error [posts/[id]]:", err);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map

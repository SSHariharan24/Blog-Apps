import { readFileSync, writeFileSync } from 'fs';
import { c as defineEventHandler, r as readMultipartFormData } from '../../_/nitro.mjs';
import { join } from 'path';
import { nanoid } from 'nanoid';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const file = join(process.cwd(), "data", "posts.json");
const index = defineEventHandler(async (event) => {
  if (event.method === "GET") {
    const posts = JSON.parse(readFileSync(file, "utf-8"));
    return posts;
  }
  if (event.method === "POST") {
    const form = await readMultipartFormData(event);
    const posts = JSON.parse(readFileSync(file, "utf-8"));
    const id = nanoid();
    let imagePath = "";
    const newPost = { id };
    form.forEach((field) => {
      if (field.name === "image") {
        if (field.filename) {
          const uploadPath = join(process.cwd(), "public", "uploads", field.filename);
          writeFileSync(uploadPath, field.data);
          imagePath = "/uploads/" + field.filename;
        }
      } else {
        newPost[field.name] = field.data.toString();
      }
    });
    newPost.image = imagePath;
    posts.push(newPost);
    writeFileSync(file, JSON.stringify(posts, null, 2));
    return { success: true };
  }
});

export { index as default };
//# sourceMappingURL=index.mjs.map

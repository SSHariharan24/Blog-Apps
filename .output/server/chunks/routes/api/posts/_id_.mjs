import { readFileSync, writeFileSync } from 'fs';
import { c as defineEventHandler, g as getRouterParam, r as readMultipartFormData } from '../../../_/nitro.mjs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const file = join(process.cwd(), "data", "posts.json");
const _id_ = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  let posts = JSON.parse(readFileSync(file, "utf-8"));
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) return { error: "Not Found" };
  if (event.method === "GET") return posts[idx];
  if (event.method === "PUT") {
    const form = await readMultipartFormData(event);
    const updatedPost = { ...posts[idx] };
    form.forEach((field) => {
      if (field.name === "image" && field.filename) {
        const uploadPath = join(process.cwd(), "public", "uploads", field.filename);
        writeFileSync(uploadPath, field.data);
        updatedPost.image = "/uploads/" + field.filename;
      } else {
        updatedPost[field.name] = field.data.toString();
      }
    });
    posts[idx] = updatedPost;
    writeFileSync(file, JSON.stringify(posts, null, 2));
    return { success: true };
  }
  if (event.method === "DELETE") {
    posts = posts.filter((p) => p.id !== id);
    writeFileSync(file, JSON.stringify(posts, null, 2));
    return { success: true };
  }
});

export { _id_ as default };
//# sourceMappingURL=_id_.mjs.map

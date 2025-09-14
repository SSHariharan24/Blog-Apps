import { readFileSync, writeFileSync } from 'fs'
import { defineEventHandler, readMultipartFormData } from 'h3'
import { join } from 'path'
import { nanoid } from 'nanoid'

const file = join(process.cwd(), 'data', 'posts.json')

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const posts = JSON.parse(readFileSync(file, 'utf-8'))
    return posts
  }

  if (event.method === 'POST') {
    const form = await readMultipartFormData(event)
    const posts = JSON.parse(readFileSync(file, 'utf-8'))
    const id = nanoid()
    let imagePath = ''
    const newPost: any = { id }

    form.forEach(field => {
      if (field.name === 'image') {
        if (field.filename) {
          const uploadPath = join(process.cwd(), 'public', 'uploads', field.filename)
          writeFileSync(uploadPath, field.data)
          imagePath = '/uploads/' + field.filename
        }
      } else {
        newPost[field.name] = field.data.toString()
      }
    })
    newPost.image = imagePath
    posts.push(newPost)
    writeFileSync(file, JSON.stringify(posts, null, 2))
    return { success: true }
  }
})

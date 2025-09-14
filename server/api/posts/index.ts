import { readFileSync, writeFileSync } from 'fs'
import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { join } from 'path'
import { nanoid } from 'nanoid'

// Correct path to data and uploads
const file = join(process.cwd(), 'data', 'posts.json')
const uploadDir = join(process.cwd(), 'public', 'uploads')

export default defineEventHandler(async (event) => {
  try {
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
            const uploadPath = join(uploadDir, field.filename)
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
  } catch (err) {
    console.error('API Error [POST /api/posts]:', err)
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' })
  }
})

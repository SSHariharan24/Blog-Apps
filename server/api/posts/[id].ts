import { readFileSync, writeFileSync } from 'fs'
import { defineEventHandler, readMultipartFormData, getRouterParam } from 'h3'
import { join } from 'path'

const file = join(process.cwd(), 'data', 'posts.json')

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  let posts = JSON.parse(readFileSync(file, 'utf-8'))
  const idx = posts.findIndex((p: any) => p.id === id)

  if (idx === -1) return { error: 'Not Found' }

  if (event.method === 'GET') return posts[idx]

  if (event.method === 'PUT') {
    const form = await readMultipartFormData(event)
    const updatedPost = { ...posts[idx] }

    form.forEach(field => {
      if (field.name === 'image' && field.filename) {
        const uploadPath = join(process.cwd(), 'public', 'uploads', field.filename)
        writeFileSync(uploadPath, field.data)
        updatedPost.image = '/uploads/' + field.filename
      } else {
        updatedPost[field.name] = field.data.toString()
      }
    })

    posts[idx] = updatedPost
    writeFileSync(file, JSON.stringify(posts, null, 2))
    return { success: true }
  }

  if (event.method === 'DELETE') {
    posts = posts.filter((p: any) => p.id !== id)
    writeFileSync(file, JSON.stringify(posts, null, 2))
    return { success: true }
  }
})

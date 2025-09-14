<template>
  <div class="py-10">
    <h1 class="text-3xl font-extrabold mb-4 text-center">Edit Post</h1>
    <BlogPostForm :post="post" :onSubmit="submit" />
  </div>
</template>

<script setup>
import BlogPostForm from '~/components/BlogPostForm.vue'
import { useRoute, navigateTo } from '#app'
const route = useRoute()
const { data: post } = await useFetch(`/api/posts/${route.params.id}`)

async function submit(formData) {
  await $fetch(`/api/posts/${route.params.id}`, { method: 'PUT', body: formData })
  navigateTo('/')
}
</script>
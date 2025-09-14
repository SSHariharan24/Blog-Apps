<template>
  <div class="max-w-3xl mx-auto p-6 mt-10">
    <div class="p-4 rounded-xl">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        Create New Post
      </h1>

      <BlogPostForm :onSubmit="submit" />
    </div>
  </div>
</template>

<style>
body {
  background: linear-gradient(135deg, #f0f4ff 0%, #e0f7ff 100%);
}
</style>

<script setup>
import BlogPostForm from "~/components/BlogPostForm.vue";
import { navigateTo } from "#app";
async function submit(formData) {
  await $fetch("/api/posts", { method: "POST", body: formData });
  navigateTo("/");
}
</script>

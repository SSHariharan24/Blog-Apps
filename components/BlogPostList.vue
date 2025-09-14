<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-0">
    <BlogPostCard
      v-for="p in posts"
      :key="p.id"
      :post="p"
      @delete="$emit('delete', $event)"
      class="w-full"
    />
  </div>
</template>

<script setup>
import BlogPostCard from './BlogPostCard.vue'

defineProps({ posts: Array })
defineEmits(['delete'])
</script>

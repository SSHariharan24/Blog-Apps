<template>
  <div
    class="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-3xl overflow-hidden"
  >
    <div v-if="post.image" class="relative">
      <img
        :src="post.image"
        alt="Post Image"
        class="w-full h-80 object-fill object-center"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
      ></div>
    </div>

    <div class="p-6 sm:p-8 space-y-6">
      <div class="flex items-center justify-between flex-wrap gap-3">
        <h1
          class="text-2xl sm:text-4xl font-extrabold text-gray-900 break-words"
        >
          {{ post.title }}
        </h1>

        <NuxtLink
          :to="`/edit/${post.id}`"
          class="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-extrabold px-6 py-3 rounded-xl  shadow-lg transition duration-200 ease-in-out focus:ring-2 focus:ring-green-400"
        >
           Edit
        </NuxtLink>
      </div>

      <div class="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
        <span>📅 {{ formattedDate }}</span>
        <span v-if="post.author"
          >✍️ By <b>{{ post.author }}</b></span
        >
      </div>

      <p
        class="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line break-words break-all"
      >
        {{ post.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "#app";
import { computed } from "vue";

const route = useRoute();
const { data: post } = await useFetch(`/api/posts/${route.params.id}`);

const formattedDate = computed(() => {
  if (!post.value?.date) return "";
  return new Date(post.value.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<style>
body {
  background: #fbfaf9;
}
</style>

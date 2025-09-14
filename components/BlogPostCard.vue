<template>
  <div
    class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col w-full"
  >
    <img
      v-if="post.image"
      :src="post.image"
      alt="Post Image"
      class="w-full h-56 sm:h-64 md:h-64 object-cover"
    />

    <div class="flex flex-col flex-1 p-5 sm:p-6 gap-2 sm:gap-3">
      <div class="flex justify-between items-start">
        <h2
          class="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2"
        >
          {{ post.title }}
        </h2>
        <button
          @click="emitDelete"
          class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm sm:text-base"
        >
          Delete
        </button>
      </div>

      <p class="text-gray-600 line-clamp-3 text-sm sm:text-base flex-1">
        {{ post.description }}
      </p>

      <div
        class="flex justify-between items-center text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4"
      >
        <span>{{ formattedDate }}</span>
        <NuxtLink
          :to="`/view/${post.id}`"
          class="text-blue-600 hover:text-blue-800 font-medium transition text-sm sm:text-base"
        >
          Read more →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits(["delete"]);
const props = defineProps({
  post: { type: Object, required: true },
});

const formattedDate = computed(() => {
  if (!props.post?.date) return "";
  return new Date(props.post.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});

const emitDelete = () => emit("delete", props.post.id);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

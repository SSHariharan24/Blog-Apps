<template>
  <div class="flex justify-center items-center px-4 py-10">
    <form
      @submit.prevent="handleSubmit"
      class="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 grid grid-cols-1 gap-6 sm:grid-cols-2"
    >
      <div class="sm:col-span-2">
        <label for="title" class="block font-semibold text-gray-700 mb-2"
          >Title</label
        >
        <input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Enter blog title"
          class="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition duration-150"
          required
        />
      </div>

      <div class="sm:col-span-2">
        <label for="description" class="block font-semibold text-gray-700 mb-2"
          >Description</label
        >
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Write a short description..."
          rows="5"
          class="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition duration-150 resize-none"
          required
        ></textarea>
      </div>

      <div>
        <label for="date" class="block font-semibold text-gray-700 mb-2"
          >Date</label
        >
        <input
          id="date"
          type="date"
          v-model="form.date"
          class="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition duration-150"
          required
        />
      </div>

      <div>
        <label for="image" class="block font-semibold text-gray-700 mb-2"
          >Upload Image</label
        >
        <input
          id="image"
          type="file"
          @change="onFileChange"
          accept="image/*"
          class="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition cursor-pointer border border-gray-300 rounded-xl"
        />
      </div>

      <div class="sm:col-span-2 flex justify-end">
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-600 active:scale-95 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-200 ease-in-out focus:ring-2 focus:ring-green-400"
        >
          {{ buttonLabel }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  post: { type: Object, default: null },
  onSubmit: { type: Function, required: true },
});

const form = ref({
  title: props.post?.title || "",
  description: props.post?.description || "",
  date: props.post?.date || "",
});

const file = ref(null);

const buttonLabel = computed(() =>
  props.post ? "Update Post" : "Create Post"
);

function onFileChange(e) {
  file.value = e.target.files[0];
}

async function handleSubmit() {
  const data = new FormData();
  data.append("title", form.value.title);
  data.append("description", form.value.description);
  data.append("date", form.value.date);
  if (file.value) data.append("image", file.value);
  await props.onSubmit(data);
  file.value = null;
}
</script>

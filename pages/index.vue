<template>
  <header
    class="w-full sticky top-0 z-50 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 shadow-lg backdrop-blur-md"

  >
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <span
          class="text-white text-2xl font-extrabold tracking-wide group-hover:scale-105 transition"
        >
          Blog<span class="text-yellow-400">APP</span>
        </span>
      </NuxtLink>

      <div class="hidden md:flex items-center gap-6">
        <NuxtLink
          to="/create"
          class="bg-green-400 text-black px-5 py-2 rounded-xl font-semibold shadow-md hover:bg-green-300 hover:scale-105 transition"
        >
          + Create
        </NuxtLink>
      </div>

      <div class="md:hidden relative">
        <button
          @click="toggleMenu"
          class="text-white text-2xl p-2 rounded-md hover:bg-blue-500 transition"
        >
          <svg
            v-if="!menuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <transition name="slide-fade">
          <div
            v-if="menuOpen"
            class="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl py-3 flex flex-col space-y-2 z-50 border border-gray-200"
          >
            <NuxtLink
              to="/create"
              class="px-4 py-2 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition"
              @click="menuOpen = false"
            >
              Create
            </NuxtLink>
            <NuxtLink
              to="/"
              class="px-4 py-2 text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition"
              @click="menuOpen = false"
            >
              Home
            </NuxtLink>
          </div>
        </transition>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-6 py-10">
    <BlogPostList :posts="posts" @delete="deletePost" />
  </main>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

<script setup>
import { useFetch } from "#app";
import BlogPostList from "~/components/BlogPostList.vue";
import { ref } from "vue";

const { data: posts, refresh } = await useFetch("/api/posts");

async function deletePost(id) {
  await $fetch(`/api/posts/${id}`, { method: "DELETE" });
  refresh();
}

const menuOpen = ref(false);
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>

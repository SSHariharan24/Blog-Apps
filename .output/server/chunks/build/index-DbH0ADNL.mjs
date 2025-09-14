import { _ as __nuxt_component_0 } from './nuxt-link-B106WEZ5.mjs';
import { withAsyncContext, ref, withCtx, createVNode, createTextVNode, unref, mergeProps, computed, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-D6TZdCQs.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main$2 = {
  __name: "BlogPostCard",
  __ssrInlineRender: true,
  props: {
    post: { type: Object, required: true }
  },
  emits: ["delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const formattedDate = computed(() => {
      var _a;
      if (!((_a = props.post) == null ? void 0 : _a.date)) return "";
      return new Date(props.post.date).toLocaleDateString(void 0, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col w-full" }, _attrs))} data-v-15b16e69>`);
      if (__props.post.image) {
        _push(`<img${ssrRenderAttr("src", __props.post.image)} alt="Post Image" class="w-full h-56 sm:h-64 md:h-64 object-cover" data-v-15b16e69>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col flex-1 p-5 sm:p-6 gap-2 sm:gap-3" data-v-15b16e69><div class="flex justify-between items-start" data-v-15b16e69><h2 class="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2" data-v-15b16e69>${ssrInterpolate(__props.post.title)}</h2><button class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm sm:text-base" data-v-15b16e69> Delete </button></div><p class="text-gray-600 line-clamp-3 text-sm sm:text-base flex-1" data-v-15b16e69>${ssrInterpolate(__props.post.description)}</p><div class="flex justify-between items-center text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4" data-v-15b16e69><span data-v-15b16e69>${ssrInterpolate(formattedDate.value)}</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/view/${__props.post.id}`,
        class: "text-blue-600 hover:text-blue-800 font-medium transition text-sm sm:text-base"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Read more \u2192 `);
          } else {
            return [
              createTextVNode(" Read more \u2192 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BlogPostCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BlogPostCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-15b16e69"]]);
const _sfc_main$1 = {
  __name: "BlogPostList",
  __ssrInlineRender: true,
  props: { posts: Array },
  emits: ["delete"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-0" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.posts, (p) => {
        _push(ssrRenderComponent(BlogPostCard, {
          key: p.id,
          post: p,
          onDelete: ($event) => _ctx.$emit("delete", $event),
          class: "w-full"
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BlogPostList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: posts, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/posts", "$RcJmAH4yb5")), __temp = await __temp, __restore(), __temp);
    async function deletePost(id) {
      await $fetch(`/api/posts/${id}`, { method: "DELETE" });
      refresh();
    }
    const menuOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<!--[--><header class="w-full sticky top-0 z-50 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 shadow-lg backdrop-blur-md"><div class="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex items-center gap-2 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-white text-2xl font-extrabold tracking-wide group-hover:scale-105 transition"${_scopeId}> Blog<span class="text-yellow-400"${_scopeId}>APP</span></span>`);
          } else {
            return [
              createVNode("span", { class: "text-white text-2xl font-extrabold tracking-wide group-hover:scale-105 transition" }, [
                createTextVNode(" Blog"),
                createVNode("span", { class: "text-yellow-400" }, "APP")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex items-center gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/create",
        class: "bg-green-400 text-black px-5 py-2 rounded-xl font-semibold shadow-md hover:bg-green-300 hover:scale-105 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` + Create `);
          } else {
            return [
              createTextVNode(" + Create ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="md:hidden relative"><button class="text-white text-2xl p-2 rounded-md hover:bg-blue-500 transition">`);
      if (!menuOpen.value) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      }
      _push(`</button>`);
      if (menuOpen.value) {
        _push(`<div class="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl py-3 flex flex-col space-y-2 z-50 border border-gray-200">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/create",
          class: "px-4 py-2 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition",
          onClick: ($event) => menuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Create `);
            } else {
              return [
                createTextVNode(" Create ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "px-4 py-2 text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition",
          onClick: ($event) => menuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Home `);
            } else {
              return [
                createTextVNode(" Home ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></header><main class="max-w-7xl mx-auto px-6 py-10">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        posts: unref(posts),
        onDelete: deletePost
      }, null, _parent));
      _push(`</main><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DbH0ADNL.mjs.map

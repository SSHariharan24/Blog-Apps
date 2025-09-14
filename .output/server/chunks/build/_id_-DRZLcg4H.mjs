import { _ as __nuxt_component_0 } from './nuxt-link-B106WEZ5.mjs';
import { withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRoute } from './server.mjs';
import { u as useFetch } from './fetch-D6TZdCQs.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import '@vue/shared';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data: post } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/posts/${route.params.id}`, "$lm4tKDtcUD")), __temp = await __temp, __restore(), __temp);
    const formattedDate = computed(() => {
      var _a;
      if (!((_a = post.value) == null ? void 0 : _a.date)) return "";
      return new Date(post.value.date).toLocaleDateString(void 0, {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-3xl overflow-hidden" }, _attrs))}>`);
      if (unref(post).image) {
        _push(`<div class="relative"><img${ssrRenderAttr("src", unref(post).image)} alt="Post Image" class="w-full h-80 object-fill object-center"><div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="p-6 sm:p-8 space-y-6"><div class="flex items-center justify-between flex-wrap gap-3"><h1 class="text-2xl sm:text-4xl font-extrabold text-gray-900 break-words">${ssrInterpolate(unref(post).title)}</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/edit/${unref(post).id}`,
        class: "bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition duration-200 ease-in-out focus:ring-2 focus:ring-green-400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Edit `);
          } else {
            return [
              createTextVNode(" Edit ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-wrap items-center gap-4 text-gray-500 text-sm"><span>\u{1F4C5} ${ssrInterpolate(formattedDate.value)}</span>`);
      if (unref(post).author) {
        _push(`<span>\u270D\uFE0F By <b>${ssrInterpolate(unref(post).author)}</b></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-gray-700 leading-relaxed text-base sm:text-lg whitespace-pre-line break-words break-all">${ssrInterpolate(unref(post).description)}</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/view/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DRZLcg4H.mjs.map

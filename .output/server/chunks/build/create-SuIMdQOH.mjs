import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './BlogPostForm-BDndzvJn.mjs';
import { n as navigateTo } from './server.mjs';
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

const _sfc_main = {
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    async function submit(formData) {
      await $fetch("/api/posts", { method: "POST", body: formData });
      navigateTo("/");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-3xl mx-auto p-6 mt-10" }, _attrs))}><div class="p-4 rounded-xl"><h1 class="text-3xl font-bold text-gray-800 mb-6 text-center"> Create New Post </h1>`);
      _push(ssrRenderComponent(_sfc_main$1, { onSubmit: submit }, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-SuIMdQOH.mjs.map

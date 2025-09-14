import { withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './BlogPostForm-BDndzvJn.mjs';
import { u as useRoute, n as navigateTo } from './server.mjs';
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
    const { data: post } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/posts/${route.params.id}`, "$aV1kMnmDGY")), __temp = await __temp, __restore(), __temp);
    async function submit(formData) {
      await $fetch(`/api/posts/${route.params.id}`, { method: "PUT", body: formData });
      navigateTo("/");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-10" }, _attrs))}><h1 class="text-3xl font-extrabold mb-4 text-center">Edit Post</h1>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        post: unref(post),
        onSubmit: submit
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CE_UfmYh.mjs.map

import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "BlogPostForm",
  __ssrInlineRender: true,
  props: {
    post: { type: Object, default: null },
    onSubmit: { type: Function, required: true }
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const form = ref({
      title: ((_a = props.post) == null ? void 0 : _a.title) || "",
      description: ((_b = props.post) == null ? void 0 : _b.description) || "",
      date: ((_c = props.post) == null ? void 0 : _c.date) || ""
    });
    ref(null);
    const buttonLabel = computed(
      () => props.post ? "Update Post" : "Create Post"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex justify-center items-center px-4 py-10" }, _attrs))}><form class="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 grid grid-cols-1 gap-6 sm:grid-cols-2"><div class="sm:col-span-2"><label for="title" class="block font-semibold text-gray-700 mb-2">Title</label><input id="title"${ssrRenderAttr("value", form.value.title)} type="text" placeholder="Enter blog title" class="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition duration-150" required></div><div class="sm:col-span-2"><label for="description" class="block font-semibold text-gray-700 mb-2">Description</label><textarea id="description" placeholder="Write a short description..." rows="5" class="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition duration-150 resize-none" required>${ssrInterpolate(form.value.description)}</textarea></div><div><label for="date" class="block font-semibold text-gray-700 mb-2">Date</label><input id="date" type="date"${ssrRenderAttr("value", form.value.date)} class="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition duration-150" required></div><div><label for="image" class="block font-semibold text-gray-700 mb-2">Upload Image</label><input id="image" type="file" accept="image/*" class="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition cursor-pointer border border-gray-300 rounded-xl"></div><div class="sm:col-span-2 flex justify-end"><button type="submit" class="bg-green-500 hover:bg-green-600 active:scale-95 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-200 ease-in-out focus:ring-2 focus:ring-green-400">${ssrInterpolate(buttonLabel.value)}</button></div></form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BlogPostForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=BlogPostForm-BDndzvJn.mjs.map

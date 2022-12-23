// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";
var Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: { type: "string", required: true },
    image: { type: "string", required: true }
  }
}));
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blogs/*.mdx",
  bodyType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "string", required: true },
    description: { type: "string", required: true },
    cover: { type: "string", required: true },
    category: { type: "string", required: true },
    author: {
      type: "nested",
      of: Author
    },
    image: { type: "string", required: true }
  },
  computedFields: {
    readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx/, "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});
export {
  Author,
  Blog,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-CMDTXVIW.mjs.map

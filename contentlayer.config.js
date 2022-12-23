import { defineDocumentType, makeSource, defineNestedType } from 'contentlayer/source-files'
import readingTime from 'reading-time'

export const Author = defineNestedType(() => ({
    name: 'Author',
    fields: {
        name: { type: 'string', required: true },
        image: { type: 'string', required: true },
    },
}));

export const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: 'blogs/*.mdx',
    //bodyType: '_raw',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        publishedAt: { type: 'string', required: true },
        description: { type: 'string', required: true },
        cover: { type: 'string', required: true },
        category: { type: 'string', required: true },
        seoDescription: { type: 'string', required: false },
        author: {
            type: 'nested',
            of: Author,
        },
        image: { type: 'string', required: false },  
    },
    computedFields: {
        readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
        slug: {
            type: 'string',
            resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
            //resolve: (doc) => doc._raw.sourceFileName.replace(/\.md/, ""),        
        },
    },
}))

export default makeSource({
    contentDirPath: 'data',
    documentTypes: [Blog],
    // mdx: {
    //     remarkPlugins: [],
    //     rehypePlugins: [],
    // },
})
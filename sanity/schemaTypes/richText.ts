import { defineType } from 'sanity'

export const richTextType = defineType({
    name: 'richText',
    title: 'Rich Text',
    type: 'object',
    fields: [
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [{ type: 'block' }]
        }
    ],
    preview: {
        select: {
            blocks: 'content'
        },
        prepare(selection) {
            const { blocks } = selection
            // Render a short preview of the text
            return {
                title: blocks?.[0]?.children?.[0]?.text || 'Rich Text Block'
            }
        }
    }
})

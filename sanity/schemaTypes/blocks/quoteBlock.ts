import { defineField, defineType } from 'sanity'

export const quoteBlock = defineType({
    name: 'quoteBlock',
    title: 'Quote Block',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Quote Text',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'text',
        },
        prepare({ title }) {
            return {
                title: `Quote: ${title ? (title.length > 30 ? title.substring(0, 30) + '...' : title) : ''}`,
            }
        }
    }
})

import { defineField, defineType } from 'sanity'

export const learningsBlock = defineType({
    name: 'learningsBlock',
    title: 'Learnings Block',
    type: 'object',
    fields: [
        defineField({
            name: 'items',
            title: 'Learnings',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'learningItem',
                    fields: [
                        { name: 'num', type: 'string', title: 'Number (e.g. 01)' },
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'body', type: 'text', title: 'Body' }
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'num'
                        },
                        prepare({ title, subtitle }) {
                            return { title: `${subtitle} - ${title}` }
                        }
                    }
                }
            ]
        })
    ],
    preview: {
        select: {
            items: 'items'
        },
        prepare({ items }) {
            return {
                title: `Learnings (${items?.length || 0} items)`
            }
        }
    }
})

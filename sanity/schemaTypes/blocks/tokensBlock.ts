import { defineField, defineType } from 'sanity'

export const tokensBlock = defineType({
    name: 'tokensBlock',
    title: 'Tokens Block',
    type: 'object',
    fields: [
        defineField({
            name: 'items',
            title: 'Tokens',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'tokenItem',
                    fields: [
                        { name: 'name', type: 'string', title: 'Name (e.g. Brand)' },
                        { name: 'hex', type: 'string', title: 'Hex Code (e.g. #13BBAF)' },
                        { name: 'border', type: 'boolean', title: 'Show Border Bottom?', initialValue: false }
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'hex'
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
                title: `Design Tokens (${items?.length || 0} colors)`
            }
        }
    }
})

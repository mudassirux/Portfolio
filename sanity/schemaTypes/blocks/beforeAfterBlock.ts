import { defineField, defineType } from 'sanity'

export const beforeAfterBlock = defineType({
    name: 'beforeAfterBlock',
    title: 'Before / After Block',
    type: 'object',
    fields: [
        defineField({
            name: 'before',
            title: 'Before Section',
            type: 'object',
            fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { 
                    name: 'items', 
                    type: 'array', 
                    title: 'Items', 
                    of: [{ type: 'string' }] 
                }
            ]
        }),
        defineField({
            name: 'after',
            title: 'After Section',
            type: 'object',
            fields: [
                { name: 'label', type: 'string', title: 'Label' },
                { 
                    name: 'items', 
                    type: 'array', 
                    title: 'Items', 
                    of: [{ type: 'string' }] 
                }
            ]
        })
    ],
    preview: {
        select: {
            beforeLabel: 'before.label',
            afterLabel: 'after.label'
        },
        prepare({ beforeLabel, afterLabel }) {
            return {
                title: 'Before / After',
                subtitle: `${beforeLabel || 'Before'} -> ${afterLabel || 'After'}`
            }
        }
    }
})

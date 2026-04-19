import { defineField, defineType } from 'sanity'

export const flowBlock = defineType({
    name: 'flowBlock',
    title: 'Flow Block',
    type: 'object',
    fields: [
        defineField({
            name: 'steps',
            title: 'Steps',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'flowStep',
                    fields: [
                        { name: 'active', type: 'boolean', title: 'Is Active?', initialValue: false },
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'desc', type: 'text', title: 'Description' }
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            active: 'active'
                        },
                        prepare({ title, active }) {
                            return { title: `${title} ${active ? '(Active)' : ''}` }
                        }
                    }
                }
            ]
        })
    ],
    preview: {
        select: {
            steps: 'steps'
        },
        prepare({ steps }) {
            return {
                title: `Flow Sequence (${steps?.length || 0} steps)`
            }
        }
    }
})

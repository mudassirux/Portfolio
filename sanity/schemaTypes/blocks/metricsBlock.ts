import { defineField, defineType } from 'sanity'

export const metricsBlock = defineType({
    name: 'metricsBlock',
    title: 'Metrics Block',
    type: 'object',
    fields: [
        defineField({
            name: 'items',
            title: 'Metrics',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'metricItem',
                    fields: [
                        { name: 'value', type: 'string', title: 'Value (e.g. 10x)' },
                        { name: 'label', type: 'string', title: 'Label' }
                    ],
                    preview: {
                        select: {
                            title: 'value',
                            subtitle: 'label'
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
                title: `Metrics (${items?.length || 0} items)`
            }
        }
    }
})

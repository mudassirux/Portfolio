import { defineField, defineType } from 'sanity'

export const sectionType = defineType({
    name: 'section',
    title: 'Section (Layout & Padding)',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title (e.g. Overview)',
            type: 'string',
        }),
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            initialValue: '1-col',
            options: {
                list: [
                    { title: '1 Column (Full Width)', value: '1-col' },
                    { title: '2 Columns (50/50)', value: '2-col-50' },
                    { title: '2 Columns (40/60)', value: '2-col-40-60' },
                    { title: '2 Columns (60/40)', value: '2-col-60-40' },
                ],
                layout: 'radio'
            }
        }),
        defineField({
            name: 'padding',
            title: 'Padding (px)',
            type: 'object',
            fields: [
                { name: 'top', type: 'number', title: 'Top', initialValue: 0 },
                { name: 'bottom', type: 'number', title: 'Bottom', initialValue: 0 },
                { name: 'left', type: 'number', title: 'Left', initialValue: 0 },
                { name: 'right', type: 'number', title: 'Right', initialValue: 0 },
            ],
            options: {
                collapsible: true,
                collapsed: true
            }
        }),
        defineField({
            name: 'content',
            title: 'Content (for 1-Column Layout)',
            type: 'array',
            hidden: ({ parent }) => parent?.layout !== '1-col',
            of: [
                { type: 'richText' },
                { type: 'image', options: { hotspot: true } },
                {
                    type: 'object',
                    name: 'video',
                    title: 'Video',
                    fields: [
                        { name: 'url', title: 'URL', type: 'url' },
                        { name: 'caption', title: 'Caption', type: 'string' }
                    ]
                },
                { type: 'quoteBlock' },
                { type: 'tableBlock' },
                { type: 'beforeAfterBlock' },
                { type: 'flowBlock' },
                { type: 'tokensBlock' },
                { type: 'metricsBlock' },
                { type: 'learningsBlock' }
            ]
        }),
        defineField({
            name: 'leftColumn',
            title: 'Left Column Content',
            type: 'array',
            hidden: ({ parent }) => parent?.layout === '1-col',
            of: [
                { type: 'richText' },
                { type: 'image', options: { hotspot: true } },
                // Duplicate video here or reuse if extracted. Inline for now.
                {
                    type: 'object',
                    name: 'video',
                    title: 'Video',
                    fields: [
                        { name: 'url', title: 'URL', type: 'url' },
                        { name: 'caption', title: 'Caption', type: 'string' }
                    ]
                },
                { type: 'quoteBlock' },
                { type: 'tableBlock' },
                { type: 'beforeAfterBlock' },
                { type: 'flowBlock' },
                { type: 'tokensBlock' },
                { type: 'metricsBlock' },
                { type: 'learningsBlock' }
            ]
        }),
        defineField({
            name: 'rightColumn',
            title: 'Right Column Content',
            type: 'array',
            hidden: ({ parent }) => parent?.layout === '1-col',
            of: [
                { type: 'richText' },
                { type: 'image', options: { hotspot: true } },
                {
                    type: 'object',
                    name: 'video',
                    title: 'Video',
                    fields: [
                        { name: 'url', title: 'URL', type: 'url' },
                        { name: 'caption', title: 'Caption', type: 'string' }
                    ]
                },
                { type: 'quoteBlock' },
                { type: 'tableBlock' },
                { type: 'beforeAfterBlock' },
                { type: 'flowBlock' },
                { type: 'tokensBlock' },
                { type: 'metricsBlock' },
                { type: 'learningsBlock' }
            ]
        })
    ],
    preview: {
        select: {
            title: 'title',
            layout: 'layout'
        },
        prepare({ title, layout }) {
            return {
                title: title || `Section (${layout})`
            }
        }
    }
})

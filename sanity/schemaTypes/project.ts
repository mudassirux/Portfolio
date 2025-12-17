import { defineField, defineType } from 'sanity'

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'string',
        }),
        defineField({
            name: 'services',
            title: 'Services',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'content',
            title: 'Content Blocks',
            type: 'array',
            of: [
                // Split Text Block
                {
                    type: 'object',
                    name: 'split-text',
                    title: 'Split Text',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'body', type: 'text', title: 'Body Text' }
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            subtitle: 'body'
                        },
                        prepare({ title, subtitle }) {
                            return {
                                title: title || 'Split Text',
                                subtitle: subtitle
                            }
                        }
                    }
                },
                // Image Grid Block
                {
                    type: 'object',
                    name: 'image-grid',
                    title: 'Image Grid',
                    fields: [
                        {
                            name: 'images',
                            type: 'array',
                            title: 'Images',
                            of: [{ type: 'image', options: { hotspot: true } }]
                        }
                    ],
                    preview: {
                        select: {
                            images: 'images'
                        },
                        prepare({ images }) {
                            return {
                                title: `Image Grid (${images?.length || 0} images)`
                            }
                        }
                    }
                },
                // Gallery Block
                {
                    type: 'object',
                    name: 'gallery',
                    title: 'Gallery',
                    fields: [
                        {
                            name: 'images',
                            type: 'array',
                            title: 'Images',
                            of: [{ type: 'image', options: { hotspot: true } }]
                        }
                    ],
                    preview: {
                        select: {
                            images: 'images'
                        },
                        prepare({ images }) {
                            return {
                                title: `Gallery (${images?.length || 0} images)`
                            }
                        }
                    }
                },
                // Full Width Image
                {
                    type: 'object',
                    name: 'image-full',
                    title: 'Full Width Image',
                    fields: [
                        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                        { name: 'alt', type: 'string', title: 'Alt Text' }
                    ],
                    preview: {
                        select: {
                            media: 'image'
                        },
                        prepare({ media }) {
                            return {
                                title: 'Full Width Image',
                                media
                            }
                        }
                    }
                },
                // Divider / Line Block
                {
                    type: 'object',
                    name: 'divider',
                    title: 'Divider / Line',
                    fields: [
                        {
                            name: 'style',
                            title: 'Style',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Solid', value: 'solid' },
                                    { title: 'Dashed', value: 'dashed' },
                                    { title: 'Dotted', value: 'dotted' },
                                ],
                                layout: 'radio'
                            },
                            initialValue: 'solid'
                        }
                    ],
                    preview: {
                        select: {
                            style: 'style'
                        },
                        prepare({ style }) {
                            return {
                                title: `Divider (${style})`
                            }
                        }
                    }
                },
                // Padding / Spacer Block
                {
                    type: 'object',
                    name: 'padding',
                    title: 'Padding / Spacer',
                    fields: [
                        {
                            name: 'height',
                            title: 'Height (px)',
                            type: 'number',
                            initialValue: 50,
                            validation: (Rule: any) => Rule.min(0)
                        }
                    ],
                    preview: {
                        select: {
                            height: 'height'
                        },
                        prepare({ height }) {
                            return {
                                title: `Padding (${height}px)`
                            }
                        }
                    }
                },
                // Video Block
                {
                    type: 'object',
                    name: 'video',
                    title: 'Video',
                    fields: [
                        {
                            name: 'url',
                            title: 'Video URL (YouTube/Vimeo)',
                            type: 'url'
                        },
                        {
                            name: 'caption',
                            title: 'Caption',
                            type: 'string'
                        }
                    ],
                    preview: {
                        select: {
                            url: 'url',
                            caption: 'caption'
                        },
                        prepare({ url, caption }) {
                            return {
                                title: caption || 'Video',
                                subtitle: url
                            }
                        }
                    }
                },
                // Section Block
                {
                    type: 'section'
                }
            ]
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage'
        }
    }
})

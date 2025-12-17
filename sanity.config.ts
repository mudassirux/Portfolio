import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
    name: 'default',
    title: 'Portfolio Studio',

    projectId: 'nbb1m481',
    dataset: 'production',

    basePath: '/studio',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schema.types,
    },
})

import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { richTextType } from './richText'
import { sectionType } from './section'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [projectType, richTextType, sectionType],
}

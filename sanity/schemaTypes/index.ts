import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { richTextType } from './richText'
import { sectionType } from './section'
import { quoteBlock } from './blocks/quoteBlock'
import { tableBlock } from './blocks/tableBlock'
import { beforeAfterBlock } from './blocks/beforeAfterBlock'
import { flowBlock } from './blocks/flowBlock'
import { tokensBlock } from './blocks/tokensBlock'
import { metricsBlock } from './blocks/metricsBlock'
import { learningsBlock } from './blocks/learningsBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        projectType, 
        richTextType, 
        sectionType,
        quoteBlock,
        tableBlock,
        beforeAfterBlock,
        flowBlock,
        tokensBlock,
        metricsBlock,
        learningsBlock
    ],
}

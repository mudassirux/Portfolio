import { defineField, defineType } from 'sanity'

export const tableBlock = defineType({
    name: 'tableBlock',
    title: 'Table Block',
    type: 'object',
    fields: [
        defineField({
            name: 'columns',
            title: 'Columns',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Define the table headers',
        }),
        defineField({
            name: 'highlightRow',
            title: 'Highlight Row Index',
            type: 'number',
            description: '0-indexed row to highlight',
        }),
        defineField({
            name: 'rows',
            title: 'Rows',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'tableRow',
                    fields: [
                        {
                            name: 'cells',
                            title: 'Cells',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'tableCell',
                                    fields: [
                                        { name: 'text', type: 'string', title: 'Text' },
                                        { 
                                            name: 'cls', 
                                            type: 'string', 
                                            title: 'Class',
                                            options: {
                                                list: [
                                                    { title: 'Normal', value: '' },
                                                    { title: 'Yes (Green)', value: 'yes' },
                                                    { title: 'No (Red)', value: 'no' },
                                                    { title: 'Partial (Yellow)', value: 'par' },
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    preview: {
                        select: {
                            cells: 'cells'
                        },
                        prepare({ cells }) {
                            const title = cells && cells.length > 0 ? cells[0].text : 'Empty Row'
                            return { title: `Row: ${title}` }
                        }
                    }
                }
            ]
        })
    ],
    preview: {
        select: {
            columns: 'columns'
        },
        prepare({ columns }) {
            return {
                title: `Table (${columns?.length || 0} columns)`
            }
        }
    }
})

export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'approved',
            title: 'Approved',
            type: 'boolean',
            description: 'Comments wont be visible on website without approval',
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'comment',
            type: 'string',
        },
        {
            name: 'post',
            type: 'reference',
            to: [{type: 'post'}],
        }
    ]
}
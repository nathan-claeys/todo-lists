export const listListsSchema = {
    tags: ['lists'],
    summary: 'List all lists'
}
  

export const addListSchema = {
    tags: ['lists'],
    summary: 'Add a new list',
    body: {
        $ref: 'ITodoList#'
    }
}

export const updateListSchema = {
    tags: ['lists'],
    summary: 'Update a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    },
    body: {
        $ref: 'ITodoList#'
    }
}

export const addItemSchema = {
    tags: ['items'],
    summary: 'Add an item to a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        },
        required: ['id']
    },
    body: {
        $ref: 'ITodoItem#'
    }
}

export const deleteItemSchema = {
    tags: ['items'],
    summary: 'Delete an item from a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            idItem: { type: 'string' }
        },
        required: ['id', 'idItem']
    }
}

export const updateItemSchema = {
    tags: ['items'],
    summary: 'Update an item in a list',
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' },
            idItem: { type: 'string' }
        },
        required: ['id', 'idItem']
    },
    body: {
        $ref: 'ITodoItem#'
    }
}
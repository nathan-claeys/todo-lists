import { FastifyInstance } from 'fastify'
import * as itemController from '../../controllers/lists.controller'
import { addListSchema, listListsSchema, updateListSchema, addItemSchema, deleteItemSchema, updateItemSchema } from '../../schemas'

async function lists(fastify: FastifyInstance) {

  fastify.get('/',{ schema: listListsSchema }, itemController.listLists)

  // TODO implement addList in controller
  fastify.post('/',{ schema: addListSchema }, itemController.addList)

  //TODO implement updateList in controller
  fastify.put('/:id',{ schema: updateListSchema}, itemController.updateList)

  //TODO implement addItem in controller
  fastify.post('/:id/items',{ schema: addItemSchema}, itemController.addItem)

  //TODO implement deleteItem in controller
  fastify.delete('/:id/items/:idItem',{ schema: deleteItemSchema}, itemController.deleteItem)

  //TODO implement updateItem in controller
  fastify.put('/:id/items/:idItem',{ schema: updateItemSchema}, itemController.updateItem)
}

export default lists
import { FastifyInstance } from 'fastify'
import * as itemController from '../../controllers/lists.controller'

async function lists(fastify: FastifyInstance) {

  fastify.get('/', itemController.listLists)

  // TODO implement addList in controller
  fastify.post('/', itemController.addList)

  //TODO implement updateList in controller
  fastify.put('/:id', itemController.updateList)

  //TODO implement addItem in controller
  fastify.post('/:id/items', itemController.addItem)

  //TODO implement deleteItem in controller
  fastify.delete('/:id/items/:idItem', itemController.deleteItem)
}

export default lists
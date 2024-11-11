import { FastifyReply, FastifyRequest } from "fastify"
import { ITodoList } from "../interfaces"

const staticLists: ITodoList[] = [
  {
	id: 'l-1',
	description: 'Dev tasks',
  }
]

//export const listLists = async (
// request: FastifyRequest, 
// reply: FastifyReply) => {
//  Promise.resolve(staticLists)
//  .then((item) => {
//	reply.send({ data: item })
//  })
//}

export async function listLists(
  request: FastifyRequest, 
  reply: FastifyReply
) {
  console.log('DB status', this.level.db.status)
  const listsIter = this.level.db.iterator()

  const result: ITodoList[] = []
  for await (const [key, value] of listsIter) {
    result.push(JSON.parse(value))
  }
  reply.send({ data: result })
}


//export const addList = async (
//    request: FastifyRequest,
//    reply: FastifyReply) => {
//    const newList = request.body as ITodoList;
//    staticLists.push(newList);
//    reply.send({ data: newList });
//    }

export async function addList(
  request: FastifyRequest, 
  reply: FastifyReply
) {
 const list = request.body as ITodoList
 const result = await this.level.db.put(
   list.id.toString(), JSON.stringify(list)
 )
 reply.send({ data: result })
}


//export const updateList = async (
//    request: FastifyRequest,
//    reply: FastifyReply) => {
//    const {id: listId} = request.params as Pick<ITodoList, 'id'> ;
//    const updatedList = request.body as Partial<ITodoList>; // can be partial
//    // find the list to update
//    const list = staticLists.find((list) => list.id === listId) as ITodoList;
//    // update the list
//    if (list) {
//      for (const key in updatedList) {
//        if (key in list) {
//            list.description = updatedList.description as string;
//        }
//        else {
//            reply.code(400); //no value tu update
//        }
//        reply.send({ data: list });
//      }
//    }
//    else {
//        reply.code(404); // no list found
//    }   
//}

export async function updateList(
  request: FastifyRequest, 
  reply: FastifyReply
) {
 const {id: listId} = request.params as Pick<ITodoList, 'id'>;
 const updatedList = request.body as Partial<ITodoList>;
 const list = JSON.parse(await this.level.db.get(listId.toString()))
 if (list) {
   for (const key in updatedList) {
     if (key in list) {
       list[key] = updatedList[key]
      }
      else {
        reply.code(400)
      }
    const result = await this.level.db.put(listId.toString(), JSON.stringify(list))
    reply.send({ data: result })
  }
}
}


export async function addItem(
  request: FastifyRequest, 
  reply: FastifyReply
) {
  const { id: listId } = request.params as Pick<ITodoList, 'id'>;
  const item = request.body as Record<string, any>; 
  const list = JSON.parse(await this.level.db.get(listId.toString()));

  if (list) {
    // Initialiser la propriété `item` si elle n'existe pas
    list.item = list.item || {};

    // Ajouter ou mettre à jour les éléments
    for (const key in item) {
      list.item[key] = item[key];
    }
    await this.level.db.put(listId.toString(), JSON.stringify(list));
    reply.send({ data: 'Item added successfully' });
  } else {
    reply.status(404).send({ error: 'List not found' });
  }
}


export async function deleteItem(
  request: FastifyRequest, 
  reply: FastifyReply
) {
  const { id, idItem } = request.params as Pick<ITodoList, 'id'> & { idItem: string };
  const list = JSON.parse(await this.level.db.get(id.toString()));
  if (list && list.item) {
    delete list.item[idItem];
    await this.level.db.put(id.toString(), JSON.stringify(list));
    reply.send({ data: 'Item deleted successfully' });
  } else {
    reply.status(404).send({ error: 'List or item not found' });
  }
}

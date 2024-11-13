import { FastifyReply, FastifyRequest } from "fastify"
import { ITodoList, ITodoItem } from "../interfaces"

const staticLists: ITodoList[] = [
  {
	id: 'l-1',
	description: 'Dev tasks',
  }
]


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


export async function addList(
  request: FastifyRequest, 
  reply: FastifyReply
) {
 const list = request.body as ITodoList
 const result = await this.level.db.put(
   list.id.toString(), JSON.stringify(list)
 )
 reply.send({ data: "List added successfully" })
}

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
    reply.send({ data: "List updated successfully" })
  }
}
}


export async function addItem(
  request: FastifyRequest, 
  reply: FastifyReply
) {
  const { id: listId } = request.params as Pick<ITodoList, 'id'>;
  const item = request.body as ITodoItem; 
  const list = JSON.parse(await this.level.db.get(listId.toString()));

  if (list) {
    // Initialiser la propriété `item` si elle n'existe pas
    list.item = list.item || [];

    // Ajouter l'item à la liste
    list.item.push(item);

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
  const { id, idItem } = request.params as Pick<ITodoList, 'id'> & {idItem:string};
  const list = JSON.parse(await this.level.db.get(id.toString()));
  if (list && list.item) {
    // Trouver le bon item dans la liste et le supprimer
    var trouve = false;
    for (let i = 0; i < list.item.length; i++) {
      reply.send({ data: list.item[i].id, idItem });
      if (list.item[i].id === idItem) {
        list.item.splice(i, 1);
        trouve = true;
        break;
      }
    }
    await this.level.db.put(id.toString(), JSON.stringify(list));
    if (trouve) {
      reply.send({ data: 'Item deleted successfully' });
    } else {
      reply.status(404).send({ error: 'item not found' });
    }
  } else {
    reply.status(404).send({ error: 'List not found' });
  }
}


export async function updateItem(
  request: FastifyRequest, 
  reply: FastifyReply
) {
  const { id, idItem } = request.params as Pick<ITodoList, 'id'> & {idItem:string};
  const updatedItem = request.body as Partial<ITodoItem>; 
  const list = JSON.parse(await this.level.db.get(id.toString()));
  if (list && list.item) {
    // Trouver le bon item dans la liste et le mettre à jour
    var trouve = false;
    for (let i = 0; i < list.item.length; i++) {
      if (list.item[i].id === idItem) {
        trouve = true;
        list.item[i] = { ...list.item[i], ...updatedItem };
        await this.level.db.put(id.toString(), JSON.stringify(list));
        break;
      }
    }
    if (trouve) {
      reply.send({ data: 'Item updated successfully' });
    } else {
      reply.status(404).send({ error: 'Item not found' });
    }
  } else {
    reply.status(404).send({ error: 'List not found' });
  }
}



import axios from "axios"

const httpAddress = 'http://localhost:3000'

export const apiClient = {
    getLists: async () => {
        const todoLists = await axios.get(httpAddress + '/lists');
        const lists = todoLists.data.data.map((list: any) => list.id) || [];
        return (lists);
    },
    addList: async (listName: string) => {
        //lists.push(listName)
        await axios.post(httpAddress + '/lists', { id: listName , description : listName})
        const lists = await apiClient.getLists();
        return (lists);
    },
    getTodos: async (listName: string): Promise<string[]> => {
        const response = await axios.get(httpAddress + `/lists`);
        const list = response.data.data.find((list: any) => list.id === listName);
        const todos = list.item?.map((item: any) => item.id) || [];
        return (todos);
    },
    addTodo: async (listName: string, todo: string) => {
        await axios.post(httpAddress + '/lists/' + listName + '/items', { id: todo, description: todo, status: "pending"})
        const listItems = await apiClient.getTodos(listName);
        return (listItems);
    }
}

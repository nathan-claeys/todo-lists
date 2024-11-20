export interface ITodoList {
    id: string
    description: string
    item?: ITodoItem[]
  }

export interface ITodoItem {
  id: string
  description: string
  status: string
  }

export interface Category {
  id: string,
  title: string,
  type: string,
}

export type CreateCategory = Omit<Category, "id">

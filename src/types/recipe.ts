export interface Recipe {
  id: string
  title: string
  category: string
  instruction: string
  tags: string
  ingredients: string
  createdAt?: Date
  updatedAt?: Date
}

export type NewRecipe = Omit<Recipe, 'id'>

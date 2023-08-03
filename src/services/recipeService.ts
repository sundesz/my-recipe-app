import axios from 'axios'
import { NewRecipe, Recipe } from '../types/recipe'

class RecipeService {
  private baseUrl = `${process.env.VITE_BACKEND_URL}/api/v1/recipes`

  /**
   * Axios error handling
   */
  private axiosErrorHandling(error: unknown) {
    if (axios.isAxiosError(error)) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message)
      }
    }
  }

  /**
   * get all recipe
   */
  async getAllRecipes(): Promise<Recipe[]> {
    try {
      const response = await axios.get<Recipe[]>(`${this.baseUrl}`)
      return response.data
    } catch (error) {
      throw new Error('Error fetching data')
    }
  }

  /**
   * Search for recipe using recipe title
   */
  async searchRecipes(query: string): Promise<Recipe[]> {
    try {
      const response = await axios.get<Recipe[]>(`${this.baseUrl}?q=${query}`)
      return response.data
    } catch (error) {
      throw new Error('Error searching recipes')
    }
  }

  /**
   * Create recipe
   */
  async createRecipe(recipeData: NewRecipe): Promise<Recipe> {
    try {
      const response = await axios.post<Recipe>(`${this.baseUrl}`, recipeData)
      return response.data
    } catch (error: unknown) {
      this.axiosErrorHandling(error)
      throw new Error('Failed to create recipe.')
    }
  }

  /**
   * Update recipe
   */
  async updateRecipe(recipeData: Recipe): Promise<Recipe> {
    try {
      const response = await axios.put<Recipe>(
        `${this.baseUrl}/${recipeData.id}`,
        recipeData
      )
      return response.data
    } catch (error: unknown) {
      this.axiosErrorHandling(error)
      throw new Error('Failed to update recipe.')
    }
  }

  /**
   * Delete recipe
   */
  async deleteRecipe(recipeId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/${recipeId}`)
    } catch (error: unknown) {
      this.axiosErrorHandling(error)
      throw new Error('Failed to delete recipe.')
    }
  }
}

export default RecipeService

import { createContext, useState, ReactNode } from 'react'
import { Recipe } from './types/recipe'

interface RecipeContextData {
  recipes: Recipe[]
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
}

export const RecipeContext = createContext<RecipeContextData>({
  recipes: [],
  setRecipes: () => {},
})

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  )
}

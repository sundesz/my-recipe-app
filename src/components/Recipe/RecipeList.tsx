import { useContext, useEffect } from 'react'
import RecipeCard from './RecipeCard'
import { RecipeContext } from '../../RecipeContext'
import RecipeService from '../../services/recipeService'

const RecipeList: React.FC = () => {
  const { recipes, setRecipes } = useContext(RecipeContext)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipeService = new RecipeService()
        const data = await recipeService.getAllRecipes()
        setRecipes(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRecipes()
  }, [setRecipes])

  return (
    <div className='recipe-list'>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipeList

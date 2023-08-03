import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import { toast } from 'react-toastify'
import RecipeForm from './RecipeForm'
import GoBack from '../GoBack'
import { RecipeContext } from '../../RecipeContext'
import RecipeService from '../../services/recipeService'
import { capitalize, replaceLineBreaks } from '../../utils/helper'

const RecipeItem: React.FC = () => {
  const { recipes, setRecipes } = useContext(RecipeContext)
  const [showEditForm, setShowEditForm] = useState<boolean>(false)

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const recipe = recipes.find((r) => r.id === id)

  if (!recipe) {
    return <div>Recipe not found!</div>
  }

  const handleDelete = async (recipeId: string) => {
    try {
      const recipeService = new RecipeService()
      await recipeService.deleteRecipe(recipeId)

      setRecipes((prevRecipes) => prevRecipes.filter((r) => r.id !== id))

      toast.success('Recipe delete successfully')
      navigate(`/recipes`)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const handleEdit = () => {
    setShowEditForm(true)
  }

  return (
    <section className='dark:bg-lime-950'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400'>
          <div className='flex justify-between items-center'>
            <h2 className='mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white'>
              {recipe.title}
            </h2>
            <GoBack />
          </div>
          <p className='mb-4 font-light'>Category: {recipe.category}</p>
          <p className='mb-4 font-light'>
            Ingredients:{' '}
            {recipe.ingredients
              .split(',')
              .map((ingredient) => capitalize(ingredient))
              .join(', ')}
          </p>
          <p className='mb-4 font-medium'>
            Instructions: <br />
            {parse(replaceLineBreaks(recipe.instruction))}
          </p>
        </div>

        <div className='flex space-x-4 mt-7'>
          <button
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={handleEdit}
          >
            Edit
          </button>

          <button
            type='button'
            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
            onClick={() => handleDelete(recipe.id)}
          >
            Delete
          </button>
        </div>

        {showEditForm && <RecipeForm initialRecipe={recipe} />}
      </div>
    </section>
  )
}

export default RecipeItem

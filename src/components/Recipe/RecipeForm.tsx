import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RecipeContext } from '../../RecipeContext'
import { NewRecipe, Recipe } from '../../types/recipe'
import RecipeService from '../../services/recipeService'

interface RecipeFormProps {
  initialRecipe?: Recipe
}

const RecipeForm: React.FC<RecipeFormProps> = ({ initialRecipe }) => {
  const navigate = useNavigate()
  const { setRecipes } = useContext(RecipeContext)
  const [title, setTitle] = useState(initialRecipe?.title || '')
  const [ingredients, setIngredients] = useState(
    initialRecipe?.ingredients || ''
  )
  const [tags, setTags] = useState(initialRecipe?.tags || '')
  const [instruction, setInstruction] = useState(
    initialRecipe?.instruction || ''
  )
  const [category, setCategory] = useState(initialRecipe?.category || '')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const recipeData: NewRecipe = {
        title,
        ingredients,
        instruction,
        category,
        tags,
      }

      const recipeService = new RecipeService()
      let newEditRecipe: Recipe

      if (initialRecipe) {
        // If initialRecipe is provided, update the recipe
        newEditRecipe = await recipeService.updateRecipe({
          id: initialRecipe.id,
          ...recipeData,
        })
        setRecipes((prevRecipes) =>
          prevRecipes.filter((r) =>
            r.id === initialRecipe.id ? newEditRecipe : r
          )
        )

        setRecipes((prevRecipes) => [...prevRecipes, newEditRecipe])
        toast.success('Recipe update successfully')
        navigate(`/recipes`)
      } else {
        // Otherwise, create a new recipe
        newEditRecipe = await recipeService.createRecipe(recipeData)
        setRecipes((prevRecipes) => [...prevRecipes, newEditRecipe])
        toast.success('Recipe create successfully')
        navigate(`/recipes/${newEditRecipe.id}`)
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-opacity-75 bg-gray-500 flex items-center justify-center'>
      <div className='bg-white rounded shadow-md p-6 w-96'>
        <h2 className='text-2xl font-semibold mb-4'>
          {initialRecipe ? 'Update' : 'Add New'} Recipe
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-gray-700 font-semibold'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className='w-full border border-gray-300 rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='ingredients'
              className='block text-gray-700 font-semibold'
            >
              Ingredients
            </label>
            <textarea
              id='ingredients'
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
              className='w-full border border-gray-300 rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='instructions'
              className='block text-gray-700 font-semibold'
            >
              Instructions
            </label>
            <textarea
              id='instruction'
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              required
              className='w-full border border-gray-300 rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='tags' className='block text-gray-700 font-semibold'>
              Tags
            </label>
            <input
              type='text'
              id='tags'
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
              className='w-full border border-gray-300 rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-500'
            />
          </div>
          <div className='mb-4'>
            <label
              htmlFor='category'
              className='block text-gray-700 font-semibold'
            >
              Category
            </label>
            <input
              type='text'
              id='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className='w-full border border-gray-300 rounded py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-blue-500'
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300'
            >
              {initialRecipe ? 'Edit' : 'Add'} Recipe
            </button>
            <button
              type='button'
              onClick={() => navigate(-1)}
              className='bg-gray-300 text-gray-700 py-2 px-4 rounded ml-4 focus:outline-none focus:ring focus:border-gray-300'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecipeForm

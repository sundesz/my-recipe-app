import { Link } from 'react-router-dom'
import { Recipe } from '../../types/recipe'
import RecipeTags from './RecipeTags'

interface RecipeCardProps {
  recipe: Recipe
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg bg-lime-300 recipe-card'>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2 text-green-600'>
          <Link to={`/recipes/${recipe.id}`} className='selection'>
            {recipe.title}
          </Link>
        </div>
        <p className='text-gray-700 text-base'>{recipe.category}</p>
      </div>

      <RecipeTags tags={recipe.tags} />

      <Link to={`/recipes/${recipe.id}`} className='px-6 pt-4 pb-2 '>
        Read more ...
      </Link>
    </div>
  )
}

export default RecipeCard

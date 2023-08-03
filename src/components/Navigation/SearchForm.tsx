import { useContext, useState } from 'react'
import { RecipeContext } from '../../RecipeContext'
import RecipeService from '../../services/recipeService'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SearchForm: React.FC = () => {
  const { setRecipes } = useContext(RecipeContext)
  const [searchParams] = useSearchParams()

  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('tutorial') ?? ''
  )
  const navigate = useNavigate()

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const recipeService = new RecipeService()
      const searchResult = await recipeService.searchRecipes(searchQuery)
      setRecipes(searchResult)
      navigate(`/recipes?q=${searchQuery}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      className='w-50 flex justify-center md:justify-between'
      onSubmit={handleSearch}
    >
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='bg-white p-2 w-70 text-base rounded-xl'
        placeholder='Search recipe name ...'
      />
    </form>
  )
}

export default SearchForm

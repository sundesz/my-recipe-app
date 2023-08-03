import { capitalize } from '../../utils/helper'

interface RecipeTagsProps {
  tags: string
}

const RecipeTags = ({ tags }: RecipeTagsProps) => {
  const tagArray = tags.split(',').map((tag) => capitalize(tag))
  return (
    <div className='px-6 pt-4 pb-2'>
      {tagArray.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}

export default RecipeTags

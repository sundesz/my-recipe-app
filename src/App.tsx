import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './components/Home'
import Layout from './components/Layout'
import Page404 from './components/Page404'
import RecipeList from './components/Recipe/RecipeList'
import RecipeItem from './components/Recipe/RecipeItem'
import RecipeForm from './components/Recipe/RecipeForm'

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer
        position='top-center'
        autoClose={1000}
        style={{ width: '600px' }}
      />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='recipes'>
            <Route index element={<RecipeList />} />
            <Route path=':id' element={<RecipeItem />} />
            <Route path='new' element={<RecipeForm />} />
          </Route>

          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

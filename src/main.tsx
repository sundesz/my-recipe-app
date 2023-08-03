import React from 'react'
import ReactDOM from 'react-dom/client'
import { RecipeProvider } from './RecipeContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </React.StrictMode>
)

import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navigation/Navbar'

const Layout: React.FC = () => {
  return (
    <div className='container mx-auto bg-lime-200'>
      <Navbar />
      <main className='my-6'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout

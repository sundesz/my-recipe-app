const Footer: React.FC = () => {
  return (
    <footer className='bg-gray-200 py-4 text-center'>
      <p>
        &copy; {new Date().getFullYear()} My Recipe App. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer

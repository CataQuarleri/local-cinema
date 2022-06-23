import React, {useRef, useEffect} from 'react'
import { useMovies, DISCOVER_URL } from '../context/api/MoviesProvider'
export default function Header() {
  const searchInput = useRef()
  
  const { setSearchRef, movieDiscover } = useMovies()

function handleInput(){
  setSearchRef(searchInput.current.value)
  if(searchInput.current.value.length == 0){
    movieDiscover(DISCOVER_URL)
  }
}

  return (
    <header>
        <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://businessviewmagazine.com/wp-content/uploads/2020/11/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg')", height: 400}}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3 mt-5'>Local Cinema</h1>
              <h4 className='mb-3'>Discover movies!</h4>
              <input ref={searchInput} onChange={handleInput} type="text" placeholder="Discover amazing movies!"></input>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
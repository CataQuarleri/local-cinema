import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'

const MoviesContext = React.createContext(MoviesProvider)

export function useMovies(){
  return useContext(MoviesContext)
}

const API_KEY = "75752b8523cefa803703abdd0fbc28eb"
export const DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.asc&certification_country=AR&certification=AR`

export function MoviesProvider({children}) {
  const [moviesArray, setMoviesArray] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchRef, setSearchRef ] = useState('')
  const [searchResults, setSearchResults] = useState([])
  
  const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchRef}`
 
  async function search(){
   if(searchRef.length >= 1) {
    try{
    axios.get(SEARCH_URL)
    .then(data => {
      if(data){
        console.log('data from search', data)
        setSearchResults(data.data.results)
      }
    })
  }catch(error){
    console.log(`Este es el error de Search ${error}`)
  }}
  }

  // console.log('el search ref en el context', searchRef)
  function movieDiscover(url){
    try{
      axios.get(url)
      .then(data => {
        if(data){
          setMoviesArray(data.data.results)
          setIsLoading(false)
        }
      })
    }catch(error){
        console.log(error)
      }
}

useEffect(()=>{
  setTimeout(()=> search(), 200)
}, [searchRef])

useEffect(()=>{
  movieDiscover(DISCOVER_URL)
}, [])

const posteredMovies = []

moviesArray.map(eachMovie => {
  if(!eachMovie.poster_path){
    return
  } else{
    return posteredMovies.push(eachMovie)
  }
})

const posteredSearch = []

searchResults.map(eachMovie => {
  if(!eachMovie.poster_path){
    return
  }else{
    return posteredSearch.push(eachMovie)
  }
})

const value={ 
  moviesArray,
  isLoading,
  posteredMovies, 
  setSearchRef,
  searchRef,
  searchResults,
  posteredSearch,
  movieDiscover
}
  return (
   <MoviesContext.Provider value={value}>
    {!isLoading && children}
   </MoviesContext.Provider>
  )
}

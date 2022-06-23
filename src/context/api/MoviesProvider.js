import React, {
	useContext,
	useState,
	useEffect,
} from 'react';
import axios from 'axios';

const MoviesContext = React.createContext(
	MoviesProvider
);

export function useMovies() {
	return useContext(MoviesContext);
}

const API_KEY = '75752b8523cefa803703abdd0fbc28eb';


export function MoviesProvider({ children }) {
  const [moviesArray, setMoviesArray] = useState([]);
	const [isLoading, setIsLoading] =	useState(true);
	const [searchRef, setSearchRef] = useState('');
	const [searchResults, setSearchResults] = useState([]);
  const [rating, setRating] = useState(null)
  const [voteAverageMin, setVoteAverageMin] = useState(null)
  const [voteAverageMax, setVoteAverageMax] = useState(null)

  console.log("moviesArray", moviesArray)
  
  const DISCOVER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&certification_country=AR&certification=AR`;

  const FILTER_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&vote_average.gte=${voteAverageMin}&vote_average.lte=${voteAverageMax}&certification_country=AR&certification=AR`;

  console.log("filter", FILTER_URL)

	const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchRef}`;

	async function search() {
		if (searchRef.length >= 1) {
			try {
				axios.get(SEARCH_URL).then((data) => {
					if (data) {
						console.log('data from search', data);
						setSearchResults(data.data.results);
					}
				});
			} catch (error) {
				console.log(
					`Este es el error de Search ${error}`
				);
			}
		}
	}

	function movieDiscover(url) {
		try {
			axios.get(url).then((data) => {
				if (data) {
					setMoviesArray(data.data.results);
					setIsLoading(false);
				}
			});
		} catch (error) {
			console.log(error);
		}
	}

  
	useEffect(() => {
		setTimeout(() => search(), 200);
	}, [searchRef]);

	useEffect(() => {
		movieDiscover(DISCOVER_URL);
	}, []);

  useEffect(()=>{
    switch (rating) {
      default:
        setVoteAverageMin("0");
        setVoteAverageMax("10");
          break;
      case 0:
        setVoteAverageMin("0");
        setVoteAverageMax("2.0");
          break;
      case 1:
        setVoteAverageMin("2.1");
        setVoteAverageMax("4.0");
          break;
      case 2:
        setVoteAverageMin("4.1");
        setVoteAverageMax("6.0");
          break;
      case 3:
        setVoteAverageMin("6.1");
        setVoteAverageMax("8.0");
          break;
      case 4:
        setVoteAverageMin("8.1");
        setVoteAverageMax("10");
          break;
  }
    // let regex = new RegExp(`/${voteAverageMin}-${voteAverageMax}/g`)
    // console.log("regex", regex)
    // moviesArray.filter(movie=> String(movie.vote_average).match(regex))
    movieDiscover(FILTER_URL)
  }, [rating])

	const posteredSearch = [];

	searchResults.map((eachMovie) => {
		if (!eachMovie.poster_path) {
			return;
		} else {
			return posteredSearch.push(eachMovie);
		}
	});

	const value = {
		moviesArray,
		isLoading,
		setSearchRef,
		searchRef,
		searchResults,
		posteredSearch,
		movieDiscover,
    rating,
    setRating
	};
	return (
		<MoviesContext.Provider value={value}>
			{!isLoading && children}
		</MoviesContext.Provider>
	);
}

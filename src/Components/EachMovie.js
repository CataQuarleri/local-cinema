import React, { useState } from 'react';
// import { Card, Image } from 'react-bootstrap'
import { useMovies } from '../context/api/MoviesProvider';
import MovieModal from './MovieModal';

export default function EachMovie() {
	const {
		moviesArray,
		posteredSearch,
		searchRef
	} = useMovies();
	const [openModal, setOpenModal] =
		useState(false);
	const [movieId, setMovieId] = useState();

	const showModal = function (movieId) {
		setOpenModal(!openModal);
		setMovieId(movieId);
	};
	let discoverCards = moviesArray.map(
		(eachMovie, i) => {

			return (
				<img
					key={i}
					src={`https://image.tmdb.org/t/p/original${eachMovie.poster_path}`}
					className='img-responsive img-thumbnail m-2'
					style={{ maxWidth: 200 }}
					onClick={() => showModal(eachMovie.id)}
				/>
			);
		}
	);

	let searchCards = posteredSearch.map(
		(eachMovie, i) => {
			return (
				<img
					key={i}
					src={`https://image.tmdb.org/t/p/original/${eachMovie.poster_path}`}
					className='img-responsive img-thumbnail m-2'
					style={{ maxWidth: 200 }}
					onClick={() => showModal(eachMovie.id)}
				/>
			);
		}
	);
	console.log(
		'posteredSearch en each',
		searchCards
	);
	console.log('discovercards', discoverCards);

	return (
		<>
			{searchRef.length < 1
				? discoverCards
				: searchCards}
			{/* {searchCards} */}

			{openModal && (
				<MovieModal
					showModal={showModal}
					movieId={movieId}
				/>
			)}
		</>
	);
}

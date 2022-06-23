import React from 'react';
import {
	Modal,
	Card,
	Button,
} from 'react-bootstrap';
import { useMovies } from '../context/api/MoviesProvider';

export default function MovieModal({
	showModal,
	movieId,
}) {
	const {
		moviesArray,
		posteredSearch,
		searchRef,
	} = useMovies();

	const movieDetailSearch = posteredSearch.find(
		(oneMovie) => oneMovie.id == movieId
	);

	const movieDetailDiscover = moviesArray.find(
		(oneMovie) => oneMovie.id == movieId
	);

	console.log('movie detail', movieDetailSearch);
	return (
		<>
			<Modal
				show={showModal}
				onHide={() => showModal()}>
				<Card className='mb-3'>
					<Card.Img
						variant='top'
						src={`https://image.tmdb.org/t/p/original${
							(searchRef.length > 2
								? movieDetailSearch
								: movieDetailDiscover
							).poster_path
						}`}
					/>
					<Card.Body className='m-4'>
						<Card.Title>
							{
								(searchRef.length > 2
									? movieDetailSearch
									: movieDetailDiscover
								).original_title
							}
						</Card.Title>
						<Card.Text>
							{
								(searchRef.length > 2
									? movieDetailSearch
									: movieDetailDiscover
								).overview
							}
							
						</Card.Text>
						<Card.Text>Rating: {(searchRef.length > 2
									? movieDetailSearch
									: movieDetailDiscover
								).vote_average}
								</Card.Text>
					</Card.Body>
					<span className='d-flex justify-content-around'>
						<Button>Book ticket</Button>
						<Button onClick={() => showModal()}>
							Close
						</Button>
					</span>
				</Card>
			</Modal>
		</>
	);
}

import React from 'react';
import { Container } from 'react-bootstrap';
import EachMovie from './EachMovie';
import { useMovies } from '../context/api/MoviesProvider';

export default function SearchMovies() {
	const { isLoading } = useMovies();
	return (
		<Container className='d-flex flex-row flex-wrap mt-2 container-md'>

			{!isLoading && <EachMovie />}

		</Container>
	);
}

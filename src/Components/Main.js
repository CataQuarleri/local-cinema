import React from 'react';
import Header from './Header';
import StarFilter from './StarFilter';
import SuggestedMovies from './SuggestedMovies';
import SearchMovies from './SearchMovies';
import { TbSpeakerphone, TbSearch } from 'react-icons/tb'
import { Container } from 'react-bootstrap';
import { useMovies } from '../context/api/MoviesProvider';

export default function Main() {
	const { searchRef } = useMovies();
	console.log('search ref', searchRef);
	return (
		<>
			<Header />
           
			<Container className='d-flex flex-column self-align-center m-auto p-5'>
				{searchRef.length >= 1 ? (
					<h4><TbSearch/> Search results</h4>
				) : (
					<h4><TbSpeakerphone/> Suggested Movies</h4> 
				)}
				{searchRef.length >= 1 ? (
					<SearchMovies />
				) : (
					<> <StarFilter/> <SuggestedMovies /></>
				)}
			</Container>
		</>
	);
}

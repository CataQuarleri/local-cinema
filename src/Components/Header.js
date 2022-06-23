import React, { useRef } from 'react';
import {	useMovies } from '../context/api/MoviesProvider';
export default function Header() {
	const searchInput = useRef();

	const { setSearchRef } =	useMovies();

	function handleInput() {
		setSearchRef(searchInput.current.value);
	}

	return (
		<header>
			<div
				className='p-5 text-center bg-image'
				style={{
					backgroundImage:
						"url('https://businessviewmagazine.com/wp-content/uploads/2020/11/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg')",
					height: 400,
				}}>
				<div
					className='mask'
					style={{
						backgroundColor: 'rgba(0, 0, 0, 0.4)',
					}}>
					<div className='d-flex justify-content-center align-items-center h-100'>
						<div className='text-white'>
							<h1 className='mb-3 mt-5'>
								Local Cinema
							</h1>
							<h4 className='mb-3'>
								Discover movies!
							</h4>
							<input
								ref={searchInput}
								onChange={handleInput}
								type='text'
								placeholder='Discover amazing movies!'></input>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

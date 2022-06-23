import React from 'react';
import { FaStar } from 'react-icons/fa';
import {useMovies} from '../context/api/MoviesProvider'


export default function StarFilter() {
    const { rating, setRating } = useMovies()
	
    return (
		<div className='m-auto border border-warning rounded p-2'>
			{[...Array(5)].map((star, i) => {
				return (
					<label key={i}>
						<input
							type='radio'
							name='calification'
							style={{ display: 'none' }}
							value={i}
                            onClick={()=>setRating(i)}
						/>
						<FaStar
                            color={i <= rating ? "#ffd700" : "e4e5e9"}
                       
							style={{ cursor: 'pointer' }}
                            size={40}
						/>
					</label>
				);
			})}
		</div>
	);
}

import React from 'react';
import { MoviesProvider } from './context/api/MoviesProvider';
import Main from './Components/Main';
import './App.css';
function App() {
	return (
		<MoviesProvider>
			<Main />
		</MoviesProvider>
	);
}

export default App;

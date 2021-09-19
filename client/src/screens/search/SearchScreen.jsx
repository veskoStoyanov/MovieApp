import { useState, useEffect } from 'react';

import { Wrapper } from './SearchScreen.style';
import { Movie, Search } from '../../components';
import { makeRequest } from '../../utility';

const SearchScreen = () => {
	const [movies, setMovies] = useState([]);
	const [ allMovies, setAllMovies] = useState([])

	const initial = async () => {
		const {data} = await makeRequest(null, 'movies');

		setMovies(data);
		setAllMovies(data);
	};

	useEffect(() => {
		initial()
	}, [])

	return (<Wrapper>
		<div className="search-container">
			<h1>Search</h1>
			<Search allMovies={allMovies} setMovies={setMovies} />
		</div>
		<div className="grid">
			{movies.length ? movies.map(movie => (
				<div className="grid-item" key={movie._id}>
					<Movie setMovies={setMovies} hide={true} movie={movie} />
				</div>
			)) : (<h2>No Movies!</h2>)}
		</div>
	</Wrapper>);
};

export default SearchScreen;

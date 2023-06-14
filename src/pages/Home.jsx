import React, { useState } from "react";
import "./Home.css";
import movies from "../data/MovieData";
import SingleMovie from "../components/SingleMovie";

const Home = () => {
	const [sortedMovies, setSortedMovies] = useState(movies);
	const [searchWord, setSearchWord] = useState("");

	const sortDateAscending = () => {
		const sortedByDate = [...sortedMovies].sort((a, b) => a.year - b.year);
		setSortedMovies(sortedByDate);
	};

	const sortDateDescending = () => {
		const sortedByDate = [...sortedMovies].sort((a, b) => b.year - a.year);
		setSortedMovies(sortedByDate);
	};

	const sortBestRate = () => {
		const sortedByRate = [...sortedMovies].sort((a, b) => b.rate - a.rate);
		setSortedMovies(sortedByRate);
	};

	const sortAZ = () => {
		const sortedByName = [...sortedMovies].sort((a, b) =>
			a.title.localeCompare(b.title),
		);
		setSortedMovies(sortedByName);
	};

	const sortZA = () => {
		const sortedByName = [...sortedMovies].sort((a, b) =>
			b.title.localeCompare(a.title),
		);
		setSortedMovies(sortedByName);
	};

	const searchForWord = event => {
		setSearchWord(event.target.value);
		const filterMovie = movies.filter(movie =>
			movie.title.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()),
		);
		setSortedMovies(filterMovie);
	};

	return (
		<div className='wrapper'>
			<h1>Movie Database</h1>
			<div className='functionality'>
				<div>
					<button onClick={sortDateAscending}>Sort by Date Ascending</button>
					<button onClick={sortDateDescending}>Sort by Date Descending</button>
					<button onClick={sortBestRate}>Best Rate</button>
					<button onClick={sortAZ}>A-Z</button>
					<button onClick={sortZA}>Z-A</button>
				</div>

				<div className='search-div'>
					<input
						type='text'
						placeholder='Search Movie by title'
						value={searchWord}
						onChange={searchForWord}
					/>
					<img
						className='lupe'
						width='50'
						height='50'
						src='https://img.icons8.com/ios/50/search--v1.png'
						alt='search--v1'
					/>
				</div>
			</div>

			<section className='movie-section'>
				{sortedMovies.map((movie, i) => (
					<SingleMovie key={i} movie={movie} />
				))}
			</section>
		</div>
	);
};

export default Home;

// Import necessary dependencies and components
import React, { useState } from "react";
import "./Home.css";
import movies from "../data/MovieData";
import SingleMovie from "../components/SingleMovie";
import { useEffect } from "react";

const Home = () => {
	// State variables to manage movie sorting and search
	const [sortedMovies, setSortedMovies] = useState(movies);
	const [searchWord, setSearchWord] = useState("");

	// Function to sort movies by date in ascending order
	const sortDateAscending = () => {
		// Create a new array with a copy of sortedMovies
		const sortedByDate = [...sortedMovies].sort((a, b) => a.year - b.year);
		// Update the sortedMovies state with the sorted array
		setSortedMovies(sortedByDate);
	};

	// Function to sort movies by date in descending order
	const sortDateDescending = () => {
		// Create a new array with a copy of sortedMovies
		const sortedByDate = [...sortedMovies].sort((a, b) => b.year - a.year);
		// Update the sortedMovies state with the sorted array
		setSortedMovies(sortedByDate);
	};

	// Function to sort movies by best rate
	const sortBestRate = () => {
		// Create a new array with a copy of sortedMovies
		const sortedByRate = [...sortedMovies].sort((a, b) => b.rate - a.rate);
		// Update the sortedMovies state with the sorted array
		setSortedMovies(sortedByRate);
	};

	// Function to sort movies alphabetically from A to Z
	const sortAZ = () => {
		// Create a new array with a copy of sortedMovies
		const sortedByName = [...sortedMovies].sort((a, b) =>
			a.title.localeCompare(b.title),
		);
		// Update the sortedMovies state with the sorted array
		setSortedMovies(sortedByName);
	};

	// Function to sort movies alphabetically from Z to A
	const sortZA = () => {
		// Create a new array with a copy of sortedMovies
		const sortedByName = [...sortedMovies].sort((a, b) =>
			b.title.localeCompare(a.title),
		);
		// Update the sortedMovies state with the sorted array
		setSortedMovies(sortedByName);
	};

	// Function to search for movies based on the entered search word
	const searchForWord = event => {
		// Update the searchWord state with the entered value
		setSearchWord(event.target.value);
		// Filter the movies array based on the search word
		const filterMovie = movies.filter(movie =>
			movie.title.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()),
		);
		// Update the sortedMovies state with the filtered array
		setSortedMovies(filterMovie);
	};

	// Function to show all movies (resetting the sorting and filtering)
	const showAllMovies = () => {
		// Reset the sortedMovies state to the original movies array
		setSortedMovies(movies);
	};

	// State variables to manage unique genres
	const [uniqueGenres, setUniqueGenres] = useState([]);

	// Find unique genres from all movies using Set and flatMap
	const uniqueGenresDistinct = Array.from(
		new Set(movies.flatMap(movie => movie.genre)),
	);

	// Set the unique genres once when the component mounts
	useEffect(() => {
		// Update the uniqueGenres state with the unique genres array
		setUniqueGenres(uniqueGenresDistinct);
	}, []);

	// Function to filter movies based on selected genre
	const filterByGenre = genre => {
		// Filter the movies array based on the selected genre
		const filteredMoviesByGenre = movies.filter(movie =>
			movie.genre.includes(genre),
		);
		// Update the sortedMovies state with the filtered array
		setSortedMovies(filteredMoviesByGenre);
	};

	return (
		<div className='wrapper'>
			<h1>Movie Database</h1>
			<div className='functionality'>
				<div>
					{/* Buttons for sorting */}
					<button onClick={sortDateAscending}>Sort by Date Ascending</button>
					<button onClick={sortDateDescending}>Sort by Date Descending</button>
					<button onClick={sortBestRate}>Best Rate</button>
					<button onClick={sortAZ}>A-Z</button>
					<button onClick={sortZA}>Z-A</button>

					{/* Buttons for filtering by genre */}
					{uniqueGenres.map((genre, index) => (
						<button key={index} onClick={() => filterByGenre(genre)}>
							{genre}
						</button>
					))}

					{/* Button to show all movies */}
					<button onClick={showAllMovies}>Show All Movies</button>
				</div>

				<div className='search-div'>
					{/* Input field for searching movies */}
					<input
						type='text'
						placeholder='Search Movie by title'
						value={searchWord}
						onChange={searchForWord}
					/>
					{/* Search icon */}
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
				{/* Render the sortedMovies array as SingleMovie components */}
				{sortedMovies.map((movie, i) => (
					<SingleMovie key={i} movie={movie} />
				))}
			</section>
		</div>
	);
};

export default Home;

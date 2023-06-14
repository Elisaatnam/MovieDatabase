import "./SingleMovie.css";

const SingleMovie = props => {
	return (
		<article>
			<div>
				<h2>{props.movie.title}</h2>
			</div>
			<div>
				<h3>{props.movie.year}</h3>
				<h3>{props.movie.director}</h3>
				<h3>{props.movie.duration}</h3>
				<h3>{props.movie.rate}</h3>
			</div>
			<div>
				{props.movie.genre.map((genre, i) => (
					<div key={i} className='genre'>
						{genre}
					</div>
				))}
			</div>
		</article>
	);
};

export default SingleMovie;

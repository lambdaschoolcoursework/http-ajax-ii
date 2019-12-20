import React from 'react';

const MovieCard = props => {
	const {title, director, metascore, stars, poster} = props.movie;
	return (
		<div className="movie">
			<img src={poster} alt='movie poster'/>
		</div>
	);
};

export default MovieCard;

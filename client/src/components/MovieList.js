import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";

export default class MovieList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: []
		};
	};

	componentDidMount() {
		axios.get("http://localhost:5000/api/movies")
			.then(res => this.setState({movies: res.data}))
			.catch(err => console.log(err.response));
	};

	render() {
		return (
			<div className="movie-container">
				<h3>Trending Now</h3>
				<div className='movies'>
					{this.state.movies.map(movie => (
						<MovieDetails key={movie.id} movie={movie} />
					))}
				</div>
			</div>
		);
	};
};

function MovieDetails({movie}) {
	return (
		<Link to={`/movies/${movie.id}`}><MovieCard movie={movie}/></Link>
	);
};
import React from "react";
import axios from "axios";

export default class Movie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: null
		};
	};

	componentDidMount() {
		this.fetchMovie(this.props.match.params.id);
	}

	componentWillReceiveProps(newProps) {
		if (this.props.match.params.id !== newProps.match.params.id) {
			this.fetchMovie(newProps.match.params.id);
		};
	};

	fetchMovie = id => {
		axios.get(`http://localhost:5000/api/movies/${id}`)
			.then(res => this.setState({movie: res.data}))
			.catch(err => console.log(err.response));
	};

	saveMovie = () => {
		const addToSavedList = this.props.addToSavedList;
		addToSavedList(this.state.movie);
	};

	editMovie = id => {
		this.props.history.push(`/edit/${id}`);
	};

	deleteMovie = id => {
		axios.delete(`http://localhost:5000/api/movies/${id}`)
			.then(res => this.props.history.push('/'))
			.catch(err => console.log(err));
	};

	render() {
		if (!this.state.movie) {
			return <div>Loading movie information...</div>;
		};

		return (
			<div className="movie-information-container">
				<img src={this.state.movie.poster} alt='movie-poster'/>
				<div className='movie-information'>
					<h3>{this.state.movie.title}</h3>
					<h4>Director</h4>
					<p>{this.state.movie.director}</p>
					<h4>Metascore</h4>
					<p>{this.state.movie.metascore}</p>
					<h4>Cast</h4>
					<p>{this.state.movie.stars.map(item => <p>{item}</p>)}</p>
					<button onClick={this.saveMovie}>Save</button>
					<button onClick={() => this.editMovie(this.state.movie.id)}>Edit</button>
					<button onClick={() => this.deleteMovie(this.state.movie.id)}>Delete</button>
				</div>
			</div>
		);
	};
};

import React, {useState} from "react";
import {Route} from "react-router-dom";
import SavedList from "./components/SavedList";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import UpdateMovie from "./components/UpdateMovie";
import Header from './components/Header';

const App = () => {
	const [savedList, setSavedList] = useState([]);

	const addToSavedList = movie => {
		setSavedList([...savedList, movie]);
	};

	return (
		<div className='App'>
			<Route path="/" component={Header}/>
			<Route exact path="/" component={MovieList}/>
			<Route path="/movies/:id" render={props => <Movie {...props} addToSavedList={addToSavedList}/>}/>
			<Route path='/edit/:id' component={UpdateMovie}/>
		
			<SavedList list={savedList}/>
		</div>
	);
};

export default App;

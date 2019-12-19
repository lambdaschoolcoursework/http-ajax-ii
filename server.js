const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(CORS());

let movies = [
	{
		id: 0,
		title: "The Godfather",
		director: "Francis Ford Coppola",
		metascore: 100,
		stars: ["Marlon Brando", "Al Pacino", "Robert Duvall"],
		poster: 'http://www.gstatic.com/tv/thumb/v22vodart/6326/p6326_v_v8_aj.jpg'
	},
	{
		id: 1,
		title: "Star Wars",
		director: "George Lucas",
		metascore: 92,
		stars: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
		poster: 'http://www.gstatic.com/tv/thumb/v22vodart/4407/p4407_v_v8_be.jpg'
	},
	{
		id: 2,
		title: "The Lord of the Rings: The Fellowship of the Ring",
		director: "Peter Jackson",
		metascore: 92,
		stars: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
		poster: 'http://www.gstatic.com/tv/thumb/v22vodart/28828/p28828_v_v8_bg.jpg'
	},
	{
		id: 3,
		title: "Terminator 2: Judgement Day",
		director: "James Cameron",
		metascore: 94,
		stars: ["Arnold Schwarzenegger", "Edward Furlong", "Linda Hamilton"],
		poster: 'http://www.gstatic.com/tv/thumb/v22vodart/13308/p13308_v_v8_al.jpg'
	},
	{
		id: 4,
		title: "Dumb and Dumber",
		director: "The Farely Brothers",
		metascore: 76,
		stars: ["Jim Carrey", "Jeff Daniels", "Lauren Holly"],
		poster: 'http://www.gstatic.com/tv/thumb/v22vodart/16298/p16298_v_v8_aa.jpg'
	},
	{
		id: 5,
		title: "Tombstone",
		director: "George P. Cosmatos",
		metascore: 89,
		stars: ["Kurt Russell", "Bill Paxton", "Sam Elliot"],
		poster: 'http://www.gstatic.com/tv/thumb/v22vodart/15292/p15292_v_v8_ap.jpg'
	},
	{
		id: 6,
		title: "Entourage: The Movie",
		director: "Doug Ellin",
		metascore: 100,
		stars: ["Adrian Grenier", "Jeremy Piven", "Kevin Connolly", "Turtle", "Drama"],
		poster: 'http://www.gstatic.com/tv/thumb/v22vodart/11352105/p11352105_v_v8_ac.jpg'
	}
];

let movieId = movies.length;

app.get("/api/movies", (req, res) => {
  	res.send(movies);
});

app.get("/api/movies/:id", (req, res) => {
	const movie = movies.filter(movie => `${movie.id}` === req.params.id)[0];
	res.status(200).json(movie);
});

app.post("/api/movies", (req, res) => {
	if (req.body.title !== undefined) {
		const newMovie = req.body;
		newMovie["id"] = movieId;
		movies.push(newMovie);
	}
	++movieId;
	res.status(201).json(movies);
});

app.put("/api/movies/:id", (req, res) => {
	if (!req.params.id) {
		res.status(400).send("Your request is missing the movie id");
	};
	if (
		req.body.id === undefined ||
		!req.body.title ||
		!req.body.director ||
		!req.body.metascore ||
		!req.body.stars ||
		!req.body.poster
	) {
		res
		.status(422)
		.send("Make sure your request body has all the fields it needs");
	};
	movies = movies.map(movie => {
		if (`${movie.id}` === req.params.id) {
			return req.body;
		}
		return movie;
	});
	res.status(200).send(req.body);
});

app.delete("/api/movies/:id", (req, res) => {
	if (!req.params.id)
		res.status(400).send("Your request is missing the movie id");
	movies = movies.filter(movie => `${movie.id}` !== req.params.id);
	res.status(202).send(req.params.id);
});

app.get("/", function(req, res) {
  	res.send("App is working 👍");
});

app.listen(5000, () => {
  	console.log("Server listening on port 5000");
});

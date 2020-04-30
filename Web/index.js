//use path module
const path = require("path");
//use express module
const express = require("express");
//use hbs view engine
const hbs = require("hbs");
//use bodyParser middleware
const bodyParser = require("body-parser");
//use mysql database
const mysql = require("mysql");
//create express app
const app = express();
//create router
const router = express.Router();

//register partials
hbs.registerPartials(__dirname + "/views/partials");

const database = mysql.createConnection({
  host: "24.125.109.20",
  user: "gsu",
  password: "gsu2020",
  database: "gsu_moviedb",
  charset: "utf8"
});

//connect to database
database.connect(err => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

//set views file
app.set("views", path.join(__dirname, "views"));
//set view engine
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use("/assets", express.static(__dirname + "/public"));

app.use("/", router);

let moviesQuery =
  'SELECT A.movieRating, A.movieTitle, A.genreType, B.personFirstName, B.personLastName, A.movieReleaseDate FROM (Select movie.movieRating, movie.movieTitle, genre.genreType, movie.movieReleaseDate From movie Inner Join movie_genre On movie_genre.m_movieID = movie.movieID Inner Join genre On movie_genre.g_genreID = genre.genreID Order By movie.movieRating Desc) AS A JOIN (Select movie.movieRating, movie.movieTitle, person.personLastName, person.personFirstName, role.roleDesc From movie Inner Join role On role.m_movieID = movie.movieID Inner Join person On role.p_personID = person.personID Where role.roleDesc Like ("director") Order By movie.movieRating Desc) AS B ON A.movieTitle=B.movieTitle;';
let genresQuery =
  "Select distinct genre.genreType From genre Inner Join movie_genre On movie_genre.g_genreID = genre.genreID Inner Join movie On movie_genre.m_movieID = movie.movieID Order By movie.movieRating Desc;";
let actorsQuery =
  'Select person.personFirstName, person.personLastName, role.roleDesc, movie.movieRating, person.personNationality From person Inner Join role On role.p_personID = person.personID Inner Join movie On role.m_movieID = movie.movieID Where role.roleDesc Like ("%actor%") Order By movie.movieRating Desc Limit 10;';
let randomQuery =
  'SELECT A.movieRating, A.movieTitle, A.genreType, B.personFirstName, B.personLastName, A.movieReleaseDate FROM (Select movie.movieRating, movie.movieTitle, genre.genreType, movie.movieReleaseDate From movie Inner Join movie_genre On movie_genre.m_movieID = movie.movieID Inner Join genre On movie_genre.g_genreID = genre.genreID Order By movie.movieRating Desc) AS A JOIN (Select movie.movieRating, movie.movieTitle, person.personLastName, person.personFirstName, role.roleDesc From movie Inner Join role On role.m_movieID = movie.movieID Inner Join person On role.p_personID = person.personID Where role.roleDesc Like ("director") Order By movie.movieRating Desc) AS B ON A.movieTitle=B.movieTitle;';
//route for homepage
router.get("/", (req, res) => {
  // top 10 movies
  moviesQuery =
    'SELECT A.movieRating, A.movieTitle, A.genreType, B.personFirstName, B.personLastName, A.movieReleaseDate FROM (Select movie.movieRating, movie.movieTitle, genre.genreType, movie.movieReleaseDate From movie Inner Join movie_genre On movie_genre.m_movieID = movie.movieID Inner Join genre On movie_genre.g_genreID = genre.genreID) AS A JOIN (Select movie.movieRating, movie.movieTitle, person.personLastName, person.personFirstName, role.roleDesc From movie Inner Join role On role.m_movieID = movie.movieID Inner Join person On role.p_personID = person.personID  Where role.roleDesc Like ("director")) AS B ON A.movieTitle=B.movieTitle Order By movieRating desc Limit 0, 10;';
  database.query(moviesQuery, (err, moviesTable) => {
    if (err) throw err;

    // top 10 actors
    let actorsQuery =
      'Select person.personFirstName, person.personLastName, role.roleDesc, movie.movieRating, person.personNationality From person Inner Join role On role.p_personID = person.personID Inner Join movie On role.m_movieID = movie.movieID Where role.roleDesc Like ("%actor%") Order By movie.movieRating Desc Limit 10;';
    database.query(actorsQuery, (err, actorsTable) => {
      if (err) throw err;

      // top 10 genres
      let genresQuery =
        "Select distinct genre.genreType From genre Inner Join movie_genre On movie_genre.g_genreID = genre.genreID Inner Join movie On movie_genre.m_movieID = movie.movieID Order By movie.movieRating Desc;";
      database.query(genresQuery, (err, genresTable) => {
        if (err) throw err;

        //random
        let randomQuery =
          'SELECT A.movieRating, A.movieTitle, A.genreType, B.personFirstName, B.personLastName, A.movieReleaseDate FROM (Select movie.movieRating, movie.movieTitle, genre.genreType, movie.movieReleaseDate From movie Inner Join movie_genre On movie_genre.m_movieID = movie.movieID Inner Join genre On movie_genre.g_genreID = genre.genreID Order By movie.movieRating Desc) AS A JOIN (Select movie.movieRating, movie.movieTitle, person.personLastName, person.personFirstName, role.roleDesc From movie Inner Join role On role.m_movieID = movie.movieID Inner Join person On role.p_personID = person.personID Where role.roleDesc Like ("director") Order By movie.movieRating Desc) AS B ON A.movieTitle=B.movieTitle;';
        database.query(randomQuery, (err, randomTable) => {
          if (err) throw err;
          res.render("home", {
            moviesTable: moviesTable,
            actorsTable: actorsTable,
            genresTable: genresTable,
            randomTable: randomTable
          });
        });
      });
    });
  });
});

//
// ABOUT
//

//route for about page
router.get("/about", (req, res) => {
  res.render("about");
});

//
// END ABOUT
//

//
// RANDOM MOVIE
//

//route for random
router.get("/random", (req, res) => {
  database.query(randomQuery, (err, randomTable) => {
    if (err) throw err;
    res.render("random", {
      randomTable: randomTable
    });
  });
});

//post for a random movie selection
router.post("/randomMovie", (req, res) => {
  randomQuery =
    'SELECT A.movieRating, A.movieTitle, A.genreType, B.personFirstName, B.personLastName, A.movieReleaseDate FROM (Select movie.movieRating, movie.movieTitle, genre.genreType, movie.movieReleaseDate From movie Inner Join movie_genre On movie_genre.m_movieID = movie.movieID Inner Join genre On movie_genre.g_genreID = genre.genreID Order By movie.movieRating Desc) AS A JOIN (Select movie.movieRating, movie.movieTitle, person.personLastName, person.personFirstName, role.roleDesc From movie Inner Join role On role.m_movieID = movie.movieID Inner Join person On role.p_personID = person.personID Where role.roleDesc Like ("director") Order By movie.movieRating Desc) AS B ON A.movieTitle=B.movieTitle ORDER BY RAND() LIMIT 5;';
  res.redirect("random#randomTable");
});

//post for defualt all movies
router.post("/allMovies2", (req, res) => {
  randomQuery =
    'SELECT A.movieRating, A.movieTitle, A.genreType, B.personFirstName, B.personLastName, A.movieReleaseDate FROM (Select movie.movieRating, movie.movieTitle, genre.genreType, movie.movieReleaseDate From movie Inner Join movie_genre On movie_genre.m_movieID = movie.movieID Inner Join genre On movie_genre.g_genreID = genre.genreID Order By movie.movieRating Desc) AS A JOIN (Select movie.movieRating, movie.movieTitle, person.personLastName, person.personFirstName, role.roleDesc From movie Inner Join role On role.m_movieID = movie.movieID Inner Join person On role.p_personID = person.personID Where role.roleDesc Like ("director") Order By movie.movieRating Desc) AS B ON A.movieTitle=B.movieTitle;';
  res.redirect("random#randomTable");
});

//
// END RANDOM MOVIE
//

//
// MOVIES
//

//route for movies page
router.get("/movies", (req, res) => {
  database.query(moviesQuery, (err, moviesTable) => {
    if (err) throw err;
    res.render("movies", {
      moviesTable: moviesTable
    });
  });
});

//post for movie search
router.post("/searchMovie", (req, res) => {
  let input = req.body.movieInput;

  moviesQuery =
    'SELECT A.movieRating, A.movieTitle, A.genreType, B.personFirstName, B.personLastName, A.movieReleaseDate FROM (Select movie.movieRating, movie.movieTitle, genre.genreType, movie.movieReleaseDate From movie Inner Join movie_genre On movie_genre.m_movieID = movie.movieID Inner Join genre On movie_genre.g_genreID = genre.genreID Order By movie.movieRating Desc) AS A JOIN (Select movie.movieRating, movie.movieTitle, person.personLastName, person.personFirstName, role.roleDesc From movie Inner Join role On role.m_movieID = movie.movieID Inner Join person On role.p_personID = person.personID Where role.roleDesc Like ("director") Order By movie.movieRating Desc) AS B ON A.movieTitle=B.movieTitle WHERE A.movieTitle LIKE ("%' +
    input +
    '%");';
  res.redirect("movies#moviesTable");
});

//post for all movies
router.post("/allMovies", (req, res) => {
  moviesQuery =
    'SELECT A.movieRating, A.movieTitle, A.genreType, B.personFirstName, B.personLastName, A.movieReleaseDate FROM (Select movie.movieRating, movie.movieTitle, genre.genreType, movie.movieReleaseDate From movie Inner Join movie_genre On movie_genre.m_movieID = movie.movieID Inner Join genre On movie_genre.g_genreID = genre.genreID Order By movie.movieRating Desc) AS A JOIN (Select movie.movieRating, movie.movieTitle, person.personLastName, person.personFirstName, role.roleDesc From movie Inner Join role On role.m_movieID = movie.movieID Inner Join person On role.p_personID = person.personID Where role.roleDesc Like ("director") Order By movie.movieRating Desc) AS B ON A.movieTitle=B.movieTitle;';
  res.redirect("movies#moviesTable");
});

//
// END MOVIES
//

//
// GENRES
//

//route for genres page
router.get("/genres", (req, res) => {
  database.query(genresQuery, (err, genresTable) => {
    if (err) throw err;
    res.render("genres", {
      genresTable: genresTable
    });
  });
});

//post for genre search
router.post("/searchGenre", (req, res) => {
  let input = req.body.genreInput;

  genresQuery =
    'Select distinct genre.genreType From genre Inner Join movie_genre On movie_genre.g_genreID = genre.genreID Inner Join movie On movie_genre.m_movieID = movie.movieID WHERE genre.genreType LIKE ("%' +
    input +
    '%") Order By movie.movieRating Desc;';
  res.redirect("genres#genresTable");
});

//post for all genres
router.post("/allGenres", (req, res) => {
  genresQuery =
    "Select distinct genre.genreType From genre Inner Join movie_genre On movie_genre.g_genreID = genre.genreID Inner Join movie On movie_genre.m_movieID = movie.movieID Order By movie.movieRating Desc;";
  res.redirect("genres#genresTable");
});

//
// END GENRES
//

//
// ACTORS
//

//route for actors page
router.get("/actors", (req, res) => {
  database.query(actorsQuery, (err, actorsTable) => {
    if (err) throw err;
    res.render("actors", {
      actorsTable: actorsTable
    });
  });
});

//post for actor search
router.post("/searchActors", (req, res) => {
  let input = req.body.actorInput;

  actorsQuery =
    'Select person.personFirstName, person.personLastName, role.roleDesc, movie.movieRating, person.personNationality From person Inner Join role On role.p_personID = person.personID Inner Join movie On role.m_movieID = movie.movieID Where role.roleDesc Like ("%actor%") AND (person.personFirstName LIKE ("%' +
    input +
    '%") OR person.personLastName LIKE ("%' +
    input +
    '%")) Order By movie.movieRating Desc Limit 10;';
  res.redirect("actors#actorsTable");
});

//post for all actors
router.post("/allActors", (req, res) => {
  actorsQuery =
    'Select person.personFirstName, person.personLastName, role.roleDesc, movie.movieRating, person.personNationality From person Inner Join role On role.p_personID = person.personID Inner Join movie On role.m_movieID = movie.movieID Where role.roleDesc Like ("%actor%") Order By movie.movieRating Desc Limit 10;';
  res.redirect("actors#actorsTable");
});

//
// END GENRES
//

//server listening
app.listen(8000, () => {
  console.log("Server is running at port 8000");
});

// list counter
(function() {
  var counter = 1;
  hbs.registerHelper("counter", function() {
    return counter++;
  });
  hbs.registerHelper("resetCounter", function() {
    counter = 1;
  });
})();

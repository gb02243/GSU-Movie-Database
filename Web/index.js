//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
//create express app
const app = express();
//create router
const router = express.Router();

//register partials
hbs.registerPartials(__dirname + '/views/partials');

const database = mysql.createConnection({
  host: '24.125.109.20',
  user: 'gsu',
  password: 'gsu2020',
  database: 'gsu_moviedb',
  charset: 'utf8'
});

//connect to database
database.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));

app.use('/', router);

//route for homepage
router.get('/',(req,res) => {
  let moviesQuery = 'SELECT A.movieRating, A.movieTitle, A.genreType, B.personFirstName, B.personLastName, A.movieReleaseDate FROM (Select movie.movieRating, movie.movieTitle, genre.genreType, movie.movieReleaseDate From movie Inner Join movie_genre On movie_genre.m_movieID = movie.movieID Inner Join genre On movie_genre.g_genreID = genre.genreID Order By movie.movieRating Desc) AS A JOIN (Select movie.movieRating, movie.movieTitle, person.personLastName, person.personFirstName, role.roleDesc From movie Inner Join role On role.m_movieID = movie.movieID Inner Join person On role.p_personID = person.personID Where role.roleDesc Like ("director") Order By movie.movieRating Desc) AS B ON A.movieTitle=B.movieTitle;';
  let rowIndex = 1;
  database.query(moviesQuery,(err, rows, cols) => {
    if(err) throw err;
    res.render('home', {moviesTable:rows})
    console.log(rows);
  });
});

//route for aboutpage
router.get('/about',(req,res) => {
  res.render('about');
});

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});

// index counter
(function() {
    // Start at 1, name this unique to anything in this closure
    var counter = 1;

    hbs.registerHelper('position', function() {
        return counter++;
    });

    // Compile/render your template here
    // It will use the helper whenever it seems position
})();

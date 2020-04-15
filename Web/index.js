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
  let moviesQuery = 'SELECT movie.movieRating, movie.movieTitle, genre.genreType, person.personFirstName, person.personLastName, CAST(movie.movieReleaseDate AS DATE), role.roleDesc FROM movie INNER JOIN movie_genre ON movie_genre.m_movieID = movie.movieID INNER JOIN genre ON movie_genre.g_genreID = genre.genreID INNER JOIN role ON role.m_movieID = movie.movieID INNER JOIN person ON role.p_personID = person.personID WHERE role.roleDesc LIKE "director" ORDER BY movie.movieRating Desc;';
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

--
-- GENRE QUERIES
--

  -- ALL DRAMA MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Drama%";

  -- ALL CRIME MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Crime%";

  -- ALL ACTION MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Action%";

  -- ALL COMIC BOOK MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Comic Book%";

  -- ALL SCI-FI MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Sci-Fi%";

  -- ALL MYSTERY MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Mystery%";

  -- ALL ADVENTURE MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Adventure%";

  -- ALL COMEDY MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Comedy%";

--
-- MOVIE QUERIES
--

  -- SELECT ALL MOVIES
  SELECT * FROM movie;

--
-- TOP 10 QUERIES
--

  -- TOP 10 MOVIES WITH GENRE AND DIRECTOR
SELECT A.movieRating, A.movieTitle, A.genreType, B.personFirstName, B.personLastName, A.movieReleaseDate FROM (Select movie.movieRating, movie.movieTitle, genre.genreType, movie.movieReleaseDate From movie Inner Join movie_genre On movie_genre.m_movieID = movie.movieID Inner Join genre On movie_genre.g_genreID = genre.genreID) AS A JOIN (Select movie.movieRating, movie.movieTitle, person.personLastName, person.personFirstName, role.roleDesc From movie Inner Join role On role.m_movieID = movie.movieID Inner Join person On role.p_personID = person.personID  Where role.roleDesc Like ("director")) AS B ON A.movieTitle=B.movieTitle Order By movieRating desc Limit 0, 10;
                          
  -- TOP 10 ACTORS
  Select person.personFirstName, person.personLastName, role.roleDesc, movie.movieRating, person.personNationality From person Inner Join role On role.p_personID = person.personID Inner Join movie On role.m_movieID = movie.movieID Where role.roleDesc Like ("%actor%") Order By movie.movieRating Desc Limit 10

  -- TOP 10 GENRES
  Select distinct genre.genreType From genre Inner Join movie_genre On movie_genre.g_genreID = genre.genreID Inner Join movie On movie_genre.m_movieID = movie.movieID Order By movie.movieRating Desc

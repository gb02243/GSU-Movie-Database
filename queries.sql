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

  -- TOP 10 MOVIES
  SELECT movie.movieRating, movie.movieTitle, genre.genreType, person.personFirstName, person.personLastName, movie.movieReleaseDate, role.roleDesc FROM movie INNER JOIN movie_genre ON movie_genre.m_movieID = movie.movieID INNER JOIN genre ON movie_genre.g_genreID = genre.genreID INNER JOIN role ON role.m_movieID = movie.movieID INNER JOIN person ON role.p_personID = person.personID WHERE role.roleDesc LIKE "director" ORDER BY movie.movieRating Desc

  -- TOP 10 ACTORS
  SELECT person.personFirstName, person.personLastName, role.roleDesc FROM person INNER JOIN role ON role.p_personID = person.personID INNER JOIN movie ON role.m_movieID = movie.movieID WHERE role.roleDesc LIKE ("%actor%") ORDER BY movie.movieRating DESC LIMIT 10

  -- TOP 10 GENRES
  SELECT DISTINCT genre.genreType FROM genre INNER JOIN movie_genre ON movie_genre.g_genreID = genre.genreID INNER JOIN movie ON movie_genre.m_movieID = movie.movieID ORDER BY movie.movieRating Desc

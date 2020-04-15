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
  SELECT m.movieTitle, g.genreType, p.personFirstName, p.personLastName, m.movieReleaseDate
   FROM movie m, movie_genre mg, genre g, role r, person p 
   WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND ;

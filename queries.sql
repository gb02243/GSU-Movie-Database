--
-- GENRE QUERIES
--

  -- SELECT ALL DRAMA MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Drama%";

  -- SELECT ALL CRIME MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Crime%";

  -- SELECT ALL ACTION MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Action%";

  -- SELECT ALL COMIC BOOK MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Comic Book%";

  -- SELECT ALL SCI-FI MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Sci-Fi%";

  -- SELECT ALL MYSTERY MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Mystery%";

  -- SELECT ALL ADVENTURE MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Adventure%";

  -- SELECT ALL COMEDY MOVIES
  SELECT m.movieTitle FROM movie m, movie_genre mg, genre g WHERE m.movieID = mg.m_movieID AND mg.g_genreID = g.genreID AND g.genreType LIKE "%Comedy%";

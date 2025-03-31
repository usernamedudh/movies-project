import React from "react";
import Movie from "./Movie";

const Movies = ({ movies = [] }) => {
  return (
    <div className="movies">
      {movies.length ? (
        movies.map((item) => (
          <Movie movie={item} key={item.imdbID} />
        ))
      ) : (
        <h4></h4>
      )}
    </div>
  );
};

export default Movies;

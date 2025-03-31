import React from "react";
import Movies from "../components/Movies";
import Search from "../components/Search";
import * as Api from "../util/Api.js";
import Preloader from "../components/Preloader";
import MovieDetailModal from "../components/MovieDetailModal";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      loading: true,
      error: null,
      activeTab: "all",
      selectedMovie: null,
      dailyRecommendations: [], // рекомендации дня
    };
  }

  getRandomRecommendations = (data, count) => {
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  fetchData = (type = "all") => {
    this.setState({ loading: true });

    let fetchPromise;
    if (type === "all") {
      fetchPromise = Api.getAllMoviesAndSeries().then((data) => {
        const recommendations = this.getRandomRecommendations(data.Search || [], 3);
        this.setState({ movies: data.Search, loading: false, dailyRecommendations: recommendations });
      });
    } else {
      fetchPromise = Api.getSearch("friends", type).then((data) => {
        const recommendations = this.getRandomRecommendations(data.Search || [], 3);
        this.setState({ movies: data.Search, loading: false, dailyRecommendations: recommendations });
      });
    }

    fetchPromise
      .then(() => this.setState({ loading: false }))
      .catch((error) => {
        this.setState({ error: "Failed to fetch data", loading: false });
        console.error("Error fetching data:", error);
      });
  };

  componentDidMount() {
    this.fetchData("all");
  }

  searchMovies = (keyWords, type) => {
    Api.getSearch(keyWords, type)
      .then((data) => {
        const recommendations = this.getRandomRecommendations(data.Search || [], 3);
        this.setState({ movies: data.Search, loading: false, dailyRecommendations: recommendations });
      })
      .catch((error) => {
        this.setState({ error: "Failed to search", loading: false });
        console.error("Error searching movies:", error);
      });
  };

  toggleTab = (tab) => {
    this.setState({ activeTab: tab });
    this.fetchData(tab);
  };

  selectMovie = (movie) => {
    Api.getMovieDetails(movie.imdbID)
      .then((data) => {
        this.setState({ selectedMovie: data });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  };

  closeModal = () => {
    this.setState({ selectedMovie: null });
  };

  render() {
    const { movies, loading, error, activeTab, selectedMovie, dailyRecommendations } = this.state;

    return (
      <main className="container content">
        <Search searchMovies={this.searchMovies} />

        {/* --- РЕКОМЕНДАЦИИ ДНЯ --- */}
        <div className="recommendations-wrapper">
          <h2> Recommendations of the Day</h2>
          <div className="recommendations-list">
            {dailyRecommendations.map((movie) => (
              <div key={movie.imdbID} className="recommendation-card" onClick={() => this.selectMovie(movie)}>
                <div
                  className="recommendation-poster"
                  style={{ backgroundImage: `url(${movie.Poster})` }}
                ></div>
                <p>{movie.Title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Табы */}
        <div className="tab-buttons-wrapper">
          <div className="tab-buttons">
            <button
              onClick={() => this.toggleTab("all")}
              className={activeTab === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => this.toggleTab("movie")}
              className={activeTab === "movie" ? "active" : ""}
            >
              Movies
            </button>
            <button
              onClick={() => this.toggleTab("series")}
              className={activeTab === "series" ? "active" : ""}
            >
              Series
            </button>
          </div>
        </div>

        {/* Ошибка */}
        {error && <div className="error">{error}</div>}

        {/* Контент */}
        {!loading ? (
          <>
            <Movies movies={movies} onSelect={this.selectMovie} />
            {selectedMovie && (
              <MovieDetailModal movie={selectedMovie} onClose={this.closeModal} />
            )}
          </>
        ) : (
          <Preloader />
        )}
      </main>
    );
  }
}

export default Main;

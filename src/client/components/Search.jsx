import React from "react";

class Search extends React.Component {
  state = {
    search: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.props.searchMovies(this.state.search);
    }
  };

  handleClick = () => {
    this.props.searchMovies(this.state.search);
  };

  render() {
    const { search } = this.state;
    return (
      <div className="row" style={{ textAlign: "center", marginTop: "20px" }}>
        <div
          className="input-field"
          style={{
            position: "relative",
            maxWidth: "500px",
            margin: "0 auto",
            display: "flex", // Используем flexbox для корректного расположения элементов
            alignItems: "center", // Центрируем по вертикали
          }}
        >
          <input
            placeholder="Search for movies or series..."
            type="search"
            name="search"
            className="validate"
            value={search}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            autoComplete="off"
            style={{
              fontSize: "18px",
              padding: "14px",
              border: "2px solid #1e88e5",
              borderRadius: "100px",
              width: "100%",
              outline: "none",
            }}
          />
          <button
            className="btn search-btn"
            onClick={this.handleClick}
            style={{
              position: "absolute",
              right: "30px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "#1e88e5",
              color: "white",
              padding: "2px 20px", // Увеличена высота и ширина
              fontSize: "12px",
              fontWeight: "bold",
              textAlign: "center",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              minWidth: "100px", // Минимальная ширина кнопки для лучшего выравнивания
            }}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default Search;

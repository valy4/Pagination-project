import React, { useState, useEffect } from "react";

function MainContent() {
  const [listFilm, setListFilm] = useState([]);
  useEffect(() => {
    fetch(
      `http://www.omdbapi.com/?s=pride+and+prejudice&page=2&apikey=20b3b01a`
    )
      .then((response) => response.json())
      .then((data) => {
        setListFilm(data.Search);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <h1 className="subtitle">Movie Catalog</h1>
      <div className="box">
        <div className="row" style={{ backgroundColor: "#f52878" }}>
          <h4 className="col left">Title</h4>
          <h4 className="col right">Year</h4>
        </div>
        {listFilm.map(function (film) {
          return (
            <div className="row" style={{ backgroundColor: "#fee9f1" }}>
              <p className="col left" >{film.Title}</p>

              <p className="col right">{film.Year}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainContent;

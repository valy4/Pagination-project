import React, { useState, useEffect } from "react";
// import styled from "styled-components"

function MainContent() {
  const [listFilm, setListFilm] = useState([]);
  const [nrPages, setNrPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    fetch(
      `http://www.omdbapi.com/?s=pride+and+prejudice&page=${currentPage}&apikey=20b3b01a`
    )
      .then((response) => response.json())
      .then((data) => {
        setListFilm(data.Search);
        const temp = Math.ceil(data.totalResults / 10)
        setNrPages(temp)
        console.log(data);
      });
  }, [currentPage]);
  const pagesList = []
  for (let i = 1; i <= nrPages; i++) {
    pagesList.push(i)
  }

  return (
    <div>
      <h1 className="subtitle">Pride and Prejudice</h1>
      <div className="box">
        <div className="row" style={{ backgroundColor: "#f52878" }}>
          <h4 className="col left">Title</h4>
          <h4 className="col right">Release Year</h4>
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
      <div className="buttons">

        <button className="btn" style={{ backgroundColor: "#fee9f1", cursor: "pointer" }} onClick={(event) => setCurrentPage(1)}>First</button>
        <button style={{ backgroundColor: "#fee9f1", cursor: "pointer" }} onClick={(event) => setCurrentPage(Math.abs(currentPage - 1))}>prev</button>
        <div className="mapBtn">
          {pagesList.map(page => {
            return <button style={{ backgroundColor: page === currentPage ? "#f52878" : "#fee9f1", fontSize: "2rem", cursor: "pointer" }} onClick={(event) => setCurrentPage(page)}>{page}</button>

          })}
        </div>
        <button style={{ backgroundColor: "#fee9f1", cursor: "pointer", hover: "#f52878" }} onClick={(event) => setCurrentPage(Math.abs(currentPage + 1))} disabled={currentPage === nrPages}>next</button>
        <button style={{ backgroundColor: "#fee9f1", cursor: "pointer" }} onClick={(event) => setCurrentPage(nrPages)} disabled={currentPage === nrPages}>Last</button>
      </div>
    </div >
  );
}

export default MainContent;



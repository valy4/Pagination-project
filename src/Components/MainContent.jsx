import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "../Images/picture-sorry.png";

function MainContent() {
  const [search, setSearch] = useState("pride and prejudice");
  const [listFilm, setListFilm] = useState([]);
  const [nrPages, setNrPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?s=${search}&page=${currentPage}&apikey=20b3b01a`
    )
      .then((response) => response.json())
      .then((data) => {
        setListFilm(data.Search);
        const temp = Math.ceil(data.totalResults / 10);
        setNrPages(temp);
        console.log(data);
      });
  }, [currentPage]);
  const pagesList = [];
  for (let i = 1; i <= nrPages; i++) {
    pagesList.push(i);
  }
  function getMovies(event) {
    fetch(
      `https://www.omdbapi.com/?s=${search}&page=${currentPage}&apikey=20b3b01a`
    )
      .then((response) => response.json())

      .then((data) => {
        setListFilm(data.Search);
        const temp = Math.ceil(data.totalResults / 10);
        setNrPages(temp);
        // console.log(data);
        const pagesList = [];
        for (let i = 1; i <= nrPages; i++) {
          pagesList.push(i);
        }
      });
  }

  return (
    <div>
      <div className="search-section">
        <Field
          onChange={(event) => setSearch(event.target.value)}
          type="text "
          data-cy="movie-search"
          placeholder="Search movie..."
        />
        <BtnSearch data-cy="btn-search" onClick={getMovies}>Search</BtnSearch>
      </div>

      <div className="box">
        {!listFilm && <Sorry>Sorry no movie found!</Sorry>}

        {listFilm?.map(function (film) {
          return (
            <div className="row" style={{ backgroundColor: "#003566" }}>
              {film.Poster !== "N/A" && (
                <img
                  className="col left poster"
                  src={film.Poster}
                  alt={film.Title}
                ></img>
              )}
              {film.Poster === "N/A" && (
                <img
                  className="col left poster"
                  src={Image}
                  alt={film.Title}
                ></img>
              )}
              <div className="col right">
                <p>{film.Title}</p>
                <p>{film.Year}</p>
              </div>
            </div>
          );
        })}
      </div>
      {listFilm && (
        <div className="buttons">
          <BtnEnd
            className="btn"
            data-cy="btn-first"
            onClick={(event) => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </BtnEnd>
          <BtnEnd

            onClick={(event) => setCurrentPage(Math.abs(currentPage - 1))}
            disabled={currentPage === 1}
          >
            prev
          </BtnEnd>
          <div className="mapBtn">
            {pagesList.map((page) => {
              return (
                <Btn
                  style={{
                    backgroundColor:
                      page === currentPage ? "#ffc300" : "#ffd60aac",
                    borderColor:
                      page === currentPage ? "#ffc300" : "#ffd60aac",
                    fontSize: "2rem",
                    cursor: "pointer",
                  }}
                  data-cy={`btn-page-${page}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Btn>
              );
            })}
          </div>
          <BtnEnd

            onClick={(event) => setCurrentPage(Math.abs(currentPage + 1))}
            disabled={currentPage === nrPages}
          >
            next
          </BtnEnd>
          <BtnEnd
            data-cy="btn-last"
            onClick={(event) => setCurrentPage(nrPages)}
            disabled={currentPage === nrPages}
          >
            Last
          </BtnEnd>
        </div>
      )
      }
    </div >
  );
}

export default MainContent;

const Btn = styled.button`
  background-color: #ffc300;
  border-color: #ffc300;
  cursor: pointer;
  margin-left: 2px;
  margin-right: 2px;
  border-style: solid;
`;

const Field = styled.input`
  font-size: 1.0rem;
  border-radius: 10px;
  width: 30rem;
  height: 2rem;
  border: none;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;

`;

const BtnSearch = styled.button`
  font-size: 1rem;
  text-transform: uppercase;
  background-color: #ffc300;
  border: solid 1px #ffc300;
  cursor: pointer;
  color: white;
  font-weight: 700;
  border-radius: 10px;
  width: 8rem;
  height: 2.5rem;
  &:hover {
    background: #ffd60a;
  }
`;

const Sorry = styled.div`
  font-size: 3rem;
  color: #ffd60a;
`;
const BtnEnd = styled.button`
  background-color: #ffc300;
  cursor: pointer;
  &:hover {
    background: #ffd60a;
  }
`;

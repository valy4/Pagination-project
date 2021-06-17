import React, { useState, useEffect } from "react";
import styled from "styled-components";

function MainContent() {
  const [search, setSearch] = useState("pride and prejudice");
  const [listFilm, setListFilm] = useState([]);
  const [nrPages, setNrPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://www.omdbapi.com/?s=${search}&page=${currentPage}&plot=full&apikey=20b3b01a`
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
  function getMovies(event) {
    fetch(
      `https://www.omdbapi.com/?s=${search}&page=${currentPage}&plot=full&apikey=20b3b01a`
    )
      .then((response) => response.json())

      .then((data) => {
        setListFilm(data.Search);
        const temp = Math.ceil(data.totalResults / 10);
        setNrPages(temp);
        console.log(data);
        const pagesList = [];
        for (let i = 1; i <= nrPages; i++) {
          pagesList.push(i);
        }

      });

  }

  return (
    <div>
      <div>
        <Field
          onChange={(event) => setSearch(event.target.value)}
          type="text "
          placeholder="Search movie..."
        />
        <BtnSearch onClick={getMovies} >Search</BtnSearch>
      </div>

      <div className="box">

        {listFilm?.map(function (film) {
          return (
            <div className="row" style={{ backgroundColor: "#003566" }}>
              <img className="col left" src={film.Poster}></img>
              <div className="col right">
                <p >{film.Title}</p>
                <p >{film.Year}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button
          className="btn"
          style={{ backgroundColor: "#ffd60a", cursor: "pointer" }}
          onClick={(event) => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          style={{ backgroundColor: "#ffd60a", cursor: "pointer" }}
          onClick={(event) => setCurrentPage(Math.abs(currentPage - 1))}
          disabled={currentPage === 1}
        >
          prev
        </button>
        <div className="mapBtn">
          {pagesList.map((page) => {
            return (
              <button
                style={{
                  backgroundColor: page === currentPage ? "#ffc300" : "#ffd60a",
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
                onClick={() => setCurrentPage(page)}

              >
                {page}
              </button>
            );
          })}
        </div>
        <Btn
          style={{ backgroundColor: "#ffd60a", cursor: "pointer" }}
          onClick={(event) => setCurrentPage(Math.abs(currentPage + 1))}
          disabled={currentPage === nrPages}
        >
          next
        </Btn>
        <button
          style={{ backgroundColor: "#ffd60a", cursor: "pointer" }}
          onClick={(event) => setCurrentPage(nrPages)}
          disabled={currentPage === nrPages}
        >
          Last
        </button>
      </div>
    </div >
  );
}

export default MainContent;


const Btn = styled.button`
      background-color: #ffc300;
      cursor: pointer;
      `;
const Field = styled.input`
      font-size: 1.5rem;
      border-radius: 2rem;
      width: 30rem;
      height: 2rem;
      border: none;



      `;
const BtnSearch = styled.button`
      font-size: 1.5rem;
      background-color: #ffc300;
      cursor: pointer;
      border-radius: 2rem;
      width: 8rem;
      height: 2.5rem;


      `;
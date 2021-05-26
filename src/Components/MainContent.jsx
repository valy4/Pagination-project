import React, { useState, useEffect } from "react"


function MainContent() {
  const [listFilm, setListFilm] = useState([])
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?s=pride+and+prejudice&page=2&apikey=20b3b01a`)
      .then((response) => response.json())
      .then((data) => {
        setListFilm(data.Search)
        console.log(data)
      })

  }, [])

  return (
    <div>
      <h1>Movie Catalog</h1>
      <div>
        {listFilm.map(function (film) {
          return (<div><p>{film.Title}</p>
            <p>{film.Year}</p>
          </div>)

        })}
      </div>
    </div>
  )
}

export default MainContent
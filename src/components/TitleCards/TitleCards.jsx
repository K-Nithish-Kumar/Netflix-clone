import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'



const TitleCards = ({ title, category }) => {

  const[apiData,setApiData] = useState([]);
  const cardsRef = useRef();



  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjA2YzE5NTdmOGNlYmI2NjUzMDgzOGI3NjU4NmZjZCIsIm5iZiI6MTc2NTYzODcyNi44MzksInN1YiI6IjY5M2Q4MjQ2ZTk4YjQ1MDY1MDk5ZTlkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.76TWSr_uYfIKYx-Dwn_0R3M6MNGaW3Sct9AE1BGLXAM'
    }
  };



  const handleWheel = (event) => {
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));


    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className='titlecards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
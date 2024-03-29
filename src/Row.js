import React,{ useState,useEffect } from "react";
import axios from './axios';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";



const base_url=" https://image.tmdb.org/t/p/original";
const Row = ({title,fetchUrl,isLargeNow}) => {
    const [movies,setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            console.log(request.data);
            setMovies(request.data.results);
            return request;
        }
    fetchData();
    },[fetchUrl]);


   
    const opts = {
        height : "398",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1, 
        }
    };
    const handleClick = (movie) => {
         if (trailerUrl) {
            setTrailerUrl('');
         }
         else{
            movieTrailer(movie?.name || "")
            .then( (url) => {
                console.log(url);
                //https://www.youtube.com/watch?v=XtMThy8QKq&banan=5
              const urlParams =new URLSearchParams(new URL(url).search);
              console.log(urlParams.get("v"));
              setTrailerUrl(urlParams.get("v")); 
         })
         .catch((error) => console.log(error));
    }
};

 return (
    <div className="row">
        <h2>{title}</h2>
       <div className="row__posters">
            
            {movies.map((movie) =>(
               <img
                key={movie.id} 
                onClick={() => handleClick(movie)}
                className={`rimg_poster ${isLargeNow && "rimg_posterLarge"}`}
                src={`${base_url}${isLargeNow?movie.poster_path:movie.backdrop_path}`} 
                alt={movie.name} 
                />
            ))}
        </div> 
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
    </div>
 )
}

export default Row;

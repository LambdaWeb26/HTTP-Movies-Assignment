import React, {useState, useEffect} from 'react'
import { useRouteMatch, useHistory } from 'react-router-dom'
import axios from 'axios'

export default function UpdateMovies({movies, updateMovie}) {
    const [updated, setUpdated]= useState({
        title:"",
        director:""
    })
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const movieToUpdate = movies.find(movie => {
            return `${movie.id}` === match.params.id;
        })
        
        if(movieToUpdate){
            setUpdated(movieToUpdate);
        }

    }, [movies, match.params.id])

    const handleChange = (e) => {
        setUpdated({...updated, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${match.params.id}`, updated)
        .then(res=> {
           
           setTimeout(() => {history.push(`/movies/${match.params.id}`)}, 1000) 
        })
        .catch(err => {
            console.log(err)
        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">title</label>
                <input 
                name="title"
                type="text"
                placeholder="title"
                value={updated.title}
                onChange={handleChange}
                />

                <label htmlFor="director">director</label>
                <input 
                name="director"
                type="text"
                placeholder="director"
                value={updated.director}
                onChange={handleChange}
                />    
                <button>submit</button>
            </form>
        </div>
    )
}

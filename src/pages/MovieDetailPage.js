import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const MovieDetailPage = () => {
    const { id } = useParams()
    const [movieDetail, setMovieDetail] = useState({})

    const fetchMovieDetail = async () => {
        const resp = await fetch(`${BACKEND_URL}movie/${id}?api_key=${API_KEY}`)
        const json = await resp.json()
        console.log({ json })
        setMovieDetail(json)
    }

    useEffect(() => {
        fetchMovieDetail('')
        // eslint-disable-next-line
    }, [id])


    return (
        <div>
            <h1>{movieDetail.title}</h1>
        </div>
    )
}

export default MovieDetailPage

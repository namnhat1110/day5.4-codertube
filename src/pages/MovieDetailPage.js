import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Jumbotron, Button, Image } from 'react-bootstrap'

const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const MovieDetailPage = () => {
    const { id } = useParams()
    const [movieDetail, setMovieDetail] = useState({})


    useEffect(() => {
        const fetchMovieDetail = async () => {
            const resp = await fetch(`${BACKEND_URL}movie/${id}?api_key=${API_KEY}`)
            const json = await resp.json()
            console.log({ json })
            setMovieDetail(json)
        }

        fetchMovieDetail()

    }, [id])


    return (
        <Container>
            <Jumbotron className='bg-white'>
                <h1>{movieDetail.title}</h1>
                <hr className='solid'></hr>
                <Image src={"https://image.tmdb.org/t/p/w500/" + movieDetail.poster_path} />
                <hr className='solid'></hr>
                <p>Genres: {movieDetail.genres?.map(g => {
                    console.log({ g })
                    return (
                        <Button className='ml-2'>{g.name}</Button>
                    )
                })}
                </p>


                <p>{movieDetail.overview}</p>
                <Button variant="primary">More</Button>
            </Jumbotron>

        </Container>
    )
}

export default MovieDetailPage

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Jumbotron, Button, Image } from 'react-bootstrap'
import NavigationBar from "../components/NavigationBar"


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
        <div>
            <NavigationBar />
            <Container>
                <Jumbotron className='bg-white'>
                    <h1>{movieDetail.title}</h1>
                    <hr className='solid'></hr>
                    <Image src={"https://image.tmdb.org/t/p/w500/" + movieDetail.poster_path} />
                    <h4>{movieDetail.tagline}</h4>
                    <hr className='solid'></hr>
                    <p>Genres: {movieDetail.genres?.map(g => {
                        return (
                            <Button className='ml-2'>{g.name}</Button>
                        )
                    })}
                    </p>
                    <p>
                        {movieDetail.production_companies?.map(p => {
                            return (
                                <Image className='mx-3' style={{ width: '90px', height: 'auto' }} src={`https://image.tmdb.org/t/p/w500/${p.logo_path}`} />
                            )
                        })}
                    </p>

                    <strong><p>{movieDetail.overview}</p></strong>
                    <p>Runtime: {movieDetail.runtime} minutes</p>
                    <a href={movieDetail.homepage}>HomePage</a>
                </Jumbotron>

            </Container>
        </div>

    )
}

export default MovieDetailPage

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ModalBox from "../components/ModalBox"



const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const HomePage = () => {
    const [movies, setMovies] = useState([])
    // const [genre, setGenre] = useState([])

    const fetchMovies = async () => {
        const resp = await fetch(`${BACKEND_URL}movie/upcoming?api_key=${API_KEY}`)
        const json = await resp.json()
        console.log({ json })
        setMovies(json.results)
    }

    // const fetchGenre = async () => {
    //     const resp = await fetch(`${BACKEND_URL}genre/movie/list?api_key=${API_KEY}`)
    //     const data = await resp.json()
    //     console.log({ data })
    //     setGenre(data.genres)
    // }

    useEffect(() => {
        fetchMovies()
        // fetchGenre()
    }, [])

    return (
        <div>
            <h1> HomePage </h1>
            <Container>
                <Row>
                    {movies.map(m => {
                        return (
                            <Col>
                                <Card className='m-3' style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={"https://image.tmdb.org/t/p/w500/" + m.backdrop_path} />
                                    <Card.Body>
                                        <Card.Title>{m.title}</Card.Title>
                                        {/* <Card.Title>
                                            {genre.map(g => {
                                                return (
                                                    g.name
                                                )
                                            })}
                                        </Card.Title> */}
                                        <hr className="solid"></hr>
                                        <Card.Text style={{ height: 200, overflow: 'hidden', overflowY: 'auto' }}>
                                            {m.overview}
                                        </Card.Text>
                                        <ModalBox />
                                        <hr className="solid"></hr>
                                        <Card.Text>Rating: {m.vote_average} from {m.vote_count} votes</Card.Text>
                                        <Card.Text>Popularity: {m.popularity}</Card.Text>
                                        <Card.Text> Release date: {m.release_date}</Card.Text>
                                        <hr className="solid"></hr>
                                        <Nav.Link as={Link} to={`movie/${m.id}`}>
                                            View Detail
                                        </Nav.Link>

                                    </Card.Body>
                                </Card>

                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div >

    )
}

export default HomePage
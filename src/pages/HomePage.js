import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const HomePage = () => {
    const [movies, setMovies] = useState([])

    const fetchMovies = async () => {
        const resp = await fetch(`${BACKEND_URL}movie/upcoming?api_key=${API_KEY}`)
        const json = await resp.json()
        console.log({ json })
        setMovies(json.results)
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    return (
        <div>
            <h1> HomePage </h1>
            <Container>
                <Row>
                    {movies.map(m => {
                        return (
                            <Col>
                                <Link as={Link} to={`movies/${m.id}`}>
                                    <Card className='m-3' style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={"https://image.tmdb.org/t/p/w500/" + m.backdrop_path} />
                                        <Card.Body>
                                            <Card.Title>{m.title}</Card.Title>
                                            <Card.Text style={{ height: 200, overflow: 'hidden', overflowY: 'auto' }}>
                                                {m.overview}
                                            </Card.Text>
                                            <Button variant="primary">Go somewhere</Button>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div >

    )
}

export default HomePage
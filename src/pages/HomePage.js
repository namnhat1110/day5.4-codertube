import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Nav,
  Button,
  Container,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import ModalBox from "../components/ModalBox";
import SideBar from "../components/SideBar";
import NavigationBar from "../components/NavigationBar";

const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(``);
  const [genre, setGenre] = useState([]);
  const [movieTrailerKey, setMovieTrailerKey] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMovies = async () => {
    let urlParams = `${BACKEND_URL}movie/upcoming?api_key=${API_KEY}`;

    if (query !== ``) {
      urlParams = `${BACKEND_URL}search/movie?api_key=${API_KEY}&query=${query}`;
    }
    const resp = await fetch(urlParams);
    const json = await resp.json();
    console.log({ json });
    setMovies(json.results);
  };

  const fetchGenre = async () => {
    const resp = await fetch(
      `${BACKEND_URL}genre/movie/list?api_key=${API_KEY}`
    );
    const data = await resp.json();
    console.log({ data });
    setGenre(data.genres);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    fetchGenre();
  }, []);

  const onFetchYoutubeVideoID = async (id) => {
    console.log("hi", id);
    const resp = await fetch(
      `${BACKEND_URL}movie/${id}/videos?api_key=${API_KEY}`
    );
    const json = await resp.json();
    console.log(json);
    if (json.results.length > 0) {
      setMovieTrailerKey(json.results[0].key);
      setModalOpen(!modalOpen);
    }
  };
  return (
    <div>
      <NavigationBar query={query} setQuery={setQuery} />
      <Row>
        <Col lg="3">
          <SideBar />
          <Card.Title className="mt-5">
            {genre.map((g) => {
              return <Button className="m-2">{g.name}</Button>;
            })}
          </Card.Title>
        </Col>
        <Col lg="9">
          <button
            onClick={() =>
              setMovies(movies.sort((a, b) => a.popularity - b.popularity))
            }
            className="mx-2"
          >
            Most popular to Least popular
          </button>
          <button
            onClick={() =>
              setMovies(movies.sort((a, b) => b.popularity - a.popularity))
            }
            className="mx-2"
          >
            Least popular to Most popular
          </button>
          <Row>
            <ModalBox
              movieTrailerKey={movieTrailerKey}
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
            />
            {movies.map((m) => {
              return (
                <Col>
                  <Card className="m-3" style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={"https://image.tmdb.org/t/p/w500/" + m.backdrop_path}
                    />
                    <Card.Body>
                      <Card.Title>{m.title}</Card.Title>

                      <hr className="solid"></hr>
                      <Card.Text
                        style={{
                          height: 200,
                          overflow: "hidden",
                          overflowY: "auto",
                        }}
                      >
                        {m.overview}
                      </Card.Text>

                      <hr className="solid"></hr>
                      <Card.Text>
                        Rating: {m.vote_average} from {m.vote_count} votes
                      </Card.Text>
                      <Card.Text>Popularity: {m.popularity}</Card.Text>
                      <Card.Text> Release date: {m.release_date}</Card.Text>
                      <hr className="solid"></hr>
                      <Button onClick={() => onFetchYoutubeVideoID(m.id)}>
                        Trailer
                      </Button>
                      <Nav.Link as={Link} to={`movie/${m.id}`}>
                        View Detail
                      </Nav.Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <div>
        <footer>
          <Container>
            <Row>
              <Col>
                <Navbar.Brand as={Link} to="/">
                  Logo
                </Navbar.Brand>
              </Col>
              <Col sm>
                <h4>THE BASICS</h4>
              </Col>
              <Col sm>
                <h4>GET INVOLVED</h4>
              </Col>
              <Col sm>
                <h4>COMMUNITY</h4>
              </Col>
              <Col sm>
                <h4>LEGAL</h4>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap'


const NavigationBar = ({ query, setQuery }) => {
    const onChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">CoderIMDB</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Movie..." value={query}
                            onChange={onChange} className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavigationBar
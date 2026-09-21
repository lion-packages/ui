import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to={"/"} href="#">Lion-UI</Navbar.Brand>

                <Navbar.Toggle aria-controls="lion-ui-navbar-nav" />

                <Navbar.Collapse id="lion-ui-navbar-nav">
                    <Nav className="ms-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link> */}

                        <NavDropdown title="Buttons" id="buttons-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/buttons/custom"} href={"#"}>
                                Custom
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item as={Link} to={"/buttons/android"} href={"#"}>
                                Android
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/buttons/ios"} href={"#"}>
                                IOS
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/buttons/web"} href={"#"}>
                                Web
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

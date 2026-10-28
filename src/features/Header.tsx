import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to={"/"} href={"#"}>
                    Lion-UI
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="lion-ui-navbar-nav" />

                <Navbar.Collapse id="lion-ui-navbar-nav">
                    <Nav className="ms-auto">
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

                        <NavDropdown title="Inputs" id="inputs-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/inputs/custom"} href={"#"}>
                                Custom
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item as={Link} to={"/inputs/android"} href={"#"}>
                                Android
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/inputs/ios"} href={"#"}>
                                IOS
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/inputs/web"} href={"#"}>
                                Web
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Selects" id="selects-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/selects/custom"} href={"#"}>
                                Custom
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item as={Link} to={"/selects/android"} href={"#"}>
                                Android
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/selects/ios"} href={"#"}>
                                IOS
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/selects/web"} href={"#"}>
                                Web
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Modals" id="modals-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/modals/android"} href={"#"}>
                                Android
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/modals/ios"} href={"#"}>
                                IOS
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/modals/web"} href={"#"}>
                                Web
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Loadings" id="loadings-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/loadings/app"} href={"#"}>
                                App
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/loadings/bar"} href={"#"}>
                                Bar
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link as={Link} to={"tables"} href="#">
                            Tables
                        </Nav.Link>

                        <Nav.Link as={Link} to={"titles"} href="#">
                            Titles
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

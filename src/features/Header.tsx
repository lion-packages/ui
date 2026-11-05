import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { PlatformTypes } from "../types/PlatformTypes.tsx";

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
                        <Nav.Link as={Link} to={"/"} href="#">
                            Get Started
                        </Nav.Link>

                        <NavDropdown title="Buttons" id="buttons-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/buttons/android"} href={"#"}>
                                {PlatformTypes.ANDROID}
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/buttons/ios"} href={"#"}>
                                {PlatformTypes.IOS}
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/buttons/web"} href={"#"}>
                                {PlatformTypes.WEB}
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Inputs" id="inputs-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/inputs/android"} href={"#"}>
                                {PlatformTypes.ANDROID}
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/inputs/ios"} href={"#"}>
                                {PlatformTypes.IOS}
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/inputs/web"} href={"#"}>
                                {PlatformTypes.WEB}
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Textarea" id="textarea-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/textarea/android"} href={"#"}>
                                {PlatformTypes.ANDROID}
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/textarea/ios"} href={"#"}>
                                {PlatformTypes.IOS}
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/textarea/web"} href={"#"}>
                                {PlatformTypes.WEB}
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Selects" id="selects-nav-dropdown">
                            <NavDropdown.Item as={Link} to={"/selects/android"} href={"#"}>
                                {PlatformTypes.ANDROID}
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/selects/ios"} href={"#"}>
                                {PlatformTypes.IOS}
                            </NavDropdown.Item>

                            <NavDropdown.Item as={Link} to={"/selects/web"} href={"#"}>
                                {PlatformTypes.WEB}
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

                        <Nav.Link as={Link} to={"modals"} href="#">
                            Modals
                        </Nav.Link>

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

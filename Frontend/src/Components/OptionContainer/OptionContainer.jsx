import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const OptionContainer = () => {
  return (
    <div>
      <Container fluid>
        <Navbar className="navbar-dark bg-dark d-block">
          <div className=" sm:px-20 px-7">
            <Nav className="gap-16" style={{ overflowX: "auto" }}>
              <Nav.Item>
                <NavLink className="nav-link" to="/favorites">
                  Favorite
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/news">
                  News
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/cricket">
                  Cricket
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/entertainment">
                  Entertainment
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink className="nav-link" to="/games">
                  Games
                </NavLink>
              </Nav.Item>
            </Nav>
          </div>
        </Navbar>
      </Container>
    </div>
  );
};

export default OptionContainer;

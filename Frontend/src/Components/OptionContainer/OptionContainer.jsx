import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { LocalSearch } from "../../index";

const OptionContainer = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const optionContainerHeight =
        document.querySelector(".optionContainer").clientHeight;

      if (window.scrollY > optionContainerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className={`${isSticky ? " posFixedAtTop" : "posNormal"}`}>
      <Container fluid>
        <Navbar className="navbar-dark bg-dark d-block optionContainer">
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
              <LocalSearch
              />
            </Nav>
          </div>
        </Navbar>
      </Container>
    </div>
  );
};

export default OptionContainer;

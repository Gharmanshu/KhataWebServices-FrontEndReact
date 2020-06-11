import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";

class AppNav extends Component {
  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">KHATA - Redrive Tool</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/addEvent">
              <Button color="primary">Add Event</Button>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/updateEvent">
              <Button color="danger">Redrive Event</Button>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default AppNav;

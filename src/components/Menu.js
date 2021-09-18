import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar style={{ background: "#ededed" }} light expand="md">
        <NavbarBrand href="/"><img src="/logo.png" height={100} width={100}></img></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/dashboard">Dashboard</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Publicar
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/upload-image">Streetwear</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/upload-ensaio">Ensaios</NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Sair
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Menu;




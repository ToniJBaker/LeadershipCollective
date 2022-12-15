import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout, getCurrentUser } from '../../Managers/UserProfileManager';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export const Header = ({isLoggedIn, setIsLoggedIn}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    
    let localUser
    localStorage.getItem("userProfile") ?
     localUser = getCurrentUser()
    :
     localUser = {userTypeId: 0}

    

return(

<Navbar color="light" light expand="md" >
        <NavbarBrand tag={RRNavLink} to="/">Leadership Collective</NavbarBrand>
        <NavbarToggler onClick={toggle} />
    <Collapse isOpen={isOpen} navbar>

        <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
            <div style={{display: 'flex'}}>
              <NavItem>
                <NavLink tag={RRNavLink} to="/">Home</NavLink>
              </NavItem>
              
              {localUser.userTypeId === 1 
                ? 
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/users">Manage Users</NavLink>
                    </NavItem>
                    
                  
                : ""
              }   
              {localUser.userTypeId === 1 
                ? 
                    <NavItem>
                      <NavLink tag={RRNavLink} to="/events">Events</NavLink>
                    </NavItem>
                 
                : ""
              }     
              <NavItem>
                <NavLink tag={RRNavLink} to="/aboutApplication">About</NavLink>
              </NavItem>          
            </div>
            }
        </Nav>
        <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={() => {
                      logout()
                      setIsLoggedIn(false)
                    }}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
    </Collapse>
</Navbar> 
    )

}
import React, { useState, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout, getCurrentUser } from '../../Managers/UserProfileManager';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,CardLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Header = ({isLoggedIn, setIsLoggedIn}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [time, setTime] = useState(null)
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const nameToggle = () => setDropdownOpen((prevState) => !prevState);
    
    
    let localUser
    localStorage.getItem("userProfile") ?
     localUser = getCurrentUser()
    :
     localUser = {userTypeId: 0}

      //useEffect to observe current time state
    useEffect (
      ()=>{
          let time = getCurrentTime()
          setTime(time)
      },[])
  
  //function to get current time-military time
  const getCurrentTime = ()=>{
      let today = new Date()
      let hours = (today.getHours() < 10? "0" :"") + today.getHours()
      let minutes = (today.getMinutes()< 10? "0" :"") + today.getMinutes()
      let seconds = (today.getSeconds()< 10? "0" :"") + today.getSeconds()
      return hours + ":" + minutes +":" + seconds
    }

return(

<Navbar color="light" light expand="md" >
        <NavbarBrand  tag={RRNavLink} to="/">Leadership Collective</NavbarBrand>
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
      <>
      <Nav>
          <div className="homeLink">
            <Dropdown isOpen={dropdownOpen} toggle={nameToggle} >
              <DropdownToggle caret>Welcome {localUser.fullName}</DropdownToggle>
              <DropdownMenu >
                <Link to="/editProfile" header>Edit Profile</Link>
              </DropdownMenu>
            </Dropdown>
          </div>
          
          <div style={{marginLeft:'50px'}}>
            {new Date().toUTCString().slice(0,16)}
          </div>
      </Nav>
      </>
</Navbar> 
    )

}
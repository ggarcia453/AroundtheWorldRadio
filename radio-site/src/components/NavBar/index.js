import React, {useState} from "react";
import {
    NavbarContainer, NavLink, NavLinks, MenuIcon
} from "./navbarElements";

function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
           <NavbarContainer>
            <MenuIcon onClick={() => setIsOpen(!isOpen)}>
                <div>☰</div>
            </MenuIcon>
            <NavLinks isOpen={isOpen}>
                <NavLink to="/AroundtheWorldRadio/">Home</NavLink>
                <NavLink to="/AroundtheWorldRadio/about">About</NavLink>
                <NavLink to="/AroundtheWorldRadio/stats">Statistics</NavLink>
                <NavLink to="/AroundtheWorldRadio/archive">Archive</NavLink>
                <NavLink to="/AroundtheWorldRadio/manual">Manual</NavLink>
            </NavLinks>
        </NavbarContainer>
        </>
    )
}

export default Navbar;
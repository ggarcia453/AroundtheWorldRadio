import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbarElements";

function Navbar(){
    return(
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/AroundtheWorldRadio/">
                        Home
                    </NavLink>
                    <NavLink to ="/AroundtheWorldRadio/about">
                        AboutUs
                    </NavLink>
                    <NavLink to="/AroundtheWorldRadio/stats">
                        Statistics
                    </NavLink>
                    <NavLink to="/AroundtheWorldRadio/archive">
                        Archive
                    </NavLink>
                </NavMenu>
                </Nav>
        </>
    )
}

export default Navbar;
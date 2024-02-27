import { NavLink as Link } from "react-router-dom";
import styled from "styled-components"

export const NavbarContainer = styled.nav`
    background-color: white;
  color: black;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const NavLinks = styled.div`
a {
    color: black;
    text-decoration: none;
    margin-right: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
  }
`;

export const NavLink = styled(Link)`
  // ...existing styles
  @media (max-width: 768px) {
    padding: 10px;
    border-bottom: 1px solid white;
  }
`;

export const MenuIcon = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;
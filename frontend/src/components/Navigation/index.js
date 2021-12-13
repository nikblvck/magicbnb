import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import DemoUser from "./DemoUser";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks =
    <ProfileButton user={sessionUser} />
  ;
  } else {
    sessionLinks = (
      <>
        <DemoUser />
        <NavLink className="rNavLinks" to="/login">Log In</NavLink>
        <NavLink className="rNavLinks" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="navContainer">
      <div className="navLeft">
        <ul>
          <li>
            <NavLink exact to="/spots">
              HOME
            </NavLink>
          </li>
          <li>
            <a href="https://www.github.com/nikblvck/magicbnb">ABOUT</a>
          </li>
        </ul>
      </div>
      <div className="navRight">
        <ul>
          <li>{sessionLinks}</li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;

import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
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
            <NavLink exact to="/">
              Home
            </NavLink>
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

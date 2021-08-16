import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }


  return (
    <nav className="nav-bar">
      <h1 className="logo">Beer Me</h1>
      <NavLink className="home-button" exact to="/">🏠</NavLink>
      <input></input>
      <div className="right-side-nav">
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;

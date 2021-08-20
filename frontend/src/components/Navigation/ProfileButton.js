import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';
import { Modal } from '../../context/Modal';
import CheckInForm from "../CheckinForm";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropDownElement = useRef(null)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (event) => {
      if (!(dropDownElement.current == event.target || dropDownElement.current.contains(event.target)))
        setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handler = (e) => {
    e.preventDefault()
    setShowModal(true)
    setShowMenu(false)
  }
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="profile-button-container">
      <button className="profile-button" onClick={openMenu}>
        <img className='profile-img' src="https://gravatar.com/avatar/3888915d5953f623c5f4d3fcdd21a83b?size=100&d=https%3A%2F%2Funtappd.akamaized.net%2Fsite%2Fassets%2Fimages%2Fdefault_avatar_v3_gravatar.jpg%3Fv%3D2" alt="profile-dropdown-button"></img>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CheckInForm user={user} />
        </Modal>
      )}
      {showMenu && (
        <ul className="profile-dropdown" ref={dropDownElement}>
          <li><NavLink to={`/users/${user.id}`}>My Tap Room</NavLink></li>
          <li><button onClick={(e) => handler(e)}>Check-In</button></li>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )
      }
    </div >
  );
}

export default ProfileButton;

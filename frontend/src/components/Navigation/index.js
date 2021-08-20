import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import { drinkList } from "../../store/drinks";
import { useDebounce } from "../../hooks/useDebounce";
import { storeList } from '../../store/store'
import { tagList } from '../../store/tags'
import './Navigation.css';

function Navigation({ isLoaded }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const drinks = useSelector(state => Object.values(state.drinks))
  const tags = useSelector(state => Object.values(state.tags))
  const stores = useSelector(state => Object.values(state.stores))
  const [search, setSearch] = useState('')
  const [selectedDrink, setSelectedDrink] = useState('')
  const [visibleDrinks, setVisibleDrinks] = useState([])
  const [drinkId, setDrinkId] = useState(1)
  const [visibleStores, setVisibleStores] = useState([])
  const [visibleTags, setVisibleTags] = useState([])
  const [disable, setDisable] = useState(true)
  const [showMenu, setShowMenu] = useState(false);
  const debouncedSearch = useDebounce(search, 250);

  useEffect(() => {
    dispatch(drinkList())
    dispatch(tagList())
    dispatch(storeList())
  }, dispatch)


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const searchDrinks = (drinkName) => {
    const lowerCaseDrinkName = drinkName.toLowerCase()
    const drinkArray = drinks.filter(el => {
      return el.name.toLowerCase().includes(lowerCaseDrinkName)
    })
    if (!drinkArray.length) drinkArray.push({
      id: 1,
      name: `Looks like we don't have this drink feel free to add it to the database`
    })
    console.log(drinks.length)
    setVisibleDrinks(drinkArray.slice(0, 8))
  }
  const searchStores = (storeName) => {
    const lowerCaseStoreName = storeName.toLowerCase()
    const storeArray = stores.filter(el => {
      return el.title.toLowerCase().includes(lowerCaseStoreName)
    })
    if (!storeArray.length) storeArray.push({
      id: 1,
      title: `Looks like we don't have this Location yet`
    })
    setVisibleStores(storeArray.slice(0, 8))
  }

  useEffect(() => {
    searchDrinks(search)
    searchStores(search)
  }, [debouncedSearch])

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
      </>
    );
  }


  return (
    <nav className="nav-bar">
      <h1 className="logo">THREE SHEETS</h1>
      <NavLink className="home-button" exact to="/">🏠</NavLink>
      <input
        className="drink-input-update"
        value={search}
        onChange={(e) => (setSearch(e.target.value), setDisable(false), openMenu())}
      ></input>
      {showMenu &&
        <ul hidden={disable} className="search-dropdown">
          <div className='drinks-dropdown'>
            <h4 hidden={disable} >Drinks: </h4>
            {visibleDrinks && selectedDrink !== search && visibleDrinks.map(el =>
              <li
                key={el.id}
              ><NavLink to={`/drinks/${el.id}`}><button
                value={el.name}
                onClick={() => (
                  setSelectedDrink(el.name),
                  setSearch(''),
                  setDrinkId(el.id)
                )}
              >
                {el.name}</button></NavLink>
              </li>)}
          </div>
          <div className="stores-dropdown">
            <h4 hidden={disable} >Breweries: </h4>
            {visibleStores && selectedDrink !== search && visibleStores.map(el =>
              <li
                key={el.id}
              ><NavLink to={`/stores/${el.id}`}><button
                value={el.title}
                onClick={() => (
                  setSelectedDrink(el.title),
                  setSearch(''),
                  setDrinkId(el.id)
                )}
              >
                {el.title}</button></NavLink>
              </li>)}
          </div>
        </ul>
      }
      <div className="right-side-nav">
        {isLoaded && sessionLinks}
      </div>
    </nav >
  );
}

export default Navigation;

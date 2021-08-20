import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { drinkList } from "../../store/drinks"
import { getHomepage } from "../../store/splash";
import { Modal } from "../../context/Modal";
import { storeList } from "../../store/store";
import BreweryPageModal from "./BreweryPageModal";
import './breweryPage.css'


const BreweryPage = () => {
  const { storeId } = useParams()
  const dispatch = useDispatch()
  const stores = useSelector(state => Object.values(state.stores))
  const drinks = useSelector(state => Object.values(state.drinks))
  const feed = useSelector(state => Object.values(state.feed).sort(state.feed.updatedAt).reverse().slice(0, 25))
  const storeComments = feed.filter(el => el.Drink.storeId === +storeId)
  const store = stores.filter(el => el.id === +storeId)
  const otherBeers = drinks.filter(el => el.storeId === +storeId)

  useEffect(() => {
    dispatch(drinkList())
    dispatch(getHomepage())
    dispatch(storeList())
  }, [dispatch])


  return (
    <div className='drink-feed-container' id='test' >


      {store?.map(el => (
        <div className='brewery-name' key={el.id}>
          <h1 >{el.name}</h1>
          <img src={el.imageUrl} alt={el.name}></img>
          <h4>{el.description}</h4>
          <h4>{el.title} in {el.location}</h4>
        </div>
      ))}

      <h2>Recent Check-Ins at {store[0]?.title}</h2>
      <div className='drink-checkin-feed'>
        {storeComments && storeComments.map(el => (
          <div>
            <BreweryPageModal el={el} />
          </div>
        ))}
      </div>

      <h2>Drinks by {store[0]?.title}</h2>
      <ul className='other-beers-list'>
        {otherBeers?.map(el => (
          <li key={el.id}>
            <img className='sip-image' src={el.imageUrl} alt={`Logo for ${el.name}`}></img>
            <NavLink to={`/drinks/${el.id}`}><h3>{el.name}</h3></NavLink>
            <p>{el.description}</p>
          </li>
        ))}
      </ul>
    </div >
  )
}
export default BreweryPage

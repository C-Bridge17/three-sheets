import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { drinkList } from "../../store/drinks"
import { getHomepage } from "../../store/splash";
import CheckInForm from "../CheckinForm";
import DrinkPageModal from "./DrinkPageModal";

const DrinkPage = () => {
  const { drinkId } = useParams()
  const dispatch = useDispatch()
  const [hidden, setHidden] = useState(true)
  const drinks = useSelector(state => Object.values(state.drinks))
  const feed = useSelector(state => Object.values(state.feed).sort(state.feed.updatedAt).reverse())
  const drink = drinks.filter(el => el.id === +drinkId)
  const drinkComments = feed.filter(el => el.drinkId === +drinkId)
  const otherDrinks = drinks.filter(el => el.storeId === drink[0].storeId && el.id !== drink[0].id)

  // if (!drinkComments.length) setHidden(false)

  useEffect(() => {
    dispatch(drinkList())
    dispatch(getHomepage())
  }, [dispatch])


  return (
    <div className='drink-feed-container' >

      {drink?.map(el => (
        <div key={el.id} className='current-drink-div'>
          <img src={el.imageUrl} alt={el.name}></img>
          <h2>{el.name}</h2>
          <h4>{el.description}</h4>
          <h4>by <NavLink to={`/stores/${el.Store.id}`}>{el.Store.title}</NavLink> in {el.Store.location}</h4>
        </div>
      ))}
      <h2>Recent Comments about {drink[0]?.name}</h2>
      <div className='drink-checkin-feed'>
        {drinkComments && drinkComments.map(el => (
          <div>
            <DrinkPageModal el={el} />
          </div>
        ))}
      </div>

      <h2>Other Drinks by <NavLink to={`/store/${drink[0]?.storeId}`}>{drink[0]?.Store.title}</NavLink></h2>
      <ul className='other-beers-list'>
        {otherDrinks?.map(el => (
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
export default DrinkPage

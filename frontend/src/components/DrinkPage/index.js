import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { drinkList } from "../../store/drinks"
import { getHomepage } from "../../store/splash";
import DrinkPageModal from "./DrinkPageModal";
import { Modal } from "../../context/Modal";
import UpdateDrinkForm from "../UpdateDrinkForm";

const DrinkPage = () => {
  const { drinkId } = useParams()
  const dispatch = useDispatch()
  const [hidden, setHidden] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const drinks = useSelector(state => Object.values(state.drinks))
  const feed = useSelector(state => Object.values(state.feed).sort(state.feed.updatedAt).reverse())
  const drink = drinks.filter(el => el.id === +drinkId)
  const drinkComments = feed.filter(el => el.drinkId === +drinkId)
  const otherDrinks = drinks.filter(el => el.storeId === drink[0].storeId && el.id !== drink[0].id)

  useEffect(() => {
    dispatch(drinkList())
    dispatch(getHomepage())
  }, [dispatch])


  return (
    <div className='drink-feed-container' >

      <div className='update-button-div'>
        <button type='button' onClick={() => setShowModal(true)}>Update drink</button>
      </div>
      {drink?.map(el => (
        <div key={el.id} className='current-drink-div'>
          <h2>{el.name}</h2>
          <img src={el.imageUrl} alt={el.name}></img>
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

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateDrinkForm setShowModal={setShowModal} drink={drink} drinks={drinks} />
        </Modal>
      )}

    </div >
  )
}
export default DrinkPage

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom'
import { getHomepage } from "../../store/splash";
import './checkin.css'

const Checkin = ({ isLoaded }) => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const feed = useSelector(state => Object.values(state.feed).sort(state.feed.id).reverse())
  let a = 'a'
  const aOrAn = (el) => {
    if (el[0].toLowerCase() === 'a' || el[0].toLowerCase() === 'e' || el[0].toLowerCase() === 'i' || el[0].toLowerCase() === 'u' || el[0].toLowerCase() === 'o') {
      a = 'an'
    } else {
      a = 'a'
    }

  }
  useEffect(() => {
    dispatch(getHomepage())
  }, [dispatch])

  return (
    <div className='checkin-feed-container'>
      {
        feed && feed.map((el) => (
          <div key={el.id} className="checkin-feed-div">
            {aOrAn(el.Drink.name)}
            <h3>
              <NavLink to={`/users/${el.User.id}`}>{el.User.username}</NavLink> {`is drinking ${a}`} <NavLink to={`/drinks/${el.Drink.id}`}>{el.Drink.name}</NavLink> by <NavLink to={`/stores/${el.Drink.Store.id}`}>{el.Drink.Store.title}</NavLink>
            </h3>
            <p>{`at ${el.Drink.Store.location}.`}</p>
            <p className='comment-container'>{`"${el.comment}"`}</p>
          </div>
        ))
      }
    </div >
  )
}

export default Checkin

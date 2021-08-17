import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom'
import { getHomepage } from "../../store/splash";
import './checkin.css'

const Checkin = () => {
  const dispatch = useDispatch()

  const feed = useSelector(state => Object.values(state.feed))
  let a = 'a'
  const vowels = 'aeiou'
  const aOrAn = (el) => {
    console.log(el[0])
    if (el[0].toLowerCase() === 'a' || el[0].toLowerCase() === 'e' || el[0].toLowerCase() === 'i' || el[0].toLowerCase() === 'u' || el[0].toLowerCase() === 'o') {
      a = 'an'
    } else {
      a = 'a'
    }

  }


  useEffect(() => {
    dispatch(getHomepage())
  }, [dispatch])

  // {`${el.User.username} is drinking ${a} ${el.Drink.name} by ${el.Drink.Store.title}`}
  return (
    <container className='checkin-feed-container'>
      {feed && feed.map((el) => (
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
    </container >
  )
}

export default Checkin

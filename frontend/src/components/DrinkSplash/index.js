import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import './drinkSplash.css'

const DrinkSplash = ({ feed }) => {
  const arr = []
  const unique = (() => {
    feed.forEach((el) => {
      if (!arr.length) arr.push(el)
      arr.forEach((l) => {
        if (el.drinkId !== l.drinkId && arr.indexOf(l) === arr.length - 1) arr.push(el)
      })
    })

  })
  unique()

  return (
    <div>
      <h2 className='sips-home-title'>Recent Sips</h2>
      {arr.slice(0, 15).map(el => (
        <div className='recent-sip-div' key={el.id}>
          <img className='sip-image' src={el.Drink.imageUrl} alt={`Logo for ${el.Drink.name}`} height='50px' width="50px"></img>
          <NavLink to={`/drinks/${el.drinkId}`}><h3>{el.Drink.name}</h3></NavLink>
          <h5>Brewed By <NavLink to={`/stores/${el.Drink.Store.id}`}>{el.Drink.Store.title}</NavLink> in {el.Drink.Store.location}</h5>
        </div>
      ))}
    </div>
  )
}

export default DrinkSplash

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { drinkList } from "../../store/drinks";
import { useDebounce } from "../../hooks/useDebounce";
import { postCheckin } from "../../store/splash";

const CheckInForm = ({ user }) => {
  const dispatch = useDispatch()
  const [selectedDrink, setSelectedDrink] = useState('')
  const [drinkId, setDrinkId] = useState(1)
  const [userId, setUserId] = useState(user.id)
  const [comment, setComment] = useState('')
  const [search, setSearch] = useState('')
  const [visibleDrinks, setVisibleDrinks] = useState([])
  const debouncedSearch = useDebounce(search, 250)


  const drinks = useSelector(state => Object.values(state.drinks))

  useEffect(() => {
    dispatch(drinkList())
  }, [dispatch])

  const searchDrinks = (drinkName) => {
    const lowerCaseDrinkName = drinkName.toLowerCase()
    const drinkArray = drinks.filter(el => {
      return el.name.toLowerCase().includes(lowerCaseDrinkName)
    }).slice(0, 5)
    setVisibleDrinks(drinkArray)
  }


  useEffect(() => {
    searchDrinks(search)
  }, [debouncedSearch])



  const handleSubmit = (e) => {
    e.preventDefault()
    if (drinkId) {
      const payload = { drinkId, userId, comment }
      return dispatch(postCheckin(payload))
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Drink
          <input
            value={search}
            onChange={(e) => (setSearch(e.target.value))}
          >
          </input>
        </label>
        <textarea
          placeholder="Leave a review"
          maxLength='255'
          onChange={(e) => setComment(e.target.value)}
        >
        </textarea>
        <button type='submit'>Confirm</button>
      </form >
      <ul>
        {visibleDrinks && selectedDrink !== search && visibleDrinks.map(el =>
          <li
            key={el.id}
          ><button
            value={el.name}
            onClick={() => (
              setSelectedDrink(el.name),
              setSearch(el.name),
              setDrinkId(el.id)
            )}
          >
              {el.name}</button>
          </li>)}
      </ul>
    </div >
  )
}
export default CheckInForm

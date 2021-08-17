import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { drinkList } from "../../store/drinks";
import { useDebounce } from "../../hooks/useDebounce";

const CheckInForm = ({ user }) => {
  const dispatch = useDispatch()
  const [drinkID, setDrinkId] = useState(1)
  const [selectedDrink, setSelectedDrink] = useState('')
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



  const handleSubmit = () => {
    return null
  }

  return (
    <div>
      <form>
        <label>Drink
          <input
            value={search}
            onChange={(e) => (setSearch(e.target.value))}
          >
          </input>
        </label>
        <label>
          Comment
          <textarea>

          </textarea>
        </label>
        <button>Checkin</button>
      </form >
      <ul>
        {visibleDrinks && selectedDrink !== search && visibleDrinks.map(el =>
          <li
            key={el.id}
          ><button
            value={el.name}
            onClick={() => (
              setSelectedDrink(el.name),
              setSearch(el.name)
            )}
          >
              {el.name}</button>
          </li>)}
      </ul>
    </div >
  )
}
export default CheckInForm

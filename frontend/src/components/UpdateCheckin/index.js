import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drinkList } from "../../store/drinks";
import { useDebounce } from "../../hooks/useDebounce";
import { putCheckin } from "../../store/splash";


const UpdateCheckin = ({ checkinId, setShowModal }) => {
  const checkin = useSelector(state => state.feed[checkinId])
  const dispatch = useDispatch()
  const [selectedDrink, setSelectedDrink] = useState('')
  const [drinkId, setDrinkId] = useState(checkin.drinkId)
  const [userId, setUserId] = useState(checkin.userId)
  const [comment, setComment] = useState(checkin.comment)
  const [search, setSearch] = useState(checkin.Drink.name)
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
      const payload = { id: checkinId, drinkId, userId, comment }
      dispatch(putCheckin(payload))
      setShowModal(false)
      // window.location.reload()
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
          placeholder={checkin.comment}
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

export default UpdateCheckin

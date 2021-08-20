import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drinkList } from "../../store/drinks";
import { useDebounce } from "../../hooks/useDebounce";
import { putCheckin } from "../../store/splash";
import './checkinModal.css'


const UpdateCheckin = ({ checkinId, setShowModal }) => {
  const checkin = useSelector(state => state.feed[checkinId])
  const dispatch = useDispatch()
  const [disable, setDisable] = useState(false)
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
    })
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
    }
  }

  return (
    <div className='update-checkin-modal'>
      <div className='update-checkin-header'>
        <h2>Update Check-In</h2>
      </div>
      <div className='update-form-container'>
        <form onSubmit={handleSubmit} className='update-form'>
          <h3>Search drinks:</h3>
          <input
            className="drink-input-update"
            value={search}
            onChange={(e) => (setSearch(e.target.value), setDisable(true))}
          >
          </input>
          <h3>Select an avaible drink: </h3>
          <ul className='search-update-drinks'>
            {visibleDrinks && selectedDrink !== search && visibleDrinks.map(el =>
              <li
                key={el.id}
              ><button
                value={el.name}
                onClick={() => (
                  setDisable(false),
                  setSelectedDrink(el.name),
                  setSearch(el.name),
                  setDrinkId(el.id)
                )}
              >
                  {el.name}</button>
              </li>)}
          </ul>
          <h3>Comment:</h3>
          <textarea
            className="comment-textarea-update"
            placeholder='Tell us what you think'
            maxLength='255'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          >
          </textarea>

          <button type='submit' disabled={disable}>Confirm</button>
        </form >
      </div>

    </div >

  )
}

export default UpdateCheckin

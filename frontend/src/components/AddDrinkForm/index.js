import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { storeList } from '../../store/store'
import { postDrink } from "../../store/drinks"
import { tagList } from "../../store/tags"
import './addDrinkForm.css'



const AddDrinkForm = ({ setShowModal }) => {
  const [storeId, setStoreId] = useState(1)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState([])
  const [tagId, setTagId] = useState(1)
  const drinks = useSelector(state => Object.values(state.drinks))
  const stores = useSelector(state => Object.values(state.stores))
  const tags = useSelector(state => Object.values(state.tags))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(storeList())
    dispatch(tagList())
  }, [dispatch])


  const handleSubmit = (e) => {
    e.preventDefault()
    const errArr = []
    const found = drinks.find(el => el.name.toLowerCase() === name.toLowerCase() && el.storeId === storeId)
    if (found) {
      errArr.push(`${found.name} is already in our database`)
      return setErrors(errArr)
    } else {
      setErrors([])
      let payload = {
        storeId,
        name,
        imageUrl: "https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png",
        description,
        tagId
      }
      console.log(payload)
      setShowModal(false)
      dispatch(postDrink(payload))
    }
  }

  return (
    <div className="add-drink-container">
      {errors && errors.map(el => (
        <ul key={el}>
          <li>{el}</li>
        </ul>
      ))}
      <form onSubmit={handleSubmit}>
        <h4>Add Drink:<input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input> </h4>
        <h4>Select Brewery: </h4>
        <select
          className="drop-down"
          onChange={(e) => setStoreId(e.target.value)}
        >
          {stores.map(el => (
            <option
              value={el.id}
              key={el.id}
            >{el.title}</option>
          ))}
        </select>
        <h4>Select Beer Type: </h4>
        <select
          className="drop-down"
          onChange={(e) => setTagId(e.target.value)}
        >
          {tags.map(el => (
            <option
              value={el.id}
              key={el.id}
            >{el.type}</option>
          ))}
        </select>
        <textarea
          required
          className="comment-textarea-add"
          placeholder="Description"
          maxLength='255'
          onChange={(e) => setDescription(e.target.value)}
        >
        </textarea>
        {/* add a drop down for tags  and make the modul close */}
        <button type='submit'>Add Drink</button>
      </form>
    </div>
  )
}
export default AddDrinkForm

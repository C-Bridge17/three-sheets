import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { storeList } from '../../store/store'
import { putDrink } from "../../store/drinks"
import { tagList } from "../../store/tags"
import { NavLink } from "react-router-dom"



const UpdateDrinkForm = ({ setShowModal, drink, drinks }) => {
  const [drinkId, setDrinkId] = useState(drink[0].id)
  const [storeId, setStoreId] = useState(drink[0].storeId)
  const [name, setName] = useState(drink[0].name)
  const [description, setDescription] = useState(drink[0].description)
  const [tagId, setTagId] = useState(drink[0].tagId)
  const stores = useSelector(state => Object.values(state.stores))
  const tags = useSelector(state => Object.values(state.tags))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(storeList())
    dispatch(tagList())
  }, [dispatch])


  const handleSubmit = (e) => {
    e.preventDefault()
    let payload = {
      id: drinkId,
      storeId,
      name,
      imageUrl: "https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png",
      description,
      tagId
    }
    dispatch(putDrink(payload))
    setShowModal(false)


  }

  return (
    <div className="add-drink-container" >
      <form onSubmit={handleSubmit}>
        <h4>Update Drink: <NavLink to={`/drinks/${drink[0].id}`}>{`${drink[0].name}`}</NavLink> </h4>
        <h4>Select Brewery: </h4>
        <select
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        >
        </textarea>
        <button type='submit'>Update Drink</button>
      </form>
    </div>
  )
}
export default UpdateDrinkForm

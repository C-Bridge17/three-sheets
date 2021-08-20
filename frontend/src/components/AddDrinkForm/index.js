import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { storeList } from '../../store/store'
import { postDrink } from "../../store/drinks"



const AddDrinkForm = () => {
  const [storeId, setStoreId] = useState(1)
  const [name, setName] = useState('')
  const [errors, setErrors] = useState([])
  const drinks = useSelector(state => Object.values(state.drinks))
  const stores = useSelector(state => Object.values(state.stores))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(storeList())
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
        description: 'good drink',
        tagId: 4
      }
      dispatch(postDrink(payload))
    }
  }

  return (
    <div>
      {errors && errors.map(el => (
        <ul key={el}>
          <li>{el}</li>
        </ul>
      ))}
      <form onSubmit={handleSubmit}>
        <h4>Add Drink:<input
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input> </h4>
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
        <textarea>

        </textarea>
        {/* add a drop down for tags  and make the modul close */}
        <button type='submit'>Add Drink</button>
      </form>
    </div>
  )
}
export default AddDrinkForm

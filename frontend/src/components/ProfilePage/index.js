import { useParams } from "react-router"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getHomepage } from "../../store/splash";
import DrinkSplash from "../DrinkSplash";
import ProfileCheckin from "./ProfileCheckin";
const ProfilePage = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const feed = useSelector(state => Object.values(state.feed).sort(state.feed.updatedAt).reverse())
  const filtered = feed.filter(el => el.userId === +userId)



  useEffect(() => {
    dispatch(getHomepage())
  }, [dispatch,])

  return (
    <div className='page-container'>
      <div className='checkin-feed-container'>
        <h1>{filtered[0]?.User.username}'s Tap Room</h1>

        <h2>Recent check-ins</h2>

        {filtered.map(el => (
          <ProfileCheckin el={el} />
        ))}
      </div>
      <div className='drink-container-splash'>
        <DrinkSplash feed={filtered} />
      </div>

    </div>
  )
}


export default ProfilePage

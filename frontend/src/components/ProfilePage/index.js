import { useParams } from "react-router"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { getHomepage } from "../../store/splash";
import DrinkSplash from "../DrinkSplash";
import ProfileCheckin from "./ProfileCheckin";
import { useState } from "react";
import { getUser } from "../../store/user";
const ProfilePage = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const users = useSelector(state => state.user)
  const feed = useSelector(state => Object.values(state.feed).sort(state.feed.updatedAt).reverse())
  const filtered = feed.filter(el => el.userId === +userId)
  console.log(users)

  useEffect(() => {
    dispatch(getUser(+userId))
    dispatch(getHomepage())
  }, [dispatch,])

  return (
    <div className='page-container'>
      <div className='checkin-feed-container'>
        <h1>{users.username}'s Tap Room</h1>

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

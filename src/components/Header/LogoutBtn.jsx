import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='text-[1rem] md:text-xl inline-bock px-6 py-2 duration-200 rounded-full hover:bg-main-color hover:text-white text-text-color text-xl'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Nav } from '../assets/wrapper/NavBar'
import { useAppContext } from '../context/appContext'
import NavBar from './NavBar'


const token = localStorage.getItem('x-authorization')

const initalState = {
    firstName: '',
    middleName: '',
    lastName: '',
    userPhoto: '',
    user: '',
    dateOfBirth: '',
    age: '',
}

const UserProfile = () => {
    const navigate = useNavigate();
    const { showAlert, displayAlert, updateUser, isLoading } = useAppContext();
    const [values, setValues] = useState(initalState)

    useEffect(() => {
        if (!token) {
            setTimeout(() => {
                navigate('/register')
            }, 0)
        }
    }, [token, navigate])

    const {
        firstName,
        middleName,
        lastName,
        userPhoto,
        user,
        dateOfBirth
    } = values
    
    const currentUser = { firstName, middleName, lastName, userPhoto, user, dateOfBirth }

    // const profile = userProfile(currentUser)

    return (
        <main>
            <NavBar />
            <div className='container'>
                <div className='profile-details'>
                    <img src='https://www.freepnglogos.com/uploads/tom-and-jerry-png/tom-and-jerry-png-picture-web-icons-png-7.png' alt='user-photo' className='user-profile-pic' />
                    <h1 className='user-profile-name'>
                        Welcome<span id='h1-home'> Poojan Pradhan</span>
                        <br></br>
                        email: <span id='h1-email' style={{ textTransform: 'lowercase' }}>po0janhunt@gmail.com</span>
                    </h1>
                </div>
            </div>
        </main>
    )
}

export default UserProfile
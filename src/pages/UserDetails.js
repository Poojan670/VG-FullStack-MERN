import React, { useState, useEffect } from 'react'
import { Logo, UserDetailsForm, Alert } from '../components'
import Wrapper from '../assets/wrapper/Register'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom';

const initalState = {
    firstName: '',
    middleName: '',
    lastName: '',
    userPhoto: '',
    user: '',
    dateOfBirth: '',
    age: '',
}

const UserDetails = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState(initalState)
    const { isLoading, showAlert, userDetails } = useAppContext();
    const userData = localStorage.getItem('user')
    const data = JSON.parse(userData)

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handlePhoto = (e) => {
        setValues({ ...values, userPhoto: e.target.files[0] })
        console.log(values.userPhoto)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, middleName, lastName, userPhoto, dateOfBirth } = values
        const userDetailsData = { firstName, middleName, lastName, userPhoto, dateOfBirth }
        userDetails(userDetailsData)

        useEffect(() => {
            setTimeout(() => {
                navigate('/profile')
            }, 3000)
        }, [navigate])
    }

    // useEffect(() => {

    //     if (detailsCheck) {
    //         setTimeout(() => {
    //             navigate('/profile')
    //         }, 0)
    //     }
    // }, [detailsCheck, navigate])

    return (
        <Wrapper className='full-page'>
            <form className="form" action='/upload' onSubmit={handleSubmit} method="post" enctype="multipart/form-data">
                <Link to='/' style={{ display: "flex", justifyContent: "center" }}>
                    <Logo />
                    <h4 className='logo-title'>VG-APP</h4>
                </Link>

                <h3>User Details</h3>
                <h3 style={{ color: "#009AEE" }}>Welcome {data.name} &#128512;</h3>
                {showAlert && <Alert />}

                <UserDetailsForm
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    handleChange={handleChange} />

                <UserDetailsForm
                    type="text"
                    name="middleName"
                    value={values.middleName}
                    handleChange={handleChange} />

                <UserDetailsForm
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    handleChange={handleChange} />

                <UserDetailsForm
                    type="file"
                    name="userPhoto"
                    // value={values.userPhoto}
                    handleChange={handlePhoto} />

                <UserDetailsForm
                    type="date"
                    name="dateOfBirth"
                    value={values.dateOfBirth}
                    handleChange={handleChange} />


                <button type='submit' className='btn btn-block'
                    disabled={isLoading}>
                    Submit
                </button>

            </form>
        </Wrapper >
    )
}

export default UserDetails
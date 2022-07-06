import React, { useState, useEffect } from 'react'
import { Logo, RegisterForm, Alert } from '../components'
import Wrapper from '../assets/wrapper/Register'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom';

const initalState = {
    userName: '',
    email: '',
    password: '',
    isMember: false,
}

const token = localStorage.getItem('x-authorization')

const Register = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState('')
    const { isLoading, showAlert, registerUser, loginUser } = useAppContext();

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { userName, email, password, isMember } = values
        const currentUser = { userName, email, password }
        if (isMember) {
            console.log(currentUser)
            loginUser(currentUser);


        } else {
            registerUser(
                currentUser,
            )
        };
    }

    useEffect(() => {
        if (token) {
            setTimeout(() => {
                navigate('/profile')
            }, 0)
        }
    }, [token, navigate])

    return (
        <Wrapper className='full-page'>
            <form className="form" onSubmit={handleSubmit}>
                <Link to='/' style={{ display: "flex", justifyContent: "center" }}>
                    <Logo />
                    <h4 className='logo-title'>VG-APP</h4>
                </Link>

                <h3>{values.isMember ? 'Login' : 'Register'}</h3>
                {showAlert && <Alert />}

                {/* UserName */}
                {!values.isMember && (
                    < RegisterForm
                        type="text"
                        name="userName"
                        value={values.userName}
                        handleChange={handleChange} />
                )}

                {/* Email */}
                <RegisterForm
                    type="email"
                    name="email"
                    value={values.email}
                    handleChange={handleChange} />

                {/* Password */}
                <RegisterForm
                    type="password"
                    name="password"
                    value={values.password}
                    handleChange={handleChange} />

                <button type='submit' className='btn btn-block'
                    disabled={isLoading}>
                    Submit
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper >
    )
}

export default Register
import React, { useState, useEffect } from 'react'
import { Logo, RegisterForm, Alert } from '../components'
import Wrapper from '../assets/wrapper/Register'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const initalState = {
    userName: '',
    email: '',
    password: '',
    isMember: false,
}

const Register = () => {
    const [values, setValues] = useState(initalState)

    const { isLoading, showAlert } = useAppContext();

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    const handleChange = (e) => {
        console.log(e.target)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
    }
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
                        name="Username"
                        values={values.userName}
                        onChange={handleChange} />
                )}


                {/* Email */}
                <RegisterForm
                    type="text"
                    name="Email"
                    values={values.email}
                    onChange={handleChange} />

                {/* Password */}
                <RegisterForm
                    type="text"
                    name="Password"
                    values={values.password}
                    onChange={handleChange} />

                <button type='submit' className='btn btn-block'>
                    Submit
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}
                    <button type='button' onClick={toggleMember}
                        className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper >
    )
}

export default Register
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    const { getUserDetails } = useAppContext();
    const [values, setValues] = useState(initalState)

    useEffect(() => {
        if (!token) {
            setTimeout(() => {
                navigate('/register')
            }, 0)
        }
    }, [token, navigate])


    useEffect(() => {
        (async () => {
            try {
                await Promise.resolve(getUserDetails()).then((data) => {
                    setValues({
                        firstName: data.firstName,
                        middleName: data.middleName,
                        lastName: data.lastName,
                        userPhoto: data.userPhoto,
                        user: data.user,
                        dateOfBirth: data.dateOfBirth,
                        age: data.age,
                    });
                })
            } catch {
                console.log("data fetch error")
            }
        })()
    }, [setValues]);

    return (
        <main>
            <NavBar />
            <div className="col-md-4 animated fadeIn" >
                <div className="card">
                    <div className="card-body">
                        <div className="avatar">
                            <img
                                src={values.userPhoto}
                                className="card-img-top"
                                alt=""
                            />
                            <h5 className="card-title">
                                {values.firstName +
                                    " " +
                                    values.lastName}
                            </h5>
                            <h5 className='card-age'>{values.age}</h5>
                            <button
                                className="btn"
                                id='msg-btn'
                                onClick={e => {
                                    this.loadMore();
                                }}
                            >
                                Message
                            </button>
                            <button
                                className="btn"
                                id='msg-btn'
                                onClick={e => {
                                    this.loadMore();
                                }}
                            >
                                Follow
                            </button>

                        </div>
                    </div>


                </div>
            </div>
        </main >
    )
}

export default UserProfile
import React from 'react';
import main from '../assets/images/video_game.svg'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrapper/Home'
import Logo from '../components/Logo'

function Home() {
    return (
        <Wrapper>
            <div className="area" >
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <nav>
                        <Link to='/games'>
                            <Logo />
                        </Link>
                        <h4 className='logo-title'>VG-APP</h4>
                    </nav>
                    <div className='container page'>
                        <div className='info'>
                            <h1>
                                <span id='h1-home'>Video </span>Game <span id='h1-home'>Tracking</span> App
                            </h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores culpa itaque nobis quas facere quam odio fugit expedita, magnam, iste necessitatibus repellat sunt nisi illum ipsum voluptatibus omnis, nemo accusamus?
                            </p>
                            <Link to='/register' className='btn btn-hero'>
                                Login/Register
                            </Link>
                        </div>
                        <img src={main} alt='games' className='img main-img' />
                    </div>
                </ul>
            </div >
        </Wrapper>
    )
}

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';

const Landing = () => {
    return (
        <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className="container page">
            <div className='info'>
                <h1>
                    job <span>tracking</span> app
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut et exercitationem deserunt dolore eveniet maiores, corporis in facere magnam assumenda suscipit nam. Atque voluptatibus debitis aliquam ex odio consequatur sit.
                </p>
                <Link to='register' className='btn register-link'>
                    Register
                </Link>
                <Link to='login' className='btn '>
                    Login / Demo User
                </Link>
            </div>
            <img src={main} alt="job hunt" className='img main-img'/>
        </div>
        </Wrapper>
    );
}


export default Landing

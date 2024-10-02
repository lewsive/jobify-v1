import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
    const error = useRouteError();
    
    if(error.status === 404){
        return (
            <Wrapper>
                <div>
                    <img src={img} alt="not found" />
                    <h3>Page Not Found</h3>
                    <p>Page Doesn't Exist</p>
                    <Link to='/dashboard'>back home</Link>
                </div>
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <div>
                <h1>something went wrong</h1>
            </div>
        </Wrapper>
    )
}

export default Error

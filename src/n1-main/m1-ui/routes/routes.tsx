import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import {Error404} from '../pages/Error404';
import {SuperComponents} from '../pages/SuperComponents';

export const PATH = {
    LOGIN: '/login',
    PROFILE: '/profile',
    ERROR: '/404',
    REGISTRATION: '/registration',
    PASSWORD_RECOVERY: '/password-recovery',
    NEW_PASSWORD: '/new-password',
    TEST: '/test'
}


export const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.PROFILE}/>}/>

                <Route path={PATH.PROFILE} element={<h1>profile</h1>}/>
                <Route path={PATH.LOGIN} element={<h1>Login</h1>}/>
                <Route path={PATH.REGISTRATION} element={<h1>registration</h1>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<h1>password-recovery</h1>}/>
                <Route path={PATH.NEW_PASSWORD} element={<h1>new-password</h1>}/>
                <Route path={PATH.TEST} element={<SuperComponents/>}/>


                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                <Route path={PATH.ERROR} element = {<Error404/>}/>
            </Routes>
        </div>
    )
}


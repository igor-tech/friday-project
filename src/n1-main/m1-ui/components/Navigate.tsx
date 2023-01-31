import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/routes';

export const Navigate = () => {
    const styleLink = {
        color: 'white',
        padding: '5px',
        borderRadius: '5px',
        background: '#5ea3a9',
        textDecoration: 'none'
    }

    return (
        <div style={{fontSize: '15px', gap: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <NavLink style={styleLink} to={PATH.PROFILE}>Профайл</NavLink>
            <NavLink style={styleLink} to={PATH.LOGIN}>Логин</NavLink>
            <NavLink style={styleLink} to={PATH.TEST}>Супер компоненты</NavLink>
            <NavLink style={styleLink} to={PATH.PASSWORD_RECOVERY}>Восстановление пароля</NavLink>
            <NavLink style={styleLink} to={PATH.ERROR}>Ошибка</NavLink>
            <NavLink style={styleLink} to={PATH.REGISTRATION}>Регистрация</NavLink>
            <NavLink style={styleLink} to={PATH.NEW_PASSWORD}>Ввод нового пароля</NavLink>
        </div>
    );
};


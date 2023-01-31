import React from 'react';
import {Navigate} from '../components/Navigate';

export const Header = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
            <div style={{fontSize: '40px'}}>Cards</div>
            <Navigate/>
        </div>
    );
};


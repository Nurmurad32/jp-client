import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigationbar from '../components/Navigationbar';

const RootL = () => {
    return (
        <div>
            <Navigationbar />
            <Outlet />
        </div>
    );
};

export default RootL;
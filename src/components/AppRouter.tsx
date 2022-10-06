import React, { useContext } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {observer} from "mobx-react-lite";

import { authRoutes, publicRoutes } from '../routes';
import { FIRST_ROUTE, MAIN_ROUTE } from '../utils/consts';
import { Context } from '../index';


const AppRouter: React.FC = observer(() => { 
    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth ? 
                authRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} element={<Component />} />
                ):
                publicRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} element={<Component />} />
                )
            }
            {user.isAuth ?
                <Route path='*' element={<Navigate to={MAIN_ROUTE} />} />
                :
                <Route path='*' element={<Navigate to={FIRST_ROUTE} />} />
            }
        </Routes>
    );
});

export default AppRouter;
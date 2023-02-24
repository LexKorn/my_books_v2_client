import React, {useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {Navbar, Container, Button} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import {Context} from '../../index';
import { MAIN_ROUTE, ADD_AUTHOR_ROUTE, ADD_BOOK_ROUTE, AUTHORS_ROUTE, NOTE_ROUTE, MANUAL_ROUTE } from "../../utils/consts";

import './navBar.sass';


const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setIsAuth(false);
        localStorage.clear();
    };


    return (
        <>
            {user.isAuth ?
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" >
                    <Container >
                        <NavLink className="active" to={MAIN_ROUTE}>МОИ КНИГИ</NavLink>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-around'>
                                <div className='buttons'>
                                    <Button
                                        variant={"outline-light"}
                                        className="me-2 nav-btn"
                                        onClick={() => navigate(AUTHORS_ROUTE)}
                                        >Список авторов
                                    </Button>
                                    <Button
                                        variant={"outline-light"}
                                        className="me-2 nav-btn"
                                        onClick={() => navigate(ADD_BOOK_ROUTE)}
                                        >Добавить книгу
                                    </Button>
                                    <Button
                                        variant={"outline-light"}
                                        className="me-2 nav-btn"
                                        onClick={() => navigate(ADD_AUTHOR_ROUTE)}
                                        >Добавить автора
                                    </Button>
                                    <Button
                                        variant={"outline-light"}
                                        className="me-2 nav-btn"
                                        onClick={() => navigate(NOTE_ROUTE)}
                                        >Прочитать
                                    </Button>       
                                    <Button
                                        variant={"outline-light"}
                                        className="me-2 nav-btn"
                                        onClick={() => navigate(MANUAL_ROUTE)}
                                        >Инструкция
                                    </Button>                   
                                </div> 
                                <Button 
                                    variant={"outline-light"} 
                                    onClick={() => logOut()} 
                                    className="ms-2 nav-btn"
                                    >Выйти
                                </Button>  
                        </Navbar.Collapse>       
                    </Container>
                </Navbar>
            :
            <div></div>
            }
        </>       
    );
});

export default NavBar;
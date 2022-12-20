import React, {useContext, useEffect, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import {Context} from '../../index';
import { FIRST_ROUTE, ADD_AUTHOR_ROUTE, ADD_BOOK_ROUTE, AUTHORS_ROUTE, NOTE_ROUTE, MANUAL_ROUTE } from "../../utils/consts";

import './navBar.sass';


const NavBar = observer(() => {
    const {user} = useContext(Context);
    // const {library} = useContext(Context);
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
                        <NavLink to={FIRST_ROUTE}>МОИ КНИГИ</NavLink>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-around'>
                                <Nav className="ms-4 me-auto">
                                    <Nav.Link href="#" onClick={() => navigate(AUTHORS_ROUTE)}>Список авторов</Nav.Link>
                                    <Nav.Link href="#" onClick={() => navigate(ADD_BOOK_ROUTE)}>Добавить книгу</Nav.Link>
                                    <Nav.Link href="#" onClick={() => navigate(ADD_AUTHOR_ROUTE)}>Добавить автора</Nav.Link>
                                    <Nav.Link href="#" onClick={() => navigate(NOTE_ROUTE)}>Прочитать</Nav.Link>
                                    <Nav.Link href="#" onClick={() => navigate(MANUAL_ROUTE)}>Инструкция</Nav.Link>
                                </Nav> 
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
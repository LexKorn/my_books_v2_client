import React, {useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import {Context} from '../index';
import { FIRST_ROUTE, ADD_AUTHOR_ROUTE, ADD_BOOK_ROUTE, AUTHORS_ROUTE, NOTE_ROUTE } from "../utils/consts";


const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setIsAuth(false);
        // user.setIsUser({});
        localStorage.clear();
    };

    return (
        <>
            {user.isAuth ?
                <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink style={{color: 'white'}} to={FIRST_ROUTE}>MAIN</NavLink>
                    <Nav>
                        <Button
                            variant={"outline-light"}
                            className="me-2"
                            onClick={() => navigate(AUTHORS_ROUTE)}
                            >Список авторов
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="me-2"
                            onClick={() => navigate(ADD_BOOK_ROUTE)}
                            >Добавить книгу
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="me-2"
                            onClick={() => navigate(ADD_AUTHOR_ROUTE)}
                            >Добавить автора
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className="me-2"
                            onClick={() => navigate(NOTE_ROUTE)}
                            >Прочитать
                        </Button>
                        <Button 
                            variant={"outline-light"} 
                            onClick={() => logOut()} 
                            className="ms-2"
                            >Выйти
                        </Button>
                    </Nav>             
                </Container>
            </Navbar>
            :
            <div></div>
            }
        </>       
    );
});

export default NavBar;
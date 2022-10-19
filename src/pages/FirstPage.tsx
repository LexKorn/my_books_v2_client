import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button} from 'react-bootstrap';

import { LOGIN_ROUTE } from "../utils/consts";


const FirstPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container style={{width: '75%'}}>
            <h1>MY BOOKS</h1>
            <p>Привет! <br/> Добро пожаловать на портал книг. Здесь ты можешь добавлять любимые книги, авторов, комментарии к ним, а также делать заметки, что хотел бы прочитать в будущем. Чтобы ознакомиться с сайтом ты можешь использовать тестовые данные для входа: username: test@q.ru, password: test1234.</p>
            <Button variant={"outline-dark"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
        </Container>
    );
};

export default FirstPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Button} from 'react-bootstrap';

import { LOGIN_ROUTE } from "../utils/consts";


const FirstPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <h1>FirstPage</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quaerat deleniti alias ab fuga voluptas distinctio a assumenda beatae vitae, dolore, harum qui omnis provident natus consectetur velit sit dolorum! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias velit corrupti explicabo veritatis consequuntur quidem esse, aspernatur, molestiae debitis dolorem obcaecati, non tempore? Rerum reiciendis quidem eos repellendus facere itaque! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, optio qui? Quis, optio? Obcaecati nihil consectetur atque explicabo vel! Aliquid delectus eos veniam earum suscipit veritatis, omnis deserunt quae a.</p>
            <Button variant={"outline-dark"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
        </Container>
    );
};

export default FirstPage;
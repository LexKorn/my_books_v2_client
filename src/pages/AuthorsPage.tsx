import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import List from '../components/List';
import AuthorItem from '../components/AuthorItem';
import { IAuthor } from '../types/types';
import { fetchAuthor } from '../http/bookAPI';


const AuthorsPage: React.FC = () => {
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAuthors();
    }, []);
  
    function getAuthors() {
        fetchAuthor()
            .then(data => setAuthors(data.rows))
            .catch(err => alert(err.message));
    }

    return (
        <Container style={{width: '70%'}}>
            <h1>Список добавленных авторов</h1>
            <List 
                items={authors} 
                renderItem={(author: IAuthor) => 
                    <AuthorItem 
                        onClick={(author) => navigate('/author/' + author.id)} 
                        author={author} 
                        key={author.id} 
                    />
                } 
            />
        </Container>
    );
};

export default AuthorsPage;
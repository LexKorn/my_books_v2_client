import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import List from '../components/List/List';
import AuthorItem from '../components/AuthorItem';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import { IAuthor } from '../types/types';
import { fetchAuthors } from '../http/authorAPI';


const AuthorsPage: React.FC = () => {
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAuthors();
    }, []);
  
    function getAuthors() {
        fetchAuthors()
            .then(data => setAuthors(data.rows))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    if (loading) {
        return <Spinner animation={"border"}/>
    }


    return (
        <Container>
            <FilterPanel />
            <h1 style={{textAlign: 'center'}}>Список добавленных авторов:</h1>
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
import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {Helmet} from "react-helmet";

import List from '../components/List/List';
import AuthorItem from '../components/AuthorItem';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import { IAuthor } from '../types/types';
import { fetchAuthors } from '../http/authorAPI';
import { Context } from '../index';


const AuthorsPage: React.FC = observer(() => {
    const {library} = useContext(Context);
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [value, setValue] = useState<string>('');
    const [filter, setFilter] = useState<string>('Все');
    const navigate = useNavigate();

    useEffect(() => {
        getAuthors();
    }, []);
  
    function getAuthors() {
        fetchAuthors()
            .then(data => setAuthors(data))
            .then(() => library.setToggleScroll())
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    if (loading) {
        return <Spinner animation={"border"}/>
    }


    return (
        <Container>
            <Helmet>
                <title>Authors Page</title>
                <meta name="description" content="Список авторов" />
            </Helmet>
            <FilterPanel value={value} setValue={setValue} filter={filter} setFilter={setFilter} elems={authors} />
            <h1 style={{textAlign: 'center'}}>Список добавленных авторов:</h1>
            <List
                items={library.visibleAuthors} 
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
});

export default AuthorsPage;
import React, {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
import {Helmet} from "react-helmet";

import List from '../components/List/List';
import BookItem from '../components/BookItem';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import { IBook } from '../types/types';
import { fetchBooks } from '../http/bookAPI';
import { Context } from '../index';

// import './mainPage.sass';


const MainPage: React.FC = observer(() => {
    const {library} = useContext(Context);
    const [books, setBooks] = useState<IBook[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [value, setValue] = useState<string>('');
    const [filter, setFilter] = useState<string>('Все');
    const navigate = useNavigate();

    useEffect(() => {
        getBooks();
    }, []);
  
    function getBooks() {
        fetchBooks()
            .then(data => setBooks(data))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    if (loading) {
        return <Spinner animation={"border"}/>
    }


    return (        
        <Container>
            <Helmet>
                <title>My Books</title>
                <meta name="description" content="Портал прочитанных книг" />
            </Helmet>
            <FilterPanel value={value} setValue={setValue} filter={filter} setFilter={setFilter} elems={books} />
            <h1 style={{textAlign: 'center'}}>Список добавленных книг:</h1>
                <List 
                    items={library.visibleBooks} 
                    renderItem={(book: IBook) => 
                        <BookItem 
                            book={book} 
                            onClick={(book) => navigate('/book/' + book.id)}                         
                            key={book.id} 
                        />
                    } 
                />           
        </Container>
    );
});

export default MainPage;
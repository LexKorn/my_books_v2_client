import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import List from '../components/List/List';
import BookItem from '../components/BookItem';
import FilterPanel from '../components/FilterPanel/FilterPanel';
import { IBook } from '../types/types';
import { fetchBooks } from '../http/bookAPI';

// import './mainPage.sass';


const MainPage: React.FC = () => {
    const [books, setBooks] = useState<IBook[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        getBooks();
    }, []);
  
    function getBooks() {
        fetchBooks()
            .then(data => setBooks(data.rows))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    if (loading) {
        return <Spinner animation={"border"}/>
    }


    return (
        <Container>
            <FilterPanel />
            <h1 style={{textAlign: 'center'}}>Список добавленных книг:</h1>
            <List 
                items={books} 
                renderItem={(book: IBook) => 
                    <BookItem 
                        onClick={(book) => navigate('/book/' + book.id)} 
                        book={book} 
                        key={book.id} 
                    />
                } 
            />
        </Container>
    );
};

export default MainPage;
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
    const [value, setValue] = useState<string>('');
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

    const search = (items: IBook[], term: string) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    const visibleData = search(books, value);

    if (loading) {
        return <Spinner animation={"border"}/>
    }


    return (
        <Container>
            <FilterPanel value={value} setValue={setValue} />
            <h1 style={{textAlign: 'center'}}>Список добавленных книг:</h1>
            <List 
                items={visibleData} 
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
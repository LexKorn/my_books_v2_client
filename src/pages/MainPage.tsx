import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import List from '../components/List/List';
import BookItem from '../components/BookItem';
// import FilterPanel from '../components/FilterPanel/FilterPanel';
import { IBook } from '../types/types';
import { fetchBooks } from '../http/bookAPI';

// import './mainPage.sass';


const MainPage: React.FC = () => {
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

    const filterPost = (items: IBook[], filter: string) => {
        switch (filter) {
            case 'Отечественные':
                return items.filter(item => item.countryId === 4 || item.countryId === 14);
            case 'Зарубежные':
                return items.filter(item => item.countryId !== 4 && item.countryId !== 14);
            case 'Любимые':               
                return items.filter(item => item.rating > 8);
            case 'Все':
                return items;
            default:
                return items;
        }
    };

    const sort = (items: IBook[]) => {        
        let sortItems: IBook[] = [];

        sortItems = [...items].sort((a, b) => {
            return a.name > b.name ? 1 : -1;
            // return a.authorId > b.authorId ? 1 : -1;
        });

        return sortItems;
    };

    const visibleData = sort(filterPost(search(books, value), filter));

    if (loading) {
        return <Spinner animation={"border"}/>
    }


    return (
        <Container>
            {/* <FilterPanel value={value} setValue={setValue} /> */}
            <div className='filter'>
                <button className='filter__btn' onClick={(e) => setFilter('Отечественные')}>Отечественные</button>
                <button className='filter__btn' onClick={(e) => setFilter('Зарубежные')}>Зарубежные</button>
                <button className='filter__btn' onClick={(e) => setFilter('Любимые')}>Любимые</button>
                <button className='filter__btn' onClick={(e) => setFilter('Все')}>Все</button> 
            </div>
            <input 
                className='search' 
                type='text' 
                placeholder='Начните вводить искомое слово' 
                value={value}
                onChange={e => setValue(e.target.value)}
            />

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
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import List from '../components/List/List';
import AuthorItem from '../components/AuthorItem';
// import FilterPanel from '../components/FilterPanel/FilterPanel';
import { IAuthor } from '../types/types';
import { fetchAuthors } from '../http/authorAPI';


const AuthorsPage: React.FC = () => {
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
            .then(data => setAuthors(data.rows))
            .catch(err => alert(err.message))
            .finally(() => setLoading(false));
    }

    const search = (items: IAuthor[], term: string) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    const filterPost = (items: IAuthor[], filter: string) => {
        switch (filter) {
            case 'Отечественные':
                return items.filter(item => item.countryId === 4 || item.countryId === 14);
            case 'Зарубежные':
                return items.filter(item => item.countryId !== 4 && item.countryId !== 14);
            case 'Любимые':               
                return items;
            case 'Все':
                return items;
            default:
                return items;
        }
    }

    const sort = (items: IAuthor[]) => {        
        let sortItems: IAuthor[] = [];

        sortItems = [...items].sort((a, b) => {
            return a.name > b.name ? 1 : -1;
        });

        return sortItems;
    };

    const visibleData = sort(filterPost(search(authors, value), filter));

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

            <h1 style={{textAlign: 'center'}}>Список добавленных авторов:</h1>
            <List
                items={visibleData} 
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
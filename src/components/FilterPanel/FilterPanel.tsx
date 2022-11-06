import React, {useContext, useState, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import { IAuthor, IBook, ICountry } from '../../types/types';
import { Context } from '../../index';
import { fetchCountries } from '../../http/countryAPI';
import { fetchBooks } from '../../http/bookAPI';

import './filterPanel.sass';

interface FilterPanelProps {
    value: string;
    setValue: (value: string) => void;
    filter: string;
    setFilter: (value: string) => void;
    elems: (IAuthor | IBook)[];
};


const FilterPanel:React.FC<FilterPanelProps> = observer(({value, setValue, filter, setFilter, elems}) => {
    const {library} = useContext(Context);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [books, setBooks] = useState<IBook[]>([]);

    useEffect(() => {
        fetchCountries().then(data => setCountries(data));
        fetchBooks().then(data => setBooks(data));
    }, []);
    
    const arrAuthorId = books.map(book => book.authorId);
    
    const authorFrequency = arrAuthorId.reduce((acc, elem) => {
        acc[elem] = (acc[elem] || 0) + 1;
        return acc;
    }, {});

    const Russia: ICountry[] = countries.filter(country => country.name === 'Россия');
    const USSR: ICountry[] = countries.filter(country => country.name === 'СССР');    

    const search = (items: (IAuthor | IBook)[], term: string) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    const filterPost = (items: (IAuthor | IBook)[], filter: string) => {
        switch (filter) {
            case 'Отечественные':
                return items.filter(item => item.countryId === Russia[0].id || item.countryId === USSR[0].id);
            case 'Зарубежные':
                return items.filter(item => item.countryId !== Russia[0].id && item.countryId !== USSR[0].id);
            case 'Любимые':               
                return elems[0].authorId ?
                    items.filter(item => item.rating >= 8)
                    : 
                    items.filter(item => authorFrequency[item.id] >= 3);
            case 'Все':
                return items;
            default:
                return items;
        }
    };

    const sort = (items: (IAuthor | IBook)[]) => {        
        let sortItems: (IAuthor | IBook)[] = [];

        sortItems = [...items].sort((a, b) => {
            return a.name > b.name ? 1 : -1;
        });

        return sortItems;
    };

    if (elems[0].authorId) {
        library.setVisibleBooks(sort(filterPost(search(elems, value), filter)));
    } else {
        library.setVisibleAuthors(sort(filterPost(search(elems, value), filter)));
    }


    return (
        <>
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
        </>        
    );
});

export default FilterPanel;
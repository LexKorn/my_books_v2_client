import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';

import { IAuthor, IBook } from '../../types/types';
import { Context } from '../../index';

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
                return items.filter(item => item.countryId === 4 || item.countryId === 14);
            case 'Зарубежные':
                return items.filter(item => item.countryId !== 4 && item.countryId !== 14);
            case 'Любимые':               
                return elems[0].authorId ? items.filter(item => item.rating > 8) : items;
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
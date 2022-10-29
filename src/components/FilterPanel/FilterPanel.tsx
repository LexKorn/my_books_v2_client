import React, {useState, useEffect} from 'react';
import { IAuthor, IBook } from '../../types/types';

import './filterPanel.sass';

interface FilterPanelProps {
    value: string;
    setValue: (value: string) => void;
};


const FilterPanel:React.FC<FilterPanelProps> = ({value, setValue}) => {
    const [filter, setFilter] = useState<string>('Все');
    const [directionSort, setDirectionSort] = useState(true);
    const [authors, setAuthors] = useState<IAuthor[]>([]);

    // console.log(filter);
    
    const search = (items: IAuthor[] | IBook[], term: string) => {
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
                return items.filter(item => item.countryId > 4); //item.rating 
            case 'Все':
                return items;
            default:
                return items;
        }
    };

    const sort = (items: IAuthor[]) => {        
        let sortItems: IAuthor[] = [];

        sortItems = [...items].sort((a, b) => {
            return a.name > b.name ? 1 : -1;
        });

        return sortItems;
    };

    const visibleData = sort(filterPost(search(authors, value), filter));

    // Sort
    // const sortHandler = () => {        
    //     let sortLinks = [];
  
    //     if (directionSort) {
    //       sortLinks = [...links].sort((a, b) => {
    //         return a[e] > b[e] ? 1 : -1;
    //       });
    //     } else {
    //       sortLinks = [...links].sort((a, b) => {
    //         return a[e] < b[e] ? 1 : -1;
    //       });
    //     }
  
    //     setLinks(sortLinks);
    //     setDirectionSort(!directionSort);
    //     console.log(directionSort);
    // };


    return (
        <>
            <div className='filter'>
                <button className='filter__btn' onClick={(e) => setFilter('Отечественные')}>Отечественные</button>
                <button className='filter__btn' onClick={(e) => setFilter('Зарубежные')}>Зарубежные</button>
                <button className='filter__btn' onClick={(e) => setFilter('Любимые')}>Любимые</button>
                <button className='filter__btn' onClick={(e) => setFilter('Все')}>Все</button>           
                {/* <button className='filter__btn' onClick={() => sortHandler()}>Упорядочить</button>      */}
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
};

export default FilterPanel;
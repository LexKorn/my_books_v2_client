import React from 'react';

import './filterPanel.sass';


const FilterPanel = () => {
    return (
        <>
            <div className='filter'>
                <button className='filter__btn'>Отечественные</button>
                <button className='filter__btn'>Зарубежные</button>
                <button className='filter__btn'>Любимые</button>
                <button className='filter__btn'>Все</button>                
            </div>
            <input className='search' type='text' placeholder='Начните вводить искомое слово' />
        </>        
    );
};

export default FilterPanel;
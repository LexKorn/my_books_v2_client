import React from 'react';

import './filterPanel.sass';

interface FilterPanelProps {
    value: string;
    setValue: (value: string) => void;
};


const FilterPanel:React.FC<FilterPanelProps> = ({value, setValue}) => {
    return (
        <>
            <div className='filter'>
                <button className='filter__btn'>Отечественные</button>
                <button className='filter__btn'>Зарубежные</button>
                <button className='filter__btn'>Любимые</button>
                <button className='filter__btn'>Все</button>                
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
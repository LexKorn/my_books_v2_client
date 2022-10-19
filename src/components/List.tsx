import React from 'react';

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
};

export default function List<T> (props: ListProps<T>) {
    return (
        <div>
            {props.items.length === 0 ? 
                <div style={{fontSize: 20}}>Здесь пока ничего нет...</div>
            :
                props.items.map(props.renderItem)
            }
        </div>
    );
};
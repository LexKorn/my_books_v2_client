import React from 'react';
import {Fade} from 'react-awesome-reveal';

import './list.sass';

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
};


export default function List<T> (props: ListProps<T>) {
    return (
        <div className="list">
            {props.items.length === 0 ? 
                <div className="list__empty">Здесь пока ничего нет...</div>
            :
            <Fade cascade duration={300} triggerOnce={true} direction={'right'}>
                {props.items.map(props.renderItem)}
            </Fade>                
            }           
        </div>
    );
};
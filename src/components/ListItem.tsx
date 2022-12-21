import React from 'react';
import { Button, Card } from 'react-bootstrap';

import { INote, IQuote } from '../types/types';

interface ListItemProps {
    item: IQuote | INote;
    onDelete: (item: IQuote | INote) => void;
    onEdit: (item: IQuote | INote) => void;
};


const ListItem: React.FC<ListItemProps> = ({item, onDelete, onEdit}) => {
    return (
        <Card 
            className="d-flex justify-content-between shadow transition" 
            style={{padding: 10, marginTop: 15, flexDirection: 'row', fontSize: 18, lineHeight: '35px'}}
        >
            {/* @ts-ignore */}
            <div>{item.name ? item.name : item.quote}</div>
            <div>
                <Button 
                    variant={"outline-secondary"}
                    style={{marginRight: 10}}
                    onClick={() => onEdit(item)}
                    >Редактировать
                </Button>
                <Button 
                    variant={"outline-danger"}
                    onClick={() => onDelete(item)}
                    >Удалить
                </Button>
            </div>
        </Card>      
    );
};

export default ListItem;
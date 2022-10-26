import React from 'react';
import { Card } from 'react-bootstrap';

import { IBook } from '../types/types';

interface BookItemProps {
    book: IBook;
    onClick: (book: IBook) => void;
};


const BookItem: React.FC<BookItemProps> = ({book, onClick}) => {    
    return (
        <Card 
            className="d-flex justify-content-between shadow" 
            style={{padding: 10, marginTop: 15, flexDirection: 'row', fontSize: 18, lineHeight: '35px', cursor: 'pointer'}}
            onClick={() => onClick(book)}
        >
            {book.authorId} - {book.name}
        </Card>
    );
};

export default BookItem;
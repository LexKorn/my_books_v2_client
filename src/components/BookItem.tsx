import React, {useEffect, useContext} from 'react';
import { Card } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';

import { IBook } from '../types/types';
import { Context } from '../index';
import { fetchAuthors } from '../http/authorAPI';

interface BookItemProps {
    book: IBook;
    onClick: (book: IBook) => void;
};


const BookItem: React.FC<BookItemProps> = observer(({book, onClick}) => {    
    const {library} = useContext(Context);

    useEffect(() => {
        fetchAuthors().then(data => library.setAuthors(data.rows));
    }, []);    

    const authorBook = library.authors.filter(author => author.id === book.authorId);

    return (
        <Card 
            className="d-flex justify-content-between shadow" 
            style={{padding: 10, marginTop: 15, flexDirection: 'row', fontSize: 18, lineHeight: '35px', cursor: 'pointer'}}
            onClick={() => onClick(book)}
        >
            {authorBook[0].name} - {book.name}
        </Card>
    );
});

export default BookItem;
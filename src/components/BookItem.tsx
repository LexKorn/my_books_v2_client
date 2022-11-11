import React, {useContext} from 'react';
import { Card, Image } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';

import { IAuthor, IBook } from '../types/types';
import { Context } from '../index';
const star = require('../assets/star.png');

interface BookItemProps {
    book: IBook;
    onClick: (book: IBook) => void;
};


const BookItem: React.FC<BookItemProps> = observer(({book, onClick}) => {    
    const {library} = useContext(Context);
    const authorBook: IAuthor[] = library.authors.filter(author => author.id === book.authorId);

    if (authorBook.length > 0) {
        return (
            <Card 
                className="d-flex justify-content-between shadow transition" 
                style={{padding: 10, marginTop: 15, flexDirection: 'row', fontSize: 18, lineHeight: '35px', cursor: 'pointer'}}
                onClick={() => onClick(book)}
            >
                <div><span style={{fontWeight: 'bold'}}>{book.name}</span> - {authorBook[0].name} </div> 
                <div>{book.rating} <Image width={18} height={18} src={star}/></div>
            </Card>        
        );
    } else {
        return (
            <div></div>
        );
    }
});

export default BookItem;
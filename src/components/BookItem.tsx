import React, {useEffect, useContext} from 'react';
import { Card, Image } from 'react-bootstrap';
import {observer} from 'mobx-react-lite';
// import { CSSTransition } from 'react-transition-group';

import { IBook } from '../types/types';
import { Context } from '../index';
import { fetchAuthors } from '../http/authorAPI';
// import star from '../assets/star.png';
const star = require('../assets/star.png');

// import './transition.sass';

interface BookItemProps {
    book: IBook;
    onClick: (book: IBook) => void;
};


const BookItem: React.FC<BookItemProps> = observer(({book, onClick}) => {    
    const {library} = useContext(Context);

    useEffect(() => {
        fetchAuthors().then(data => library.setAuthors(data));
    }, []);    

    const authorBook = library.authors.filter(author => author.id === book.authorId);

    if (authorBook.length > 0) {
        return (
            // <CSSTransition key={book.id} timeout={500} classNames="transition" >
                <Card 
                    className="d-flex justify-content-between shadow transition" 
                    style={{padding: 10, marginTop: 15, flexDirection: 'row', fontSize: 18, lineHeight: '35px', cursor: 'pointer'}}
                    onClick={() => onClick(book)}
                >
                    <div><span style={{fontWeight: 'bold'}}>{book.name}</span> - {authorBook[0].name} </div> 
                    <div>{book.rating} <Image width={18} height={18} src={star}/></div>
                </Card>
            // </CSSTransition>            
        );
    } else {
        return (
            <div></div>
        );
    }
});

export default BookItem;
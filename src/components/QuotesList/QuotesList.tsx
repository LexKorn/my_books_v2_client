import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, ListGroup } from 'react-bootstrap';

import { IBook, IQuote } from '../../types/types';
import { fetchQuotes } from '../../http/quoteAPI';
import List from '../List/List';
import ListItem from '../ListItem';

// import './quotesList.sass';


export default function QuotesList<T> () {
    // const [quotes, setQuotes] = useState<IQuote[]>([]);
    // const [book, setBook] = useState<IBook>({} as IBook);
    // const {id} = useParams();

    // useEffect(() => {
    //     getQuotes();
    // }, []);

    // function getQuotes() {
    //     fetchQuotes()
    //         .then(data => setQuotes(data))
    //         .catch(err => alert(err.message));
    // }

    // const bookQuotes: IQuote[] = quotes.filter(quote => quote.bookId === book.id);

    const bookQuotes: IQuote[] = [
        {
            id: 1,
            quote: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae et maxime quidem quaerat accusantium, culpa at hic vel impedit deleniti? Molestias natus quas repellendus fuga, suscipit obcaecati libero ducimus itaque.',
            bookId: 1,
            userId: 1
        },
        {
            id: 2,
            quote: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae et maxime quidem quaerat accusantium, culpa at hic vel impedit deleniti? Molestias natus quas repellendus fuga, suscipit obcaecati libero ducimus itaque.',
            bookId: 1,
            userId: 1
        },
    ];

    const removeQuote = (quote: IQuote) => {
        // if (window.confirm('Вы действительно хотите удалить заметку?')) {
        //     deleteQuote(quote.id);
        //     getNotes();
        // }
    };

    const editQuote = (quote: IQuote) => {
        // setQuote(quote);
        // setVisible(true);
    };

    return (
        <Container className="quotes mt-4">
            {/* {bookQuotes.length === 0 ? '' : <h3 style={{textAlign: 'center'}}>Цитаты:</h3>}      */}
            <h3 style={{textAlign: 'center'}}>Цитаты:</h3>
            <List 
                items={bookQuotes} 
                renderItem={(quote: IQuote) => 
                    <ListItem 
                        onDelete={() => removeQuote(quote)} 
                        onEdit={() => editQuote(quote)} 
                        item={quote} 
                        key={quote.id} 
                    />
                } 
            />
        </Container> 
    );
};
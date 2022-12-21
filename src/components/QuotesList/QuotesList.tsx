import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { IBook, IQuote } from '../../types/types';
import { fetchQuotes, deleteQuote } from '../../http/quoteAPI';
import { fetchOneBook } from '../../http/bookAPI';
import List from '../List/List';
import ListItem from '../ListItem/ListItem';
import ModalQuoteUpdate from '../Modals/ModalQuoteUpdate';


export default function QuotesList<T> () {
    const [quote, setQuote] = useState<IQuote>({} as IQuote);
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [book, setBook] = useState<IBook>({} as IBook);
    const [toggle, setToggle] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const {id} = useParams();

    useEffect(() => {
        fetchQuotes()
            .then(data => setQuotes(data))
            .catch(err => alert(err.message))
    }, [toggle, visible]);

    useEffect(() => {
        fetchOneBook(id)
            .then(data => setBook(data))
            .catch(err => alert(err.message))
    }, []);

    const bookQuotes: IQuote[] = quotes.filter(quote => quote.bookId === book.id);

    const removeQuote = (quote: IQuote) => {
        if (window.confirm('Вы действительно хотите удалить цитату?')) {
            deleteQuote(quote.id);
            setToggle(!toggle);
        }
    };

    const editQuote = (quote: IQuote) => {
        setQuote(quote);
        setVisible(true);
    };


    return (
        <Container className="quotes mt-4">
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
            <ModalQuoteUpdate
                show={visible} 
                onHide={() => setVisible(false)} 
                bookId={book.id}
                quoteInit={quote}
            />
        </Container> 
    );
};
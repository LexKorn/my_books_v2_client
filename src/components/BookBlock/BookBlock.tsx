import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import {Helmet} from "react-helmet";
// import {observer} from 'mobx-react-lite';

import { IBook } from '../../types/types';
import { MAIN_ROUTE, AUTHOR_ROUTE } from '../../utils/consts';
import { deleteBook, fetchOneBook } from '../../http/bookAPI';
import { fetchAuthors } from '../../http/authorAPI';
import { fetchCountries } from '../../http/countryAPI';
import {Context} from '../../index';
import ModalBook from '../Modals/ModalBook';

import './bookBlock.sass';


const BookBlock: React.FunctionComponent = () => {
    const {library} = useContext(Context);
    const [book, setBook] = useState<IBook>({});    
    const [loading, setLoading] = useState<boolean>(true);
    const {id} = useParams();
    const navigate = useNavigate();
    const [visible, setVisible] = useState<boolean>(false);
    
    useEffect(() => {
        fetchAuthors().then(data => library.setAuthors(data));
        fetchCountries().then(data => library.setCountries(data));
        fetchOneBook(id)
            .then(data => setBook(data))
            .finally(() => setLoading(false));
    }, [id]);

    const authorBook = library.authors.filter(author => author.id === book.authorId);

    const removeBook = () => {
        if (window.confirm('Вы действительно хотите удалить книгу?')) {
            deleteBook(book.id);
            navigate(MAIN_ROUTE);
        }        
    };

    if (loading) {
        return <Spinner animation={"border"}/>
    }    


    return (
        <div className='book'>
            <Helmet>
                <title>{book.name}</title>
                <meta name="description" content={`Страничка книги ${book.name}`} />
            </Helmet>
            <div className="book__wrapper">
                <img src={process.env.REACT_APP_API_URL + book.cover} className='book__wrapper__cover' />
                <div className="book__wrapper__text">                    
                    <div 
                        className="book__author"
                        style={{cursor: 'pointer'}}
                        onClick={() => {navigate(AUTHOR_ROUTE + `/${authorBook[0].id}`)}}
                        >{authorBook[0].name}
                    </div>
                    <div className="book__name">{book.name}</div>
                    {/* <div className="book__country">countryId: {book.countryId}</div>
                    <div className="book__country">authorBook.countryId: {authorBook[0].countryId}</div> */}
                    <div className="book__rating">{book.rating}</div>
                    <a className="book__link" href={book.link} target="_blank">Прочитать можно здесь</a><br/>
                    <button className='book__button' onClick={() => setVisible(true)}>Редактировать</button>
                    <button className='book__button'  onClick={removeBook}>Удалить</button>
                    <div className="book__comment">{book.comment}</div>
                </div>                
            </div>
            <ModalBook 
                show={visible} 
                onHide={() => setVisible(false)} 
                idInit={id} 
                nameInit={book.name}
                linkInit={book.link}
                ratingInit={book.rating}
                commentInit={book.comment}
                coverInit={book.cover}
            />
        </div>
    );
};

export default BookBlock;